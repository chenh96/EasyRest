import { ipcMain, BrowserWindow } from 'electron'

export function addListeners(window: BrowserWindow) {
  ipcMain.on('ShowDevTools', () => {
    window.webContents.openDevTools()
  })
}
