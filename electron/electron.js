// Modules to control application life and create native browser window
const { app, shell, BrowserWindow } = require('electron');
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// TODO add autoupdater

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 500,
    height: 700,
    minWidth: 500,
    minHeight: 700,
    webPreferences: {
      devTools: false
    }
  });

  let mainSession = mainWindow.webContents.session;

  // TODO add check that index.html exist in build
  // and load the index.html of the app.
  mainWindow.loadFile('./electron/build/index.html');

  // set api.moonpay.io cookies
  mainSession.cookies.set({
    url: 'https://api.moonpay.io',
    name: 'customerToken',
    value: '',
    domain: 'api.moonpay.io',
    expirationDate: 9999999999
  });

  // to see all cookies in console
  // mainSession.cookies.get({}).then(cookies => {
  //   console.log(cookies);
  // });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Catch all attempts to open new window and open them in default browser
  mainWindow.webContents.on('new-window', function(event, url) {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
