module.exports = function(minpos,maxpos,minresult,maxresult) {
    return {
        logslider: function(position) {
            var minp = minpos;
            var maxp = maxpos;

            //result min and max
            var minv = Math.log(minresult);
            var maxv = Math.log(maxresult);

            // calculate adjustment factor
            var scale = (maxv-minv) / (maxp-minp);
            // console.log("logslider scale: " + scale)

            return Math.exp(minv + scale*(position-minp));    
        }
    }
}

