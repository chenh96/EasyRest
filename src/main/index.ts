import { app, BrowserWindow } from 'electron'
import { join } from 'path'
import { addListeners } from './listener'

app.whenReady().then(() => {
  const window = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    autoHideMenuBar: true,
    title: '',
    webPreferences: {
      webSecurity: false,
      preload: join(__dirname, 'preload.js')
    }
  })

  // window.loadURL('http://127.0.0.1:3000/')
  window.loadFile(join(__dirname, '/web/index.html'))

  addListeners(window)
})
