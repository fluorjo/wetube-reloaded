const videoMixins = document.querySelectorAll("a");

const vvv = (event) =>{
    console.log('sss');
    event.preventDefault();
};

videoMixins.forEach((mixin)=>{
    mixin.addEventListener('click',vvv)
});
