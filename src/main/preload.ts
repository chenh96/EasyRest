import { ipcRenderer, contextBridge } from 'electron'

contextBridge.exposeInMainWorld('ipc', {
  request(action: string, ...data: any[]) {
    return ipcRenderer.sendSync(action, data)
  },
  send(action: string, ...data: any[]) {
    ipcRenderer.send(action, data)
  }
})
