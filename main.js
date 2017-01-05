const electron = require('electron')

// Module to control application life.
const app = electron.app

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const session = electron.session
const dialog = electron.dialog

const path = require('path')
const parseArguments = require('minimist')

const argDefaults = {
  'title': null
}

const argv = parseArguments(process.argv.slice(1), {default: argDefaults});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const siteUrl = argv._.slice(-1)[0]
const siteSessionId = siteUrl.replace(/\//g, '_')
const windowTitle = argv.title

let siteSession

appUserDataPath = app.getPath('userData')
app.setPath('userData', path.join(appUserDataPath, 'sessions', siteSessionId))

// TODO check for required arguments

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    session: siteSession,
    show: false,
    webPreferences: {
      nodeIntegration: false
    }
  })
  // Hide the menu since we do not need it!
  mainWindow.setMenu(null)

  // Enable the DevTools if the debug flag is set
  if (argv.debug)
    mainWindow.webContents.openDevTools()

  console.log('Loading URL: ' + siteUrl)

  // and load the index.html of the app.
  mainWindow.loadURL(siteUrl);

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  mainWindow.webContents.on('did-fail-load', function(event, errorCode, errorDescription) {
    console.log(errorDescription)
    dialog.showErrorBox('Error loading website', `
    URL: ${siteUrl}
    Error: ${errorCode} (${errorDescription})

    Make sure you didn't misstype the URL and try again.`)
    mainWindow.close()
  })


  mainWindow.webContents.on('did-finish-load', function(event) {
    mainWindow.setTitle(windowTitle)
  })

  // Display window when page is fully loaded
  mainWindow.once('ready-to-show', function () {
    mainWindow.show()
  })
}

function init () {
  siteSession = session.fromPartition('persist:' + siteSessionId)
  createWindow()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', init)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
