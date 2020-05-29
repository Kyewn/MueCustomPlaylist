var audioPlayer = document.getElementById("audioPlayer");
var songPlaylist = document.getElementById("playlistContainer");
var songQueue = [];
var iconList;
var desc = document.querySelector(".desc");
var heading = document.querySelector(".desc > h1");
var descP = document.querySelector(".desc > p");
var audioMenu = document.querySelector(".audioMenu");
var playBtn = document.querySelector(".btn");
var trackBar = document.querySelector(".trackBar");
var trackProgress = document.querySelector(".trackProgress");
var skipBtn = document.querySelector("#skipBtn");


//show empty message when playlist is empty
var hasChildNodes = document.getElementById("playlistContainer").hasChildNodes();
if (hasChildNodes === false){
    var emptyMsgSpan = document.createElement("div");
    emptyMsgSpan.className += "emptyMsgSpan";
    var emptyMsg = document.createTextNode("Playlist is empty! How 'bout adding some music?");
    emptyMsgSpan.appendChild(emptyMsg);
    document.getElementById("playlistContainer").appendChild(emptyMsgSpan);
}

//just filebutton to be customized
document.getElementById("fileBtn").addEventListener('click', function() {
    document.getElementById("file").click();
});

document.getElementById("file").addEventListener('click', function() {
    document.getElementById("file").value = null;
});
//on file change/ using the upload btn
document.getElementById("file").addEventListener('change', function(e) {     
    var fileName = this.files[0].name;
    var fileType = this.files[0].type;
    var isAudioFile = fileType.indexOf("audio");
    // if uploaded file is audio file
    if (isAudioFile > -1) {
//        if (fileType.indexOf("mp3") > -1) {
            //create a song block in playlist
            var songBlock = document.createElement("div");
            songBlock.className += "songBlock";
            var songNameBlock = document.createElement("span");
            songNameBlock.dataset.name = fileName;
            songNameBlock.className += fileName.slice(0, -4);
            var songName = document.createTextNode(fileName.slice(0, -4));
            var deleteIcon = document.createElement("div");
            var deleteTextSpan = document.createElement("span");
            var deleteText = document.createTextNode("SKIP");
            deleteIcon.className += "deleteIcon";
            deleteTextSpan.className += "skipText";

            //if song already exist in playlist, no need to add it
            if (songQueue.indexOf(fileName) > -1) {
                alert("This song has already been added into the playlist!");
            } else {
                songQueue.push(fileName); //push the song to queue for play function
                //constructing the song block
                songNameBlock.appendChild(songName);
                songBlock.appendChild(songNameBlock);
                deleteTextSpan.appendChild(deleteText);
                deleteIcon.appendChild(deleteTextSpan);
                songBlock.appendChild(deleteIcon);
                songPlaylist.appendChild(songBlock); 
                if(songQueue == []) {
                    deleteIcon.dataset.index = 0;
                } else {
                    deleteIcon.dataset.index = songQueue.length-1;
                }    

                //if songqueue has no songs/ first upload              
                if (songPlaylist.childNodes[0].className === "emptyMsgSpan") {
                    var getEmptyMsg = document.getElementsByClassName("emptyMsgSpan")[0];
                    songPlaylist.removeChild(getEmptyMsg);
                    audioPlayer.src = "music_here/"+songQueue[0];

                    if (audioMenu.classList.contains("fadedAway")) {
                        audioMenu.classList.remove("fadedAway");
                    };
                    
                    heading.innerHTML = fileName.slice(0, -4);
                    
                    var para = document.createElement("p");
                    var node = document.createTextNode("NOW PLAYING");
                    para.appendChild(node);
                    desc.insertBefore(para, desc.firstChild);
                    
                    descP.innerHTML = "";   
                    descP.style.animation = "placeholder";

                    heading.style.animation = "fadeUp 1.7s cubic-bezier(0.01, 0.83, 0.91, 1.03) forwards .1s";
                    playBtn.style.animation = "fadeUp .6s forwards .3s";
                    trackBar.style.animation = "fadeUp .6s forwards .4s";
                    skipBtn.style.animation = "fadeUp .6s forwards .5s";                   

                    btn.classList.add("pause");
                    btn.classList.remove("play");
                }
            }
/*        } else {
            alert("not mp3");
        }  */ 
    } else {
        alert("no, change it");
    }
});

//on audio end
audioPlayer.addEventListener('ended', function() {
    if(songQueue.length == 1) {
        songQueue.shift();
        songPlaylist.removeChild(songPlaylist.firstChild);
        audioPlayer.src = "";
        var emptyMsgSpan = document.createElement("div");
        emptyMsgSpan.className += "emptyMsgSpan";
        var emptyMsg = document.createTextNode("Playlist is empty! How 'bout adding some music?");
        emptyMsgSpan.appendChild(emptyMsg);
        document.getElementById("playlistContainer").appendChild(emptyMsgSpan);

//*************Transition effects
        audioMenu.classList.add("fadedAway");

        desc.removeChild(desc.firstChild);
        heading.innerHTML = "Relax. Be Free.";
        heading.style.animation = "fadeIn .9s forwards .1s";
        descP.innerHTML = "Listen to your favourite music anytime, even when offline.";   
        descP.style.animation = "fadeIn .9s forwards .3s";
 
        playBtn.style.animation = "placeholder";
        trackBar.style.animation = "placeholder";
        skipBtn.style.animation = "placeholder";                   

//END****************
    } else {
        var skipBtns = document.querySelectorAll(".deleteIcon");
        skipBtns.forEach(function(obj) {
            obj.dataset.index -= 1;
        });
        songQueue.shift();
        songPlaylist.removeChild(songPlaylist.firstChild);
        heading.innerHTML = songQueue[0].slice(0, -4);
        heading.style.animation = "none";
        setTimeout(() => 
            heading.style.animation = ""
        , 1);
        heading.style.animation = "fadeUp 1.7s cubic-bezier(0.01, 0.83, 0.91, 1.03) forwards .1s";
        setTimeout(function() {
            audioPlayer.src = "music_here/"+songQueue[0];
        }, 50);
    }
}, false);

//play pause toggle function
var btn = document.querySelector(".btn");
btn.addEventListener('click', function() {
    if (btn.classList.contains("play")) {
        audioPlayer.play();
        btn.classList.add("pause");
        btn.classList.remove("play");
    } else if (btn.classList.contains("pause")) {
        audioPlayer.pause();
        btn.classList.add("play");
        btn.classList.remove("pause");
    }
});

//skip function
document.getElementById("skipBtn").addEventListener('click', function() {
    if(songQueue.length == 1) {
        songQueue.shift();
        audioPlayer.src = "''";
        songPlaylist.removeChild(songPlaylist.firstChild);
        var emptyMsgSpan = document.createElement("div");
        emptyMsgSpan.className += "emptyMsgSpan";
        var emptyMsg = document.createTextNode("Playlist is empty! How 'bout adding some music?");
        emptyMsgSpan.appendChild(emptyMsg);
        document.getElementById("playlistContainer").appendChild(emptyMsgSpan);

        //*************Transition effects
        audioMenu.classList.add("fadedAway");

        desc.removeChild(desc.firstChild);
        heading.innerHTML = "Relax. Be Free.";
        heading.style.animation = "none";
        setTimeout(function() {
            heading.style.animation = "fadeIn .9s forwards .1s";
        }, 50);

        descP.innerHTML = "Listen to your favourite music anytime, even when offline.";   
        descP.style.animation = "fadeIn .9s forwards .3s";
 
        playBtn.style.animation = "placeholder";
        trackBar.style.animation = "placeholder";
        skipBtn.style.animation = "placeholder";                   
        //END****************
    } else if (songPlaylist.childNodes[0].className == "emptyMsgSpan") {
        alert("The playlist has no songs playing currently!");
    } else {
        var skipBtns = document.querySelectorAll(".deleteIcon");
        skipBtns.forEach(function(obj) {
            obj.dataset.index -= 1;
        });
        songQueue.shift();
        songPlaylist.removeChild(songPlaylist.firstChild);
        heading.innerHTML = songQueue[0].slice(0, -4);
        heading.style.animation = "none";
        setTimeout(() => 
            heading.style.animation = ""
        , 1);
        setTimeout(function() {
            audioPlayer.src = "music_here/"+songQueue[0];
        }, 50);
    }
});

//WIP WIP WIP WPIP WIP IWPI PWIP WIP IWP WIW
//update: changed concept to adding data-indexes to get index value for the skipping func but still doesnt work
//possible deduction: iconList cannot be read as it is read as empty array initially when no songs are added 

//skip on selected song function
/*songPlaylist.addEventListener("DOMNodeInserted", function() { 
    iconList = document.querySelectorAll(".deleteIcon");
    iconList.forEach(function(element) {
        element.addEventListener('click', function() {  
            var nameOfSong = this.parentNode.childNodes[0].dataset.name;
            var indexByName = songQueue.indexOf(nameOfSong);
            var selectedBlock = this.parentNode;              

            if (songQueue.length == 1) {
                songQueue.shift();
                songPlaylist.removeChild(songPlaylist.firstChild);
                var emptyMsgSpan = document.createElement("div");
                emptyMsgSpan.className += "emptyMsgSpan";
                var emptyMsg = document.createTextNode("Playlist is empty! How 'bout adding some music?");
                emptyMsgSpan.appendChild(emptyMsg);
                document.getElementById("playlistContainer").appendChild(emptyMsgSpan);        
                setTimeout(function() {
                    audioPlayer.src = "";
                }, 1000);
            } else {
                songQueue.splice(indexByName,1); // <---  press first block output delete everything
                                                //        press any block after first deletes everything beneath it
                songPlaylist.removeChild(selectedBlock);    
                for (var blockIndex = indexByName; blockIndex <= songQueue.length; blockIndex++) {
                    document.getElementById("playlistContainer").children[blockIndex].childNodes[1].dataset.index -= 1;
                }
            };
        });
    });
});
*/
    audioPlayer.addEventListener('timeupdate', function() {
        var currentTime = this.currentTime;
        var duration = this.duration;
        var songPercent = currentTime/duration * 100 + "%";
    
        trackProgress.style.width = songPercent;
    });

while(songQueue == []) {
    var emptyMsgSpan = document.createElement("div");
    emptyMsgSpan.className += "emptyMsgSpan";
    var emptyMsg = document.createTextNode("Playlist is empty! How 'bout adding some music?");
    emptyMsgSpan.appendChild(emptyMsg);
    document.getElementById("playlistContainer").appendChild(emptyMsgSpan);        
}

