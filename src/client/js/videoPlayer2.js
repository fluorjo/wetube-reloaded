const videoContainer2 = document.getElementById("videoContainer2");

const videoControls = videoContainer2.querySelector("#videoControls");

const video = videoContainer2.querySelector("video");

const playBtn = videoContainer2.querySelector("#play");

const playBtnIcon = playBtn.querySelector("i");

const muteBtn = videoContainer2.querySelector("#mute");
const muteBtnIcon = muteBtn.querySelector("i");

const currentTime = videoContainer2.querySelector("#currentTime");
console.log(currentTime);
const totalTime = videoContainer2.querySelector("#totalTime");
const volumeRange = videoContainer2.querySelector("#volume");
const timeline = videoContainer2.querySelector("#timeline");
const fullScreenBtn = videoContainer2.querySelector("#fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const stickScreenBtn = videoContainer2.querySelector("#stickScreen");
const stickScreenIcon = stickScreenBtn.querySelector("i");






videoContainer.classList.add('relativeclass');

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
    muteBtnIcon.classList = "fas fa-volume-up";
    }
    if (value == 0) {
    video.muted = true;
    muteBtnIcon.classList = "fas fa-volume-mute";
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
const handleStickScreen =() =>{
    if(videoContainer.classList[0]==='relativeclass'){
        videoContainer.classList.remove('relativeclass');
        videoContainer.classList.add('stickyclass');
        stickScreenIcon.classList = "fas fa-thumbtack"; 
     


    } else{
        videoContainer.classList.remove('stickyclass');
        videoContainer.classList.add('relativeclass');
        stickScreenIcon.classList = "fas fa-circle-up";  

    }
};

const hideControls = ()=>{
    videoControls.classList.remove("showing");
};


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

const  handleEnded= ()=>{
    const {id} = videoContainer.dataset;
    fetch(`/api/videos/${id}/view`,{method:"POST",
});
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);

volumeRange.addEventListener("input", handleInputVolumeRange);
volumeRange.addEventListener("change", handleChangeVolumeRange);

video.addEventListener("loadeddata",handleLoadedMetadata);
video.addEventListener("timeupdate",handleTimeUpdate);
video.addEventListener("ended",handleEnded);

videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);

timeline.addEventListener("input",handleTimelineChange);
timeline.addEventListener("change", handleTimelineSet);

fullScreenBtn.addEventListener("click", handleFullScreen);

stickScreenBtn.addEventListener("click", handleStickScreen);


const handleVideoEnded = () => {
    video.currentTime = 0;
    playBtnIcon.classList = "fas fa-play";
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

video.addEventListener("click", handlePlayClick);


const divideBtn = document.getElementById("divideScreen");
const divideBtnIcon = divideBtn.querySelector("i");

const handleDivideScreen =() =>{
    const vc= document.querySelectorAll("#videoContainer");
    if(vc[1].classList[1]==='blind'){
        vc[1].classList.remove('blind');
        divideBtnIcon.classList = "fas fa-display"; 
    }else{
        vc[1].classList.add('blind');
        divideBtnIcon.classList = "fas fa-table-columns"; 
    }

        console.log(vc[1].classList[1]);
};

divideBtn.addEventListener("click", handleDivideScreen);

//-----------------------------//
const a={};
Object.defineProperty(a,'b',{

    get(){
        let secondVideoUrl =localStorage.getItem('secondVideo');
        let arrayUrl=secondVideoUrl.split('/');
        return `/${arrayUrl[5]}/${arrayUrl[6]}/${arrayUrl[7]}`;
    }
});


const secondVideoUrl =localStorage.getItem('secondVideo');
arrayUrl=secondVideoUrl.split('/');
finalUrl=`/${arrayUrl[5]}/${arrayUrl[6]}/${arrayUrl[7]}`;
const second_video=document.getElementById("2vid");
second_video.src=finalUrl;
// console.log(secondVideoUrl);
// console.log(arrayUrl);
// console.log(finalUrl);
//------------------------------//

window.onstorage = event => { 
    location.reload();
  };
   