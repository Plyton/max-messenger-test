import { useEffect, useRef, useState } from 'react'
import { greenApiConfig } from '@/config/env'
import {
  deleteNotification,
  receiveNotification,
  sendMessage as sendGreenApiMessage,
} from '@/services/greenApi/greenApi'
import type { ReceiveNotification } from '@/services/greenApi/types'
import type { ChatMessage } from '@/types/message'

export function useMessenger() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [error, setError] = useState<string | null>(null)
  const messageIds = useRef(new Set<string>())

  useEffect(() => {
    const controller = new AbortController()

    const wait = async (milliseconds: number) => {
      await new Promise<void>((resolve) => {
        const timeoutId = setTimeout(resolve, milliseconds)
        controller.signal.addEventListener('abort', () => {
          clearTimeout(timeoutId)
          resolve()
        }, { once: true })
      })
    }

    const processNotification = (notification: ReceiveNotification): ChatMessage | null => {
      const { body } = notification
      const messageId = body.idMessage
      const text = body.messageData?.textMessageData?.textMessage?.trim()

      if (
        body.typeWebhook !== 'incomingMessageReceived' ||
        body.messageData?.typeMessage !== 'textMessage' ||
        !messageId ||
        !text
      ) {
        return null
      }

      if (messageIds.current.has(messageId)) {
        return null
      }

      return {
        id: messageId,
        text,
        ts: body.timestamp ? body.timestamp * 1000 : Date.now(),
        direction: 'incoming',
      }
    }

    const poll = async () => {
      while (!controller.signal.aborted) {
        try {
          const notification = await receiveNotification(controller.signal)

          if (controller.signal.aborted) return

          if (!notification) {
            continue
          }

          const message = processNotification(notification)
          if (message) {
            messageIds.current.add(message.id)
            setMessages((currentMessages) => [...currentMessages, message])
          }

          await deleteNotification(notification.receiptId)
        } catch (pollingError) {
          if (controller.signal.aborted) return

          console.error(
            'GREEN-API polling failed:',
            pollingError instanceof Error ? pollingError.message : 'Unknown polling error',
          )
          await wait(2000)
        }
      }
    }

    void poll()

    return () => {
      controller.abort()
    }
  }, [])

  async function sendMessage(text: string) {
    const trimmedText = text.trim()
    if (!trimmedText) return

    setError(null)

    if (!greenApiConfig.chatId) {
      setError('Чат для отправки не настроен.')
      throw new Error('Chat ID is not configured')
    }

    try {
      const response = await sendGreenApiMessage(greenApiConfig.chatId, trimmedText)
      const msg: ChatMessage = {
        id: response.idMessage,
        text: trimmedText,
        ts: Date.now(),
        direction: 'outgoing',
      }
      setMessages((s) => [...s, msg])
    } catch {
      setError('Не удалось отправить сообщение. Попробуйте ещё раз.')
      throw new Error('Message send failed')
    }
  }

  return {
    messages,
    error,
    sendMessage,
  }
}
