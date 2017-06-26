//==============================================================================
//==============================================================================
//==============================================================================
//Loader =======================================================================
//==============================================================================
//==============================================================================
//==============================================================================

var Loader = (function(){
	var int;
	var int2;
	var Loader = function(){
		this.min 			= 01;
		this.max 			= 100;
		this.current 		= 01;

		this.centi 			= 1;
		this.centiCurrent 	= 1;

		this.deci 			= 0;

		this.to 			= 01;
		this.delem 			= document.querySelector('.deci');
		this.celem 			= document.querySelector('.centi');
		this.display 		= document.querySelectorAll('.hidden-ui');
		this.toAdd 			= 0;
		this.hasStopped 	= false;
	}

	Loader.prototype = {
		init: function(){
			//console.log('Loader.js');
			this.delem 			= document.querySelector('.deci');
			this.celem 			= document.querySelector('.centi');
			this.display 		= document.querySelectorAll('.hidden-ui');

			//show loader
			$('.loader').css('opacity', 1);
			$('.loader-message').removeClass('fadeInReady');

			this.load(22);
		},

		toWatch: function(elem, percent){
			this.elems.push(elem);
			this.percents.push(percent);
		},

		stock: function(toAdd){
			this.toAdd = this.toAdd + toAdd;

			var self = this;

			//check if loader has stopped before trigger events
			int2 = setInterval(function(){
				if(self.hasStopped == true && self.toAdd != 0){
					self.hasStopped = false;
					self.load(self.toAdd);
					self.toAdd = 0;
					clearInterval(int2);
				}
			}, 50);
		},


		load: function(to){
			this.hasStopped = false;
			this.to 		= this.to + to;

			this.updateBar(this.to, to);

			if(this.to >= this.max){
				this.to = this.max;
			}

			var self 				= this;
			var decalc, decald;

			this.centiCurrent  		= Math.floor(this.current%10);

			this.current 			= this.to;

			this.deci 				= Math.floor(this.current/10);
			this.centi 				= Math.floor(this.current%10);

			var decald 				= 'decal-' + this.deci;
			self.delem.className 	= 'unit deci ' + decald;


			//centi part
			document.querySelector('.l-next').innerHTML 			= this.centi;
			self.celem.className 									= 'unit centi centi-started decal-1';

			//then update current/next
			setTimeout(function() {
				document.querySelector('.l-current').innerHTML = self.centi;
				document.querySelector('.unit.centi').style.transition = '0s ease all';
				self.celem.className = 'unit centi centi-started decal-0';
			}, 1000);

			setTimeout(function() {
				document.querySelector('.unit.centi').style.transition = '1s ease all';
			}, 1100);



			if(this.current == 100){

				setTimeout(function() {
					//loader hide animation part
					$('.js-about').css('display', 'none');
					$('.unit span').fadeOut();
					$('.loader-message').addClass('fadeOut');
					$('.loader-bar').addClass('loaded');
					$('.loader-bar').css('left', '100%');
				}, 1200);

				setTimeout(function() {
					document.querySelector('.loader-page').classList.add('loaded');
				}, 1200);


				setTimeout(function() {
					transition.closeModal();
					$('.loader-bar').css('opacity', 0);
				}, 2000);


				setTimeout(function() {
					document.querySelector('.loader-page').remove();
				}, 3000);

			}


			setTimeout(function() {
				self.hasStopped = true;
			}, 1200);

		},

		updateBar: function(update, delay){

			if(update > 100){
				update = 100;
			}

			//Create specific style for the avatar chat which is a :before
			if(document.head.querySelector('style.loadbar')){
				document.head.querySelector('style').remove();
			}

			var style = document.createElement("style");
			style.classList.add('loadbar');
			style.innerHTML = ".loader-page .loader-bar:before{width:" + update + "%; transition: 1s ease all;}";
			document.head.appendChild(style);
		}

	}

	return Loader;
})();
