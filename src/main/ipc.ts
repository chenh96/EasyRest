import { BrowserWindow, ipcMain, shell } from 'electron'

export const addIpcListeners = (window: BrowserWindow) => {
  ipcMain.on('toggleDevTools', () => {
    window.webContents.openDevTools()
  })

  ipcMain.on('openGithub', () => {
    shell.openExternal('https://github.com/chenh96/EasyRest')
  })
}
