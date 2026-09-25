export type ChatMessage = {
  id: string
  text: string
  ts: number
  direction: 'incoming' | 'outgoing'
}
