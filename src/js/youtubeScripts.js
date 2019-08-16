window.addEventListener('DOMContentLoaded', ()=>{
    const {ipcRenderer: ipc} = require('electron');
    var videoId = document.getElementById('thumbnail').getAttribute("href");
    setTimeout(()=>{
        ipc.send('videoId', videoId);
    }, 1000);
});