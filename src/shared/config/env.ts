function readBaseUrl(value: string | undefined): string {
  if (!value?.trim()) {
    throw new Error('Missing required environment variable: VITE_GREEN_API_BASE_URL');
  }

  return value.trim().replace(/\/+$/, '');
}

export const greenApiBaseUrl = readBaseUrl(import.meta.env.VITE_GREEN_API_BASE_URL);
