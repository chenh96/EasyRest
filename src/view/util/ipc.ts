declare global {
  interface Window {
    ipc: {
      request<T, R>(action: string, data?: T): R | null
      send<T>(action: string, data?: T): void
    }
  }
}

export function toggleDevTools() {
  window.ipc.send('toggleDevTools')
}

export function openGithub() {
  window.ipc.send('openGithub')
}
