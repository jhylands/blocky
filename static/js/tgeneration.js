function noise_scale(n){
    return function (x, y){
        return PerlinNoise.noise(x/n, y/n);
    }
}

function mountains(){
    var one = noise_scale(1);
    var ten = noise_scale(10);
    return function (x, y){
        return 1/(1+Math.exp(16-20*ten(x, y)))*one(x, y);
    }
}

function local_variation(){
    return function (x, y){
        return (noise_scale(10)(x, y) + noise_scale(1)(x, y))/2;
    }
}

function drainage(){
    return function (x, y){
        return noise_scale(10)(x+111, y+222);
    }
}
function temperature(){
    return function (x, y){
        var height_component = 0.9*(1- mountains()(x,y)) + 0.1 * ocean_land()(x,y)
        height_component = height_component**0.001;
        return (0.8 * noise_scale(1000)((x+22)/22, y*10+22)+ 0.15*noise_scale(100)(x+22, y-22) + 0.05* noise_scale(10)(x+22, y-22)) * height_component;
    }
}

function ocean_land(){
    return function (x, y){
        return 0.9 *noise_scale(300)(x, y) + 0.1*noise_scale(30)(x, y);
    }
}
function rain(){
    return function (x, y){
        return .3/(1+Math.exp(8-20*(1-ocean_land()(x, y)))) + 0.7 * Math.sqrt(noise_scale(100)(x+2,y+3));
    }
}



function Terrain(){
    this.to_colour = function(x, y){
        var ocean_land_ = ocean_land()(x,y);
        var rainfall_ = rain()(x,y);
        var drainage_ = drainage()(x, y);
        var temperature_ = temperature()(x, y);
        var mountains_ = mountains()(x, y);
        var local_variation_ = local_variation()(x, y);

        if(ocean_land_<0.5){
            if(temperature_>0.2){
                if(ocean_land_>0.499){
                    //beach
                    return {r:255, g:255, b:0, a:255}
                }
                var g = 0.5 + temperature_/2;
                return {r:0, g:g*255, b:255, a:255}
            }else{
                //frozen ocean
                var r = 51*temperature_/.2 + 204;
                return {r:r, g:255, b:255, a:255}
            }
        }
        if(temperature_<0.4){
        //frozen wasteland
        var r = 51*temperature_/.3 + 204;
        return {r:255, g:255, b:255, a:255}
        }
        if(mountains_+ local_variation_>0.6){
        //too tall for vegitation
        var range = (mountains_ + local_variation_ -0.6)/.4;
        var r = 107 + (140-107) * range; 
        var g = 58 + (58-83) * range;
        var b = 13 + (29-13) * range;
        return {r:140, g:83, b:29, a:255}
        }
        if(rainfall_>.7 && drainage_<.3 && temperature_>0.25){
        //swamp
        return {r:102, g:51, b:0, a:255}
        }else if(drainage_>0.3 && temperature_>0.5 && rainfall_>0.6){
            //jungle
            return {r:37, g:120, b:12, a:255}
        }    
        if(rainfall_<0.5){
        if(temperature_>0.5){
            // hot Desert
            var g = 0.75 + drainage_/4;
            var b = (1-temperature_)*255
            return {r:255, g:g*255, b:b, a:255}
        }else{
            // cold Desert
            var g = 0.75 + drainage_/4;
            g *= 255;
            return {r:g, g:g, b:g, a:255}

        }
        }
        
         
        var r = (0.1*local_variation_ + mountains_)*255/1.1;
        var g = 255/2 +r/2;
        return {r:r, g:g, b:r, a:255}
    }
}
