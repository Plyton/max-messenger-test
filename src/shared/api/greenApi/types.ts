export interface SendMessageRequest {
  chatId: string;
  message: string;
}

export interface SendMessageResponse {
  idMessage: string;
}

export interface GreenApiConfig {
  baseUrl: string;
  idInstance: string;
  apiTokenInstance: string;
}

export interface GreenApiCredentials {
  idInstance: string;
  apiTokenInstance: string;
}

export interface CheckAccountRequest {
  phoneNumber: number;
  force?: boolean;
}

export interface CheckAccountResponse {
  exist: boolean;
  chatId: string;
  fromCache: boolean;
}

export interface GetStateInstanceResponse {
  stateInstance: string;
}

export interface ReceiveNotificationMessageData {
  typeMessage?: string;
  textMessageData?: {
    textMessage?: string;
  };
}

export interface ReceiveNotificationBody {
  typeWebhook?: string;
  instanceData?: {
    idInstance?: number;
    wid?: string;
    typeInstance?: string;
  };
  timestamp?: number;
  idMessage?: string;
  senderData?: {
    chatId?: string;
    sender?: string;
    senderName?: string;
    senderContactName?: string;
  };
  messageData?: ReceiveNotificationMessageData;
}

export interface ReceiveNotification {
  receiptId: number;
  body: ReceiveNotificationBody;
}

export type ReceiveNotificationResponse = ReceiveNotification | null;

export interface DeleteNotificationResponse {
  result: boolean;
}
