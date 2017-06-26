//==============================================================================
//==============================================================================
//==============================================================================
//NORMAL DRAG ANIMATION HANDLER ================================================
//==============================================================================
//==============================================================================
//==============================================================================
var DragHandler = (function(){

	var elemAnime 		= [];
	var toAnime 		= [];
	var animeFrom 		= [];
	var animeTo 		= [];
	var animeStart 		= [];
	var animeEnd 		= [];

	var elemTrigger 	= [];
	var triggerStart 	= [];
	var triggerEnd 		= [];

	var DragHandler = function(){
		elemAnime 		= [];
		toAnime 		= [];
		animeFrom 		= [];
		animeTo 		= [];
		animeStart 		= [];
		animeEnd 		= [];

		elemTrigger 	= [];
		triggerStart 	= [];
		triggerEnd 		= [];
	}


	DragHandler.prototype = {

		init: function(){
			this.reset();
			this.setArrays();
		},

		setArrays: function(){
			$('.anime').each(function(){
				elemAnime.push($(this));
				toAnime.push($(this).attr('data-anime'));
				animeFrom.push($(this).attr('data-from'));
				animeTo.push($(this).attr('data-to'));
				animeStart.push($(this).attr('data-start'));
				animeEnd.push($(this).attr('data-end'));
			});

			$('.trigger').each(function(){
				elemTrigger.push($(this));
				triggerStart.push($(this).attr('data-trigger-start'));
				triggerEnd.push($(this).attr('data-trigger-end'));
			});
		},

		reset: function(){
			elemAnime 		= [];
			toAnime 		= [];
			animeFrom 		= [];
			animeTo 		= [];
			animeStart 		= [];
			animeEnd 		= [];

			elemTrigger 	= [];
			triggerStart 	= [];
			triggerEnd 		= [];
		},

		watch: function(percent){
			var ptrigger = percent;

			//controled transition on drag
			for(var i = 0; i < elemAnime.length; i++){
				if(parseInt(animeStart[i]) <= ptrigger && parseInt(animeEnd[i]) - ptrigger >= 0){

					//anime here...
					var distance = animeEnd[i] - animeStart[i];
					var current  = parseInt(animeEnd[i]) - ptrigger;
					var percent  = 100 - current/distance * 100;

					var range    = (animeFrom[i] - animeTo[i])/100 * percent;
					var step     = animeFrom[i] - range;

					//update CSS
					if(toAnime[i] == 'transform'){
						var attr = elemAnime[i].attr('data-transfrom');
						elemAnime[i].css(toAnime[i], attr + '('+ step + 'px)');
					}
					else{
						elemAnime[i].css(toAnime[i], step + '%');
					}
				}
				else if(parseInt(animeStart[i]) >= ptrigger){
					var val = elemAnime[i].attr('data-from');
					if(toAnime[i] == 'transform'){
						var attr = elemAnime[i].attr('data-transfrom');
						elemAnime[i].css(toAnime[i], attr + '('+ val + 'px)');
					}
					else{
						elemAnime[i].css(toAnime[i], val + '%');
					}
				}
			}

			//triggered transition on drag
			for(var i = 0; i < elemTrigger.length; i++){
				if(parseInt(triggerStart[i]) <= ptrigger){
					elemTrigger[i].addClass('drag-on');
				}
				else if(parseInt(triggerEnd[i]) - ptrigger <= parseInt(triggerEnd[i])){
					elemTrigger[i].removeClass('drag-on');
				}
			}
		}

	}

	return DragHandler;
})();
