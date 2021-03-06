// {app}            Module to control application life.
// {BrowserWindow}  Module to create native browser window.
const { app, BrowserWindow } = require('electron')
var fs = require('fs')
var path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;


function createWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 800,
        minWidth: 840,
        minHeight: 648,
        acceptFirstMouse: true,
        titleBarStyle: 'hidden',
        frame: false,
        show: false,
        backgroundColor: '#fff',
        icon: __dirname +  '/src/assets/icons/mac/manseeks-icon.png.icns'
    });

    // and load the index.html of the app.
    // console.log('file://' + path.join(__dirname, '/src/index.html'));
    mainWindow.loadURL('file://' + path.join(__dirname, '/dist/index.html'));
    // mainWindow.loadURL('http://localhost:4200')
    
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    require('./menu/mainmenu');
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})