//==============================================================================
//==============================================================================
//==============================================================================
//JS HANDLER =================================================================
//==============================================================================
//==============================================================================
//==============================================================================


var JsHandler = (function(){

	var JsHandler = function(){
		this.checkers = [
			'.js-home',
			'.js-vr-discover'
		];

		this.functions = [
			'home',
			'vr'
		];
	}

	JsHandler.prototype = {

		init: function(){
			//console.log('JsHandler.js');
			this.start();
		},

		//Watch active pages function, then run the right function.
		start: function(){
			//console.log('start handler');
			var self = this;
			for(var i = 0; i < this.checkers.length; i++){
				var that = this.checkers[i];
				if(document.querySelector(that)){
					for (var j = 0; j < this.functions.length; j++) {
						if(that.indexOf(this.functions[j]) !== -1){
							var fn = window[self.functions[j]];
							if(typeof fn === 'function'){
								fn.apply(null);
							}
						}
					}
				}
			}
			return false;
		}
	}

	return JsHandler;
})();
