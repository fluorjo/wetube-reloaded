//ctx.font='bold 48px serif';
//ctx.strokeText=('hello',50,100);
//let f = new FontFace('test', 'url(x)');

/*f.load().then(function(){
  'bold 48px serif'<-여기서 serif 부분만 바꿔주면 됨.
});
*/

const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const eraserBtn = document.getElementById("eraser-btn");
const destroyBtn = document.getElementById("destroy-btn");
const modeBtn = document.getElementById("mode-btn");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const textSize = document.getElementById("text-size");

let textSizeValue=50;



let url =localStorage.getItem("screenshot");
console.log(url);
const image = new Image();
image.src = url;

let IMAGE_WIDTH=image.width;
let IMAGE_HEIGHT=image.height;
console.log(IMAGE_WIDTH);

const CANVAS_WIDTH = IMAGE_WIDTH;
const CANVAS_HEIGHT = IMAGE_HEIGHT;

window.onstorage = event => { 
  location.reload();
};

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

image.onload = function(){
  // 이미지 그리기
  ctx.drawImage(image, 0, 0,IMAGE_WIDTH,IMAGE_HEIGHT);
};
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting() {
  isPainting = true;
}
function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}
function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function ontextSizeChange(event) {
  textSizeValue=event.target.value;
  ctx.font = event.target.value;

}


function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "🩸Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "🖍️Draw";
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onDestroyClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}

function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  //html에서 <img> 써준 것과 같음.
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}

function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save();
    //ctx의 현재 상태, 색상, 스타일 등 모든 걸 저장한다.
    ctx.lineWidth = 1;
    ctx.font = `${textSizeValue}px sans-serif`;
    ctx.fillText(text, event.offsetX, event.offsetY);
    //ctx.strokeText(text, event.offsetX, event.offsetY);
    ctx.restore();
    //ctx를 저장한 상태로 되돌린다.

  }
}

function onSaveClick() {
  const url = canvas.toDataURL();
  //base64로 인코딩돼있다.
  const a = document.createElement("a");
  //만들어진 이미지 url로 바로 링크한다. 
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
  //<a href="" download ~/>
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
//canvas.onmousemove=onMove <-이런 것도 가능?
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
textSize.addEventListener("change", ontextSizeChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);

destroyBtn.addEventListener("click", onDestroyClick);

eraserBtn.addEventListener("click", onEraserClick);

fileInput.addEventListener("change", onFileChange);

saveBtn.addEventListener("click", onSaveClick);