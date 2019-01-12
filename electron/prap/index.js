const electron = require('electron');
const sizeOf = require('image-size');

const { app, BrowserWindow, ipcMain } = electron;
let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('obterDimensoesDaImagem', (event, path) => {
    sizeOf(path, (err, dimensions) => {
        mainWindow.webContents.send('dimensoesDaImagem', dimensions);
    });
});