import type {
  CheckAccountRequest,
  CheckAccountResponse,
  DeleteNotificationResponse,
  GetStateInstanceResponse,
  GreenApiConfig,
  ReceiveNotificationResponse,
  SendMessageRequest,
  SendMessageResponse,
} from './types';

async function request<T>(
  config: GreenApiConfig,
  httpMethod: 'GET' | 'POST' | 'DELETE',
  apiMethod: string,
  parameters: string[] = [],
  options: {
    body?: unknown;
    signal?: AbortSignal;
    errorMethod?: string;
    emptyResponse?: T;
  } = {},
): Promise<T> {
  const url = buildUrl(config, apiMethod, ...parameters);
  const requestInit: RequestInit = {
    method: httpMethod,
    signal: options.signal,
  };

  if (options.body !== undefined) {
    requestInit.headers = {
      'Content-Type': 'application/json',
    };
    requestInit.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, requestInit);

  return parseJsonResponse<T>(response, options.errorMethod ?? apiMethod, options.emptyResponse);
}

function buildUrl(config: GreenApiConfig, method: string, ...parameters: string[]): string {
  return [
    config.baseUrl,
    `waInstance${encodeURIComponent(config.idInstance)}`,
    method,
    encodeURIComponent(config.apiTokenInstance),
    ...parameters.map((parameter) => encodeURIComponent(parameter)),
  ].join('/');
}

async function parseJsonResponse<T>(
  response: Response,
  method: string,
  emptyResponse?: T,
): Promise<T> {
  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`GREEN-API ${method} failed with HTTP ${response.status}`);
  }

  if (!responseText.trim() && emptyResponse !== undefined) {
    return emptyResponse;
  }

  let responseBody: T;

  try {
    responseBody = JSON.parse(responseText) as T;
  } catch {
    throw new Error(`GREEN-API returned invalid JSON (HTTP ${response.status})`);
  }

  return responseBody;
}

export async function getStateInstance(config: GreenApiConfig): Promise<GetStateInstanceResponse> {
  return request<GetStateInstanceResponse>(config, 'GET', 'getStateInstance', [], {
    errorMethod: 'GetStateInstance',
  });
}

export async function checkAccount(
  config: GreenApiConfig,
  phoneNumber: number,
): Promise<CheckAccountResponse> {
  if (!Number.isSafeInteger(phoneNumber) || phoneNumber <= 0) {
    throw new Error('Введите корректный номер телефона.');
  }

  const requestBody: CheckAccountRequest = { phoneNumber };

  return request<CheckAccountResponse>(config, 'POST', 'checkAccount', [], {
    body: requestBody,
    errorMethod: 'CheckAccount',
  });
}

export async function sendMessage(
  config: GreenApiConfig,
  chatId: string,
  message: string,
): Promise<SendMessageResponse> {
  const requestBody: SendMessageRequest = { chatId, message };
  return request<SendMessageResponse>(config, 'POST', 'sendMessage', [], {
    body: requestBody,
    errorMethod: 'SendMessage',
  });
}

export async function receiveNotification(
  config: GreenApiConfig,
  signal?: AbortSignal,
): Promise<ReceiveNotificationResponse> {
  return await request<ReceiveNotificationResponse>(config, 'GET', 'receiveNotification', [], {
    signal,
    errorMethod: 'ReceiveNotification',
    emptyResponse: null,
  });
}

export async function deleteNotification(
  config: GreenApiConfig,
  receiptId: number,
  signal?: AbortSignal,
): Promise<DeleteNotificationResponse> {
  return request<DeleteNotificationResponse>(
    config,
    'DELETE',
    'deleteNotification',
    [String(receiptId)],
    { signal, errorMethod: 'DeleteNotification' },
  );
}
