declare global {
  interface Window {
    ipc: {
      request<T, R>(action: string, data?: T): R | null
      send<T>(action: string, data?: T): void
    }
  }
}

export function openDevTools() {
  window.ipc.send('ShowDevTools')
}

export function openGithub() {
  window.ipc.send('OpenGithub')
}
