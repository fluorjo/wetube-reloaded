const videoMixins = document.querySelectorAll("a");


videoMixins.forEach((mixin)=>{

    const vvv = (event) =>{
        console.log(mixin.href);
        event.preventDefault();
    };
    

    mixin.addEventListener('click',vvv);
});
