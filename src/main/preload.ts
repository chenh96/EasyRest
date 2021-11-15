import { ipcRenderer, contextBridge } from 'electron'

contextBridge.exposeInMainWorld('ipc', {
  request<T, R>(action: string, data?: T): R | null {
    const result = ipcRenderer.sendSync(action, data)
    return result ? (result as R) : null
  },
  send<T>(action: string, data?: T) {
    ipcRenderer.send(action, data)
  },
})
