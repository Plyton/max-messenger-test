export type GreenApiConfig = {
  baseUrl: string
  idInstance: string
  apiTokenInstance: string
  chatId: string | undefined
}

function readRequiredEnv(name: string, value: string | undefined): string {
  if (!value?.trim()) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value.trim()
}

const nodeEnvironment = (
  globalThis as typeof globalThis & {
    process?: { env: Record<string, string | undefined> }
  }
).process?.env
const environment = import.meta.env ?? nodeEnvironment ?? {}

export const greenApiConfig: GreenApiConfig = {
  baseUrl: readRequiredEnv('VITE_GREEN_API_BASE_URL', environment.VITE_GREEN_API_BASE_URL).replace(/\/+$/, ''),
  idInstance: readRequiredEnv('VITE_GREEN_API_ID_INSTANCE', environment.VITE_GREEN_API_ID_INSTANCE),
  apiTokenInstance: readRequiredEnv(
    'VITE_GREEN_API_TOKEN_INSTANCE',
    environment.VITE_GREEN_API_TOKEN_INSTANCE,
  ),
  chatId: environment.VITE_GREEN_API_CHAT_ID?.trim() || undefined,
}
