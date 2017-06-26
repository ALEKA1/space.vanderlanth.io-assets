//==============================================================================
//==============================================================================
//==============================================================================
//TUTO =========================================================================
//==============================================================================
//==============================================================================
//==============================================================================

//MAKE TRANSITION/ANIMATION IN PAGETRANSITION.JS

var Tuto = (function(){

	var Tuto = function(){
		this.entered 	= false;
		this.finished 	= false;
		this.dragging 	= false;
	}

	Tuto.prototype = {

		init: function(){

			//console.log('Tuto.js');

			setTimeout(function() {
				$('#demo').addClass('active');
			}, 3500);

			setTimeout(function() {
				$('.box').addClass('mouseover');
			}, 3700);

			var self 		= this;
			var draggable 	= Draggable.create(".box", {
				bounds:"#demo",
				type:"x",
				edgeResistance: 0.9,
				dragResistance: 0,
				throwProps: true,
				minDuration: .4,
				maxDuration: .4,
				autoScroll:true,
				onPress: addGrab,
				onDrag: updateMain,
				onRelease: removeGrab,
				snap: {
					x: function(endValue) {
						if (this.hitTest('.hit')) {
							enter();
							return -400;
						}
						else {
							$('.box').removeClass('active');

							$('.drag-line').css('transition', '.4s ease width');
							$('.drag-line').css('width', 90 + '%');

							$('.js-discover > div').css('transition', '.2s ease left, .2s ease opacity');
							$('.js-discover > div').css('opacity', 0);

							$('.drag-fade').css('transition', '.4s ease all');
							$('.drag-fade').css('opacity', 1);

							setTimeout(function() {
								$('.js-discover > div').css('left', 90 + '%');
							}, 200);

							self.dragging 	= false;
							canrender 		= false;

							return 0;
						}
					}
				}
			})[0];

			element = document.querySelector(".box");

			element.addEventListener("mouseenter", function(e) {
				e.preventDefault;
				element.classList.remove("mouseover");
				void element.offsetWidth;
				element.classList.add("mouseover");
			}, false);

			$('body').mousewheel(function(event, delta) {
				if(self.entered == false){
					$('.js-discover > div').css('transition', '0s ease left, 1s ease opacity');
					$('.js-discover > div').css('left', 50 + '%');
					self.entered = true;
					enter();
				}
				event.preventDefault();
				return false;
			});

			function updateMain(){
				var left 	= 90 - (90/draggable.minX*draggable.x);
				var decal 	= 100/draggable.minX*draggable.x;
				var main 	= (105 - ((100/draggable.minX*draggable.x))/2);

				var opacity = 1 - decal/100;

				if(opacity > 1){
					opacity = 1;
				}
				else if(opacity < 0){
					opacity = 0;
				}

				if(left > 90){
					left = 90;
				}
				else if(left < 0){
					left = 0;
				}

				$('.drag-fade').css('transition', '0s ease all');
				$('.drag-fade').css('opacity', opacity);

				$('.drag-line').css('transition', '.0s ease width');
				$('.drag-line').css('width', left + '%');

				$('.js-discover > div').css('transition', '0s ease left, 1s ease opacity');
				$('.js-discover > div').css('left', main + '%');
				$('.js-discover > div').css('opacity', 1);


				if (this.hitTest('.hit')) {
					$('.hit').addClass('active');
				}
				else{
					$('.hit').removeClass('active');
				}


				return false;
			}

			function addGrab(){
				$('.box, body').addClass('grabbing');
				self.dragging 	= true;
				canrender 		= true;

				$('.js-discover > div').css('left', 90 + '%');
				return false;
			}

			function removeGrab(){
				$('.box, body').removeClass('grabbing');
				self.dragging 	= false;
				canrender 		= false;
				return false;
			}

			function enter() {

				self.dragging 	= true;
				self.entered 	= true;
				canrender 		= true;

				$('.tuto-hidden').removeClass('tuto-hidden');

				$('.box').addClass('active');
				$('#demo').addClass('out');

				$('.drag-fade').css('transition', '.2s ease all');
				$('.drag-fade').css('opacity', 0);

				setTimeout(function() {
					$('.js-discover > div').css('transition', '1s ease left, 1s ease opacity');
					$('.js-discover > div').css('left', 0 + '%');
					$('.js-discover > div').css('opacity', 1);
				}, 50);

				setTimeout(function() {
					$('.tuto').css('display', 'none');
					$('.tuto').css('z-index', '-9999');
				}, 400);

				setTimeout(function() {
					self.finished = true;
					canscroll = true;
				}, 1000);
				return false;
			}

		}
	}

	return Tuto;
})();
