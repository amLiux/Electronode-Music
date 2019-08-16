
# Electronode Music

----
## What is Electronode?

> Electronode is an [Electron](https://electronjs.org/) App that uses *[electron-handlebars](https://www.npmjs.com/package/electron-handlebars "electron-handlebars npm link"), [Bootstrap v4.3](https://getbootstrap.com/) and Vanilla JS* to download songs.

----
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
let youtubeQuery = "input1 + input 2"; 
```
then we load this into a [**_Browser Window_**](https://electronjs.org/docs/api/browser-window). 
and load the whole query like this:
```javascript 
youtubeWin.loadURL(`https://www.youtube.com/results?search_query=${youtubeQuery}`);
```
I preload a script on that ```youtubeWin``` so it picks the first