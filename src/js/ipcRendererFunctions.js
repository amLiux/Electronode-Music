window.addEventListener('DOMContentLoaded', ()=>{
    const {ipcRenderer: ipc} = require('electron');
    let ipcSendBtn = document.getElementById('sendSongIpc');

    ipcSendBtn.addEventListener('click', () =>{
        let song = document.getElementById('songInput');
        let artist = document.getElementById('artistInput');
        let fatherDiv = document.getElementById('fatherDiv');
        let data = `${song.value} - ${artist.value}`;
        //li classes
        const liClasses = [ 'list-group-item', 'font-weight-light', 'font-italic' ];
        const ulClasses = ['list-group' , 'list-group-flush', 'mb-4'];
        if(document.getElementById("songsQueue") === null){
            //creating Ul and Li in case that they do not exist
            let newUl = document.createElement('ul');
            let newLi = document.createElement('li');
            //adding clases and id for them
            newUl.classList.add(...ulClasses);
            newUl.setAttribute("id", "songsQueue");
            
            newLi.classList.add(...liClasses);
            newLi.innerText =`${data}`;
            
            document.getElementById("noSongsMsg").style.display='none';
            
            newUl.append(newLi);
            
            fatherDiv.prepend(newUl);
        }else{
            let oldUl = document.getElementById('songsQueue');
            let newLi = document.createElement('li');
            newLi.classList.add(...liClasses);
            newLi.innerText = `${data}`;
            oldUl.append(newLi);
        }

        song.value = null;
        artist.value = null;

        ipc.send('sendingSongInfo', data);

    });

    ipc.on('data', (e, arg) =>{
        console.log(arg.data);
        let a = JSON.stringify(arg.data.link).slice(1, -1).replace("<img src='//api.youtube6download.top/icon/download.png' style='vertical-align:middle;'> <strong>Download MP3</strong>", '');
        a = a.substring(0, a.length - 4);
        a +='<p class="font-weight-bold font-italic">Click Here to download. <i class="fas fa-download"></i></p></a>';

        var div = document.createElement('div');
        div.innerHTML = a.trim();
        div.classList.add("mt-4");
        fatherDiv.append(div);
    });
})

