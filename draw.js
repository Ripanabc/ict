/*
  Visit my homepage on https://typable.dev
  Follow me on:
    - GitHub: https://github.com/typable
    - Instagram: https://www.instagram.com/typable.dev
    - Twitter: https://twitter.com/typabledev
  Support me on https://www.buymeacoffee.com/typable
*/

let array = [];
let active;

let canvas = document.querySelector('#app');
let g = canvas.getContext('2d');
let memory = document.createElement('canvas');
let h = memory.getContext('2d');
memory.width = canvas.width;
memory.height = canvas.height;

g.lineWidth = 5;
g.lineJoin = 'round';
g.lineCap = 'round';
g.strokeStyle = '#331414DD';

document.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, { passive: false });

canvas.addEventListener('pointerdown', function(event) {
  array.push({
    x: event.layerX,
    y: event.layerY
  });
  active = true;
});

canvas.addEventListener('pointermove', function (event) {
  if(active) {
    g.clearRect(0, 0, canvas.width, canvas.height);
    g.drawImage(memory, 0, 0);
    array.push({
      x: event.layerX,
      y: event.layerY
    });
    draw();
  }
});

document.addEventListener('pointerup', function (event) {
  if(active) {
    active = false;
    h.clearRect(0, 0, memory.width, memory.height);
    h.drawImage(canvas, 0, 0);
    array = [];
  }
});

document.addEventListener('pointerout', function (event) {
  if(active) {
    active = false;
    h.clearRect(0, 0, memory.width, memory.height);
    h.drawImage(canvas, 0, 0);
    array = [];
  }
});

function draw() {
  if(array.length < 1) {
    return;
  }
  if(array.length < 1) {
    g.beginPath();
    g.arc(array[0].x, array[0].y, g.lineWidth / 2, 0, Math.PI * 2, !0);
    g.closePath();
    g.fill();
    return;
  }
  g.beginPath();
  g.moveTo(array[0].x, array[0].y);
  let i;
  for(i = 1; i < array.length - 2; i++) {
    let dx = (array[i].x + array[i + 1].x);
    let dy = (array[i].y + array[i + 1].y);
    g.quadraticCurveTo(array[i].x, array[i].y, dx /2, dy /2);
  }
  g.quadraticCurveTo(array[i].x, array[i].y, array[i + 1].x, array[i + 1].y);
  g.stroke();
}
