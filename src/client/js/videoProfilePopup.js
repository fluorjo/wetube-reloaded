const videoMixins = document.querySelectorAll("a");


videoMixins.forEach((mixin)=>{

    const saveUrlToStorage = (event) =>{
        videoURL=mixin.href;
        localStorage.setItem("secondVideo",videoURL);
        event.preventDefault();
        window.close();
    };
    

    mixin.addEventListener('click',saveUrlToStorage);
});
