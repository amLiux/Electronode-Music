const { app, BrowserWindow, ipcMain: ipc} = require("electron");
const http = require("https");
const path = require("path");

require('electron-handlebars')({
    nombre: 'Marceliux!',
});

const getRequest = (songId) => {
    var req = http.request(
        {
            "method": "GET",
            "hostname": "coolguruji-youtube-to-mp3-download-v1.p.rapidapi.com",
            "port": null,
            "path": `/?id=${songId}`,
            "headers": {
                "x-rapidapi-host": "coolguruji-youtube-to-mp3-download-v1.p.rapidapi.com",
                "x-rapidapi-key": "c40bfd2a85msha2b8446cac8b506p19e873jsne60fa6a98d49"
            }
        }, (res) => {
            var chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                var body = Buffer.concat(chunks);
                mainWindow.webContents.send('data', JSON.parse(body.toString()));
            });
        });
    req.end();
}

ipc.on('sendingSongInfo', async (event, arg) => {
    let youtubeQuery = '';
    let youtubeWin = new BrowserWindow({ 
        width: 800, 
        height: 600,
        webPreferences:{
            nodeIntegration:true,
            preload: path.join(__dirname, '/js/youtubeScript.js')
        } 
    });

    // youtubeWin.hide();
    arg.split("-").map(val=> youtubeQuery=== "" ? youtubeQuery+= `${val.trim()}+-+`: youtubeQuery += `${val.trim()}`);
    youtubeWin.loadURL(`https://www.youtube.com/results?search_query=${youtubeQuery}`);

    youtubeWin.on('closed', () => {
        win = null
    });

});

ipc.on('videoId', async (event, arg) => {
    arg = arg.substring(arg.indexOf("=") + 1);
    await getRequest(arg);
});

const createWindow = () => 
    new BrowserWindow({
        width: 1080, 
        height: 840,
        resizable: false,
        show:false,
        movable: true,
        webPreferences: {
            nodeIntegration: true
        },
        frame: false,
        // title: 'Electronode Music',
        opacity: 0.96,
    })



app.on('window-all-closed', () => app.quit());

app.on('ready', () => {
    let mainWindow = createWindow()
    mainWindow.loadURL(`file://${__dirname}/views/index.hbs`);
    mainWindow.once('ready-to-show', ()=> mainWindow.show());
});


