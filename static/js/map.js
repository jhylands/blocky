function Vector2(x, y){
    this.x = x;
    this.y = y;
}
function Controls(){
    this.offset = new Vector2(0,0);
    this.zoom = 10;
    this.view = "INTENSITY";
}

var terrain = new Terrain();
var controls = new Controls();
       
var canvas = document.getElementById("noiseCanvas");
var n_off=0;
var n_scale=1;
var shader = function(x, y, w, h) {
    x += controls.offset.x;
    y += controls.offset.y;
//    x /= w;
//    y /= h; // normalize
    
    x *=controls.zoom/100;
    y *=controls.zoom/100;
    return terrain.to_colour(x, y)
};

var manipulateImageData = function(canvas, shader) {
    var w = canvas.width;
    var h = canvas.height;
    var context  = canvas.getContext("2d");

    var imageData = context.createImageData(w, h);

    for (var i = 0, l = imageData.data.length; i < l; i += 4) {
        var x = (i  / 4) % w;
        var y = Math.floor(i / w / 4);

        var pixel = shader(x, y, w, h);

        imageData.data[i  ] = pixel.r;
        imageData.data[i + 1] = pixel.g;
        imageData.data[i + 2] = pixel.b;
        imageData.data[i + 3] = pixel.a;
    }

    context.putImageData(imageData, 0, 0);
};

manipulateImageData(canvas, shader);
