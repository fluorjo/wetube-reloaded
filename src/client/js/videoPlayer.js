

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
const stickScreenBtn = document.getElementById("stickScreen");
const stickScreenIcon = stickScreenBtn.querySelector("i");


const videoContainer = document.getElementById("videoContainer");

const videoControls = document.getElementById("videoControls");

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

window.addEventListener("keydown",(event) =>{
    if(event.target.localName!=="textarea"){

    spaceControl(event);
    }else{

    }
});

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


//-----로컬스토리지에 변화 있으면 새로고침---//

window.onstorage = event => { 
    location.reload();
  };

//------------스크린샷----------------//
const screenShot = document.getElementById("screenShot");
const screenShotAnchor = screenShot.querySelector("a");

// const submitScreenShot = async(event) =>{
//     event.preventDefault();

//     const videoId = videoContainer.dataset.id;
//     await fetch(`/api/videos/${videoId}/meme`,{
//         method:"POST"
//         //req.body로 보낼 정보들.
//         body:{

//         }
//     }
//     )
// }
function b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const image_data = atob(b64Data.split(',')[1]); 
  
    const arraybuffer = new ArrayBuffer(image_data.length);
    const view = new Uint8Array(arraybuffer);
  
    for (let i = 0; i < image_data.length; i++) {
       view[i] = image_data.charCodeAt(i) & 0xff;

    }
  
    return new Blob([arraybuffer], { type: contentType });
 };
 const downloadFile = (fileUrl, fileName) =>{
    const a = document.createElement("a");
    a.href=fileUrl;
    a.download=fileName;
    document.body.appendChild(a);
    a.click();
  };
const capture =() =>{
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    let dataURL = canvas.toDataURL("image/png");
//    screenShotAnchor.href = dataURL;

    const contentType = 'image/png';
    const b64Data = dataURL;
    const blob = b64toBlob(b64Data, contentType); // base64 -> blob
    const blobUrl = URL.createObjectURL(blob);
 
    const img = document.createElement('img');
    img.src = blobUrl;
    localStorage.setItem("screenshot",blobUrl);

   const a = document.createElement("a");
   const {id} = videoContainer.dataset;
    a.href=`/videos/${id}/mememaker`;
    document.body.appendChild(a);
    a.click();
      };


       

       

    //downloadFile(memeUrl, "ddddd.jpg");
    //URL.revokeObjectURL(memeUrl);

    //fetch(screenShotAnchor.href).then(console.log)  
    //screenShotAnchor.download = "capture.png";
    //screenShotAnchor.click();


screenShotAnchor.addEventListener("click", capture);

