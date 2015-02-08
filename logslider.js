module.exports = function(min,max) {
    console.log("loaded logslider: ("+min+","+max+")")
    return {
        logslider: function(position) {
            // position will be between 0 and 100
            var minp = 0;
            var maxp = 100;

            var minv = Math.log(min);
            var maxv = Math.log(max);

            // calculate adjustment factor
            var scale = (maxv-minv) / (maxp-minp);

            return Math.exp(minv + scale*(position-minp));    
        }
    }
}

