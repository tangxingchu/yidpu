// put this preload for main-window to give it prompt()
const ipcRenderer = require('electron').ipcRenderer

window.prompt2 = function (title, val) {
    return ipcRenderer.sendSync('prompt', { title, val })
}