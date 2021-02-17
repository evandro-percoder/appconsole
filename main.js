const { app, BrowserWindow, nativeImage } = require("electron");

// Habilita o live reload no Electron e no FrontEnd da aplicação com a lib electron-reload
// Assim que alguma alteração no código é feita
require("electron-reload")(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`),
});

// Função que cria uma janela desktop
function createWindow() {
  // Adicionando um ícone na barra de tarefas/dock
  const icon = nativeImage.createFromPath(`${app.getAppPath()}/build/icone.png`);

  if (app.dock) {
    app.dock.setIcon(icon);
  }

  // Cria uma janela de desktop
  const win = new BrowserWindow({
    icon,
    width: 800,
    height: 600,
    webPreferences: {
      // habilita a integração do Node.js no FrontEnd
      nodeIntegration: true,
    },
  });

  // carrega a janela com o conteúdo dentro de index.html
  win.loadFile("index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});