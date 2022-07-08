import { app, Menu, BrowserWindow } from 'electron'
import { join } from 'path'
import { addIpcListeners } from './ipc'

!app.requestSingleInstanceLock()
  ? app.quit()
  : app.whenReady().then(() => {
      Menu.setApplicationMenu(null)

      const window = new BrowserWindow({
        title: 'EasyRest',
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
          preload: join(__dirname, 'preload.js'),
          webSecurity: false,
          spellcheck: false
        }
      })

      addIpcListeners(window)

      // window.loadURL('http://127.0.0.1:3000/')
      window.loadFile(join(__dirname, '../view/index.html'))

      app.on('second-instance', () => {
        if (window.isMinimized()) {
          window.restore()
        }
        window.focus()
      })
    })
