
# Electronode Music

----
## What is Electronode?

> Electronode is an [Electron](https://electronjs.org/) App that uses *[electron-handlebars](https://www.npmjs.com/package/electron-handlebars "electron-handlebars npm link"), [Bootstrap v4.3](https://getbootstrap.com/) and Vanilla JS* to download songs.

## Usage
1. Download or clone the repo.
2. Surf into the directory where Electronode is located.
3. ``` > npm install ```
4. ``` > electron src/index```
5. Enjoy it!

---
## How it works? 
The main process renders ```mainWindow``` and loads the first HBS file. There we have a two input form that helps us to create the **_YouTube Query_**. 
```javascript
let youtubeQuery = "input1 + input2"; 
```
then we load this into a [**_Browser Window_**](https://electronjs.org/docs/api/browser-window). 
And load the whole query like this:
```javascript 
youtubeWin.loadURL(`https://www.youtube.com/results?search_query=${youtubeQuery}`);
```
I preload a script on that ```youtubeWin``` so it picks the first <a> HTML tag on which his href attribute contains his **_YouTube video id_**. 

And why is this important? This is our main piece to consume the [Youtube To Mp3 Download](https://rapidapi.com/CoolGuruji/api/youtube-to-mp3-download) API. This is a little example of the request.

```javascript
const getRequest = (songId) => {
    var req = http.request(
        {
            "method": "GET",
            "hostname": "coolguruji-youtube-to-mp3-download-v1.p.rapidapi.com",
            "port": null,
            "path": `/?id=${songId}`,
            "headers": {
                "x-rapidapi-host": "coolguruji-youtube-to-mp3-download-v1.p.rapidapi.com",
                "x-rapidapi-key": "yourAPIkey"
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
```

Then you can see that I send this response from our main process to our mainWindow because the response is actually HTML code that I'm trying to append to the code.