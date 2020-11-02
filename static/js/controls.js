var canvas = document.getElementById("noiseCanvas");
  const mouse = {
    x: 0,
    y: 0,
  };
  function recordStartPosition(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    mouse.moveX = 0;
    mouse.moveY = 0;
  }
  function recordMovement(e) {
    controls.offset.x += (e.offsetX - mouse.x)/1000;
    controls.offset.y += (e.offsetY- mouse.y)/1000;
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

/*
CHANGES TO THE ZOOM LEVEL
*/
var zoom_scroll = document.getElementById("zoom");
var zoom_value = document.getElementById("zoom_value");

canvas.addEventListener('wheel', function(e){
    controls.zoom = parseFloat(controls.zoom) + e.deltaY*0.01;
    zoom_scroll.value = controls.zoom;
    zoom_value.value = controls.zoom;
    manipulateImageData(canvas, shader)})


zoom_scroll.addEventListener("change", function(e){
  controls.zoom = zoom_scroll.value;
  zoom_value.value = controls.zoom;
  manipulateImageData(canvas, shader);
})
zoom_scroll.addEventListener("change", function(e){
  controls.zoom = zoom_value.value;
  zoom_scroll.value = controls.zoom;
  manipulateImageData(canvas, shader);
})
