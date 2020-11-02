var permutation = [];
for(var i=0;i<128;i++){
    permutation[i]= new Array();
    for(var j=0;j<128;j++){
        permutation[i][j]=Math.round(Math.random()*128);
  }
}

var vectors = []
for(var i=0;i<128;i++){
    var theta = i*Math.PI*2/128;
    vectors[i] = [Math.cos(theta), Math.sin(theta)];
}

PerlinNoise = new function() {
    this.noise = function(x, y) {
         const max= 127;
         if(x<0){
       x = max - (Math.abs(x)%max);
       }else{
         x = x % max;
       }
       if(y<0){
       y = max - (Math.abs(y)%max);
       }else{
       y = y%max;
       }
       var p = permutation;
          var X = Math.floor(x),                  // FIND UNIT CUBE THAT
              Y = Math.floor(y);                  // CONTAINS POINT.
          x -= Math.floor(x);                                // FIND RELATIVE X,Y,Z
          y -= Math.floor(y);                                // OF POINT IN CUBE.
          var    u = fade(x),                                // COMPUTE FADE CURVES
                 v = fade(y);                                // FOR EACH OF X,Y,Z.
    
    
          return scale(lerp(v, lerp(u, grad(p[X][Y], x  , y  ),  // AND ADD
                                         grad(p[(X+1)%max][Y], x-1, y   )), // BLENDED
                                 lerp(u, grad(p[X][(Y+1)%max], x  , y-1  ),  // RESULTS
                                         grad(p[(X+1)%max][(Y+1)%max], x-1, y-1  ))));
       }
       function fade(t) { return  -2*t*t*t+3*t*t; }
       function lerp( t, a, b) { return a + t * (b - a); }
       function dot(A,B){
        var acc=0;
        for(var i=0;i<A.length;i++){
            acc+=A[i]*B[i];
        }
        return acc;
       }
       function grad(hash, x, y) {
//                var vectors = [[1,0],[0,1],[-1,0],[0,-1]];
    
              return dot(vectors[hash%128],[x,y]);
       } 
       function scale(n) { return (1 + n)/2; }
}
