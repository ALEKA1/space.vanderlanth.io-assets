//==============================================================================
//==============================================================================
//==============================================================================
//HORIZONTAL SCROLL ============================================================
//==============================================================================
//==============================================================================
//==============================================================================
var Selection = (function(){

	var Selection = function(){
		var length 		= 3;
		this.instance 	= [];
	}


	Selection.prototype = {

		init: function(){
			//console.log('Selection.js');
			var self = this;

			//Asteroids
			$.each($('.extension--canvas'), function(i){
				var asteroid 	= new Asteroid(i);
				var container 	= $(this);
				var obj 		= textures.objreturned[0];
				var mat 		= textures.materialreturned[0];
				asteroid.init(container, obj, mat);
				asteroids.push(asteroid);
				countSelection();
			});

		}
	}

	return Selection;
})();
