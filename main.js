// {app}            Module to control application life.
// {BrowserWindow}  Module to create native browser window.
const { app, BrowserWindow } = require('electron')
var fs = require('fs')
var path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 900,
        height: 800,
        minWidth: 840,
        minHeight: 648,
        acceptFirstMouse: true,
        titleBarStyle: 'hidden',
        frame: false,
        backgroundColor: '#fff',
        icon: __dirname +  '/src/assets/icons/mac/manseeks-icon.png.icns'
    });

    // and load the index.html of the app.
    // console.log('file://' + path.join(__dirname, '/src/index.html'));
    mainWindow.loadURL('file://' + path.join(__dirname, '/dist/index.html'));
    // mainWindow.loadURL('http://localhost:4200')
    

    // Open the DevTools.
    // mainWindow.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    require('./menu/mainmenu');
});
