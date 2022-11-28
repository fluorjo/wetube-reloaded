const v = document.querySelectorAll("a");
console.log(v);

const vvv = (event) =>{
    console.log('sss');
    event.preventDefault();
};

v.addEventListener("click",vvv);