// Track mouse movement to update cursor position
$(document).on('mousemove', function(e) {
    $('#cursor').css({top: e.pageY + 'px', left: e.pageX + 'px'});
});

// Load YouTube iframe API script
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var muted = false;

// Initialize YouTube player when API is ready
function onYouTubeIframeAPIReady() {
    player = new YT.Player("youtube-player", {
        events: {
            'onReady': onPlayerReady
        }
    });
}

let interval;

// Handle player ready event
function onPlayerReady() {
    player.mute();

    $('#sounds').on("change", function(){
        muted = !muted;
        clearInterval(interval)
        if(muted) {
            let volume = 0.3;
            interval = setInterval(() => {
                if(volume > 0.00) {
                    volume -= 0.02
                    song.volume = volume;
                } else {
                    clearInterval(interval)
                    song.volume = .0;
                }
            }, 1);
        } else {
            let volume = 0.0;
            interval = setInterval(() => {
                if(volume < 1.00) {
                    volume += 0.02
                    song.volume = volume;
                } else {
                    clearInterval(interval)
                    song.volume = 0.3;
                }
            }, 1);
        }
    });
}

// Handle progress updates
var count = 0;
var thisCount = 0;
const handlers = {
    startInitFunctionOrder(data) {
        count = data.count;
    },

    initFunctionInvoking(data) {
        document.querySelector('.progressBar').style.left = '0%';
        document.querySelector('.progressBar').style.width = ((data.idx / count) * 100) + '%';
    },

    startDataFileEntries(data) {
        count = data.count;
    },

    performMapLoadFunction(data) {
        ++thisCount;
        document.querySelector('.progressBar').style.left = '0%';
        document.querySelector('.progressBar').style.width = ((thisCount / count) * 100) + '%';
    },
};

window.addEventListener('message', function (e) {
    (handlers[e.data.eventName] || function () { })(e.data);
});

// Initialize audio element and timer
let audioElement = new Audio("assets/music/song1.mp3");
audioElement.play();
audioElement.volume = 0.5
let isPaused = false;

// Toggle play/pause
$("#pause").click(function(){
    if(!isPaused){
        isPaused = true;
        $('#pause').attr('src','assets/img/play.png');
        audioElement.pause();
    }else {
        isPaused = false
        $('#pause').attr('src','assets/img/pause.png');
        audioElement.play();
    }
})

let timer = 0

// Start progress timer
function startTimer() {
    setInterval(function () {
        if(isPaused){
            timer = timer
        }else {
            timer = timer + 0.1
            if(timer > 100){
                timer = 0
            }
        }
        document.querySelector('#progress').style.width = timer+"%";
    }, 100);
}

// Switch between songs
let song1 = "song1.mp3"
let song2 = "song2.mp3"
let song3 = "song3.mp3"
let currentSong = song1

$("#left").click(function(){
    if(currentSong == song1){
        newSong = song3
        currentSong = song3
        timer = 0
        audioElement.pause();
        $("#songlabel").html(Config.Songs['Song3_Label'])

    }else if(currentSong == song2){
        newSong = song1
        currentSong = song1
        timer = 0
        audioElement.pause();
        $("#songlabel").html(Config.Songs['Song1_Label'])
    }else if(currentSong == song3){
        newSong = song2
        currentSong = song2
        timer = 0
        audioElement.pause();
        $("#songlabel").html(Config.Songs['Song2_Label'])
    }
    audioElement = new Audio("assets/music/"+currentSong+"");
    var rangeValue = document.getElementById("myRange").value;
    audioElement.volume = parseInt(rangeValue)/100
    audioElement.play();
})

$("#right").click(function(){
    if(currentSong == song1){
        newSong = song2
        currentSong = song2
        timer = 0
        audioElement.pause();
        $("#songlabel").html(Config.Songs['Song2_Label'])
    }else if(currentSong == song2){
        newSong = song3
        currentSong = song3
        timer = 0
        audioElement.pause();
        $("#songlabel").html(Config.Songs['Song3_Label'])
    }else if(currentSong == song3){
        newSong = song1
        currentSong = song1
        timer = 0
        audioElement.pause();
        $("#songlabel").html(Config.Songs['Song1_Label'])
    }
    audioElement = new Audio("assets/music/"+currentSong+"");
    var rangeValue = document.getElementById("myRange").value;
    audioElement.volume = parseInt(rangeValue)/100
    audioElement.play();
})

$("#songlabel").html(Config.Songs['Song1_Label'])
startTimer()

// Adjust volume
function setVolume(myVolume) {
    let myVolume2 = myVolume/100
    audioElement.volume = myVolume2;
}
