function noise_scale(n){
    return function (x, y){
        return PerlinNoise.noise(x/n, y/n);
    }
}

function mountains(){
    var one = noise_scale(1);
    var ten = noise_scale(10);
    return function (x, y){
        return (1-1/(ten(x, y)**2+1)) * (one(x, y)+.1)+ (1-1/(ten(x, y)**2+1));
    }
}

function local_variation(){
    return function (x, y){
        return (noise_scale(10)(x, y));
    }
}

function rain(){
    
}
function drainage(){

}
function temperature(){

}


function Terrain(){
    this.level = function(){
    }

    this.to_colour = function(x, y){
        r = local_variation()(x, y)*255;
        b=r;
        if (r> 200){
            b = 255;
        }
        return {r:r, g:r, b:b, a:255}
    }
}
