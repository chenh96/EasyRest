import { app, Menu, BrowserWindow } from 'electron'
import { join } from 'path'
import { addListeners } from './listener'

!app.requestSingleInstanceLock()
  ? app.quit()
  : app.whenReady().then(() => {
      Menu.setApplicationMenu(null)

      const window = new BrowserWindow({
        minWidth: 800,
        minHeight: 600,
        autoHideMenuBar: true,
        title: 'EasyRest',
        webPreferences: {
          webSecurity: false,
          preload: join(__dirname, 'preload.js'),
          spellcheck: false
        }
      })

      addListeners(window)

      // window.loadURL('http://127.0.0.1:3000/')
      window.loadFile(join(__dirname, '/web/index.html'))

      app.on('second-instance', () => {
        if (window.isMinimized()) {
          window.restore()
        }
        window.focus()
      })
    })
