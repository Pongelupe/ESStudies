const electron = require('electron');

const { app, BrowserWindow, Menu, ipcMain } = electron;
let mainWindow;
let commentWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/main.html`);
    mainWindow.on('close', () => app.quit());
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

function createCommentWindow() {
    commentWindow = new BrowserWindow({
        width: 500,
        height: 300,
        title: 'Novo comentário'
    });
    commentWindow.loadURL(`file://${__dirname}/comment.html`);
    commentWindow.on('closed', () => commentWindow = null);
    commentWindow.setMenu(null);
}

ipcMain.on('addComment', (event, comment) => {
    mainWindow.webContents.send('addComment', comment);
    commentWindow.close();
})

const menuTemplate = [
    {
        label: 'Menu',
        submenu: [
            {
                label: 'Adicionar comentário',
                click() { createCommentWindow() }
            },
            {
                label: 'Sair da aplicação',
                accelerator: 'Alt+F4',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

if (process.platform === 'darwin') {
    menuTemplate.unshift({});
}

if (process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: 'dev',
        submenu: [
            { role: 'reload'},
            {
                label: 'debug',
                accelerator: 'Ctrl+Shift+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    })
}