import { greenApiConfig } from '@/config/env'
import type {
  DeleteNotificationResponse,
  ReceiveNotificationResponse,
  SendMessageRequest,
  SendMessageResponse,
} from './types'

async function request<T>(
  httpMethod: 'GET' | 'POST' | 'DELETE',
  apiMethod: string,
  parameters: string[] = [],
  options: {
    body?: unknown
    signal?: AbortSignal
    errorMethod?: string
    emptyResponse?: T
  } = {},
): Promise<T> {
  const url = buildUrl(apiMethod, greenApiConfig.apiTokenInstance, ...parameters)
  const requestInit: RequestInit = {
    method: httpMethod,
    signal: options.signal,
  }

  if (options.body !== undefined) {
    requestInit.headers = {
      'Content-Type': 'application/json',
    }
    requestInit.body = JSON.stringify(options.body)
  }

  const response = await fetch(url, requestInit)

  return parseJsonResponse<T>(response, options.errorMethod ?? apiMethod, options.emptyResponse)
}

function buildUrl(method: string, ...parameters: string[]): string {
  return [
    greenApiConfig.baseUrl,
    `waInstance${encodeURIComponent(greenApiConfig.idInstance)}`,
    method,
    ...parameters.map((parameter) => encodeURIComponent(parameter)),
  ].join('/')
}

async function parseJsonResponse<T>(
  response: Response,
  method: string,
  emptyResponse?: T,
): Promise<T> {
  const responseText = await response.text()

  if (!response.ok) {
    throw new Error(`GREEN-API ${method} failed with HTTP ${response.status}`)
  }

  if (!responseText.trim() && emptyResponse !== undefined) {
    return emptyResponse
  }

  let responseBody: T

  try {
    responseBody = JSON.parse(responseText) as T
  } catch {
    throw new Error(`GREEN-API returned invalid JSON (HTTP ${response.status})`)
  }

  return responseBody
}

export async function sendMessage(chatId: string, message: string): Promise<SendMessageResponse> {
  const requestBody: SendMessageRequest = { chatId, message }
  return request<SendMessageResponse>('POST', 'sendMessage', [], {
    body: requestBody,
    errorMethod: 'SendMessage',
  })
}

export async function receiveNotification(signal?: AbortSignal): Promise<ReceiveNotificationResponse> {
  const response = await request<ReceiveNotificationResponse>(
    'GET',
    'receiveNotification',
    [],
    { signal, errorMethod: 'ReceiveNotification', emptyResponse: null },
  )

  return response ?? null
}

export async function deleteNotification(receiptId: number): Promise<DeleteNotificationResponse> {
  return request<DeleteNotificationResponse>(
    'DELETE',
    'deleteNotification',
    [String(receiptId)],
    { errorMethod: 'DeleteNotification' },
  )
}
