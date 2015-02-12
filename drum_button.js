var onTimeHits = [];
var offTimeHits = [];
module.exports = {
	hit: function(tempoTime){
		if(tempoTime){
			onTimeHits.push(1);
		}
		else{
			offTimeHits.push(1);
		}
	},
	silence:function(tempoTime){
		if(tempoTime){
			onTimeHits.push(0);
		}
		else{
			offTimeHits.push(0);
		}
	},
	onTimeHits: onTimeHits,
	offTimeHits: offTimeHits
};