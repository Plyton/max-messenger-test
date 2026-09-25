export type SendMessageRequest = {
  chatId: string
  message: string
}

export type SendMessageResponse = {
  idMessage: string
}

export type ReceiveNotificationMessageData = {
  typeMessage?: string
  textMessageData?: {
    textMessage?: string
  }
}

export type ReceiveNotificationBody = {
  typeWebhook?: string
  instanceData?: {
    idInstance?: number
    wid?: string
    typeInstance?: string
  }
  timestamp?: number
  idMessage?: string
  senderData?: {
    chatId?: string
    sender?: string
    senderName?: string
    senderContactName?: string
  }
  messageData?: ReceiveNotificationMessageData
}

export type ReceiveNotification = {
  receiptId: number
  body: ReceiveNotificationBody
}

export type ReceiveNotificationResponse = ReceiveNotification | null

export type DeleteNotificationResponse = {
  result: boolean
}
