module.exports = function(min,max) {
    console.log("loaded logslider: ("+min+","+max+")")

    var logslider = function() {
    // position will be between 0 and 100
    var minp = 0;
    var maxp = 100;

    // The result should be between 100 an 10000000
    var minv = Math.log(min);
    var maxv = Math.log(max);

    // calculate adjustment factor
    var scale = (maxv-minv) / (maxp-minp);

    return Math.exp(minv + scale*(position-minp));    
  }
}

