var zoom=10;
function noise_sum(x, y){
function noise_scale(scale){
return PerlinNoise.noise(zoom * (x+x_off)/scale, zoom *(y+y_off)/scale)
}
    
    var acc = -(1-1/(noise_scale(10)**2+1)) * (noise_scale(1)+.1)+ (1-1/(noise_scale(10)**2+1)) + 0.1* (noise_scale(1)) ;
  return acc;
}
       
       
// Beispiel:
var canvas = document.getElementById("noiseCanvas");
var x_off=0;
var y_off=0;
var n_off=0;
var n_scale=1;
var shader = function(r, g, b, a, x, y, w, h) {
    x /= w;
    y /= h; // normalize
    var n = noise_sum(x,y);
    n = n/n_scale-n_off
    if(n>0.9){
        r=g=b=255;
    }else if(n<0.1){
    r=0;g=0;b=255;
    }else{
    r=0;g=Math.round(n*255);b = Math.round(n*255);
    }

    return {r:r, g:g, b:b, a:255};
};

var manipulateImageData = function(canvas, shader) {
    var w = canvas.width;
    var h = canvas.height;
    var context  = canvas.getContext("2d");

    var imageData = context.createImageData(w, h);

    for (var i = 0, l = imageData.data.length; i < l; i += 4) {
        var x = (i  / 4) % w;
        var y = Math.floor(i / w / 4);

        var r = imageData.data[i + 0];
        var g = imageData.data[i + 1];
        var b = imageData.data[i + 2];
        var a = imageData.data[i + 3];

        var pixel = shader(r, g, b, a, x, y, w, h);

        imageData.data[i  ] = pixel.r;
        imageData.data[i + 1] = pixel.g;
        imageData.data[i + 2] = pixel.b;
        imageData.data[i + 3] = pixel.a;
    }

    context.putImageData(imageData, 0, 0);
};

manipulateImageData(canvas, shader);
  const mouse = {
    x: 0,
    y: 0,
  };
function change_zoom(){
    zoom = document.getElementById("zoom").value;
  document.getElementById("zoom_value").value = zoom;
  manipulateImageData(canvas, shader);
}
function change_n_off(){
    n_off = document.getElementById("n_off").value/10-5;
  document.getElementById("n_off_value").value = n_off;
  manipulateImageData(canvas, shader);
}
function change_n_scale(){
    n_scale = document.getElementById("n_scale").value/10;
  document.getElementById("n_scale_value").value = n_scale;
  manipulateImageData(canvas, shader);
}
  function recordStartPosition(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    mouse.moveX = 0;
    mouse.moveY = 0;
  }
  function recordMovement(e) {
    x_off += (e.offsetX - mouse.x)/100000;
    y_off += (e.offsetY- mouse.y)/100000;
    manipulateImageData(canvas, shader);
  }
    function placeVoxelIfNoMovement(event) {
    window.removeEventListener('mousemove', recordMovement);
    window.removeEventListener('mouseup', placeVoxelIfNoMovement);
  }


  canvas.addEventListener('mousedown', (event) => {
    event.preventDefault();
    recordStartPosition(event);
    window.addEventListener('mousemove', recordMovement);
    window.addEventListener('mouseup', placeVoxelIfNoMovement);
  }, {passive: false});
canvas.addEventListener('wheel', (function(e){zoom += e.deltaY*0.01; manipulateImageData(canvas, shader)}))

