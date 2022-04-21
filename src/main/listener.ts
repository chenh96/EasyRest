import { ipcMain, BrowserWindow, shell } from 'electron'

export function addListeners(window: BrowserWindow) {
  ipcMain.on('ShowDevTools', () => {
    window.webContents.openDevTools()
  })

  ipcMain.on('OpenGithub', () => {
    shell.openExternal('https://github.com/chenh96/EasyRest')
  })
}
