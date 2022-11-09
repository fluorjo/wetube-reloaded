const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");

const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");

const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";

};

const handleMuteClick = (e) => {
    if (video.muted) {
    video.muted = false;
    video.volume = volumeValue;
    } else {
    video.muted = true;
    }
    muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
    volumeRange.value = video.muted ? 0 : volumeValue;
    };
const handleInputVolumeRange = (event) => {
    const {
    target: { value },
    } = event;
    if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
    }
    if (value == 0) {
    video.muted = true;
    muteBtn.innerText = "Unmute";
    }
    video.volume = value;
    };
const handleChangeVolumeRange = (event) => {
    const {
    target: { value },
    } = event;
    if (value != 0) {
    volumeValue = value;
    }
    };

const formatTime = (seconds)=>new Date(seconds *1000).toISOString().substring(11, 19);

const handleLoadedMetadata = ()=>{
    totalTime.innerText=formatTime(Math.floor(video.duration));
    timeline.max=Math.floor(video.duration);
};
const handleTimeUpdate = ()=>{
    currentTime.innerText=formatTime(Math.floor(video.currentTime));
    timeline.value=Math.floor(video.currentTime);

};

let videoPlayStatus = false;
let setVideoPlayStatus = false;

const handleTimelineChange = (event) => {
const {
target: { value },
} = event;
if (!setVideoPlayStatus) {
videoPlayStatus = video.paused ? false : true;
setVideoPlayStatus = true;
}
video.pause();
video.currentTime = value;
};

const handleTimelineSet = () => {
videoPlayStatus ? video.play() : video.pause();
setVideoPlayStatus = false;
};

const handleFullScreen =() =>{
    const fullscreen = document.fullscreenElement;
    if(fullscreen){       
        document.exitFullscreen();
        fullScreenIcon.classList = "fas fa-expand";

    } else{
        videoContainer.requestFullscreen();
        fullScreenIcon.classList = "fas fa-compress";
    }
};

const hideControls = ()=>videoControls.classList.remove("showing");

const  handleMouseMove= ()=>{
    if(controlsTimeout){
        clearTimeout(controlsTimeout);
        controlsTimeout=null;
    }
    if(controlsMovementTimeout){
        clearTimeout(controlsMovementTimeout);
        controlsMovementTimeout=null;
        
    }

    videoControls.classList.add("showing");
    controlsMovementTimeout=setTimeout(hideControls,3000)
};

const  handleMouseLeave= ()=>{
    controlsTimeout = setTimeout(hideControls,3000);
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);

volumeRange.addEventListener("input", handleInputVolumeRange);
volumeRange.addEventListener("change", handleChangeVolumeRange);

video.addEventListener("loadeddata",handleLoadedMetadata);
video.addEventListener("timeupdate",handleTimeUpdate);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);

timeline.addEventListener("input",handleTimelineChange);
timeline.addEventListener("change", handleTimelineSet);

fullScreenBtn.addEventListener("click", handleFullScreen);



//부가기능들

const handleVideoEnded = () => {
    video.currentTime = 0;
    playBtn.innerText = "Play";
    };
    
    video.addEventListener("ended", handleVideoEnded);

function spaceControl(event){
    let key = event.key || event.keyCode;
    if (key === ' ' || key === 32) {
        event.preventDefault();
        handlePlayClick();        
        return false;
}
};

window.addEventListener("keydown",(event) =>spaceControl(event));

