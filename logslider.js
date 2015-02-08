module.exports = function(minpos,maxpos,minresult,maxresult) {
    return {
        logslider: function(position) {
            // position will be between 0 and 100
            var minp = minpos;
            var maxp = maxpos;

            //result min and max
            var minv = Math.log(minresult);
            var maxv = Math.log(maxresult);

            // calculate adjustment factor
            var scale = (maxv-minv) / (maxp-minp);
            console.log("scale: " + scale)

            return Math.exp(minv + scale*(position-minp));    
        }
    }
}

