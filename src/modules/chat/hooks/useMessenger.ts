import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { greenApiBaseUrl } from '@/config/env';
import {
  checkAccount as checkGreenApiAccount,
  deleteNotification,
  receiveNotification,
  sendMessage as sendGreenApiMessage,
} from '@/services/greenApi/greenApi';
import type {
  GreenApiConfig,
  GreenApiCredentials,
  ReceiveNotification,
} from '@/services/greenApi/types';
import type { ChatMessage, CurrentChat } from '@/modules/chat/types';

type Props = {
  credentials: GreenApiCredentials | null;
};

function createConfig(credentials: GreenApiCredentials): GreenApiConfig {
  return {
    baseUrl: greenApiBaseUrl,
    idInstance: credentials.idInstance,
    apiTokenInstance: credentials.apiTokenInstance,
  };
}

export function useMessenger({ credentials }: Props) {
  const [currentChat, setCurrentChat] = useState<CurrentChat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [accountError, setAccountError] = useState<string | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);
  const [receiveError, setReceiveError] = useState<string | null>(null);
  const [isCheckingAccount, setIsCheckingAccount] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messageIds = useRef(new Set<string>());
  const config = useMemo(() => (credentials ? createConfig(credentials) : null), [credentials]);

  useEffect(() => {
    if (!credentials || !currentChat) {
      return;
    }

    const pollingConfig = createConfig(credentials);
    const controller = new AbortController();

    const wait = async (milliseconds: number) => {
      await new Promise<void>((resolve) => {
        const timeoutId = window.setTimeout(() => {
          controller.signal.removeEventListener('abort', onAbort);
          resolve();
        }, milliseconds);
        const onAbort = () => {
          window.clearTimeout(timeoutId);
          resolve();
        };

        controller.signal.addEventListener('abort', onAbort, { once: true });
      });
    };

    const processNotification = (notification: ReceiveNotification): ChatMessage | null => {
      const { body } = notification;
      const messageId = body.idMessage;
      const text = body.messageData?.textMessageData?.textMessage?.trim();
      const isTargetChat = body.senderData?.chatId === currentChat.chatId;

      if (
        body.typeWebhook !== 'incomingMessageReceived' ||
        body.messageData?.typeMessage !== 'textMessage' ||
        !isTargetChat ||
        !messageId ||
        !text ||
        messageIds.current.has(messageId)
      ) {
        return null;
      }

      return {
        id: messageId,
        text,
        ts: body.timestamp ? body.timestamp * 1000 : Date.now(),
        direction: 'incoming',
      };
    };

    const poll = async () => {
      while (!controller.signal.aborted) {
        try {
          const notification = await receiveNotification(pollingConfig, controller.signal);

          if (controller.signal.aborted) return;

          if (!notification) {
            continue;
          }

          const message = processNotification(notification);
          if (message) {
            messageIds.current.add(message.id);
            setMessages((currentMessages) => [...currentMessages, message]);
          }

          await deleteNotification(pollingConfig, notification.receiptId, controller.signal);
          setReceiveError(null);
        } catch {
          if (controller.signal.aborted) return;

          setReceiveError('Не удалось получить сообщения. Повторяем подключение.');
          await wait(2000);
        }
      }
    };

    void poll();

    return () => {
      controller.abort();
    };
  }, [credentials, currentChat]);

  const openChat = useCallback(
    async (phoneNumber: string): Promise<boolean> => {
      if (!config) return false;

      setAccountError(null);
      setIsCheckingAccount(true);
      const normalizedPhone = phoneNumber.replace(/\D/g, '');
      const phoneNumberValue = Number(normalizedPhone);

      if (
        normalizedPhone.length < 7 ||
        normalizedPhone.length > 15 ||
        !Number.isSafeInteger(phoneNumberValue)
      ) {
        setAccountError('Введите корректный номер телефона.');
        setIsCheckingAccount(false);
        return false;
      }

      try {
        const response = await checkGreenApiAccount(config, phoneNumberValue);

        if (!response.exist) {
          setAccountError('Пользователь с этим номером не найден в MAX.');
          return false;
        }

        if (!response.chatId) {
          setAccountError('Не удалось открыть чат. Попробуйте ещё раз.');
          return false;
        }

        setMessages([]);
        setSendError(null);
        setReceiveError(null);
        messageIds.current.clear();
        setCurrentChat({ phoneNumber: normalizedPhone, chatId: response.chatId });
        return true;
      } catch {
        setAccountError('Не удалось проверить номер. Проверьте его и попробуйте снова.');
        return false;
      } finally {
        setIsCheckingAccount(false);
      }
    },
    [config],
  );

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmedText = text.trim();
      if (!trimmedText || !config || !currentChat) return;

      setSendError(null);
      setIsSending(true);

      try {
        const response = await sendGreenApiMessage(config, currentChat.chatId, trimmedText);
        const message: ChatMessage = {
          id: response.idMessage,
          text: trimmedText,
          ts: Date.now(),
          direction: 'outgoing',
        };
        messageIds.current.add(message.id);
        setMessages((currentMessages) => [...currentMessages, message]);
      } catch {
        setSendError('Не удалось отправить сообщение. Попробуйте ещё раз.');
        throw new Error('Message send failed');
      } finally {
        setIsSending(false);
      }
    },
    [config, currentChat],
  );

  return {
    accountError,
    currentChat,
    isCheckingAccount,
    isSending,
    messages,
    openChat,
    receiveError,
    sendError,
    sendMessage,
  };
}
