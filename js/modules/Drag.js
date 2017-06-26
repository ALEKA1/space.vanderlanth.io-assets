//==============================================================================
//==============================================================================
//==============================================================================
//HORIZONTAL SCROLL ============================================================
//==============================================================================
//==============================================================================
//==============================================================================

var Drag = (function(){

	var Drag = function(){
		this.moving = false;
	}

	var main;
	var old;

	Drag.prototype = {

		init: function(){
			//console.log('Drag.js');
			this.slider();
		},

		disable: function(){
			main.disable();
			$('.timeline').addClass('hidden');
		},

		enable: function(){
			main.enable();
			$('.timeline').removeClass('hidden');
		},

		slider: function(){
			var w 	= $('.s-1').width();

			var self = this;

			window.addEventListener('resize', function(){
				if(document.querySelector('.s-1') != null){
					w = document.querySelector('.s-1').offsetWidth;
					updateMain();
					return w;
				}
			});

			var current 	= 1;
			var active 		= 1;

			var select;


			var s, c;


			main = Draggable.create(".js-discover", {
				type:"scrollLeft",
				lockAxis: true,
				edgeResistance: 0.5,
				dragResistance: 0,
				throwProps: true,
				minDuration: .4,
				maxDuration: .8,
				onPress: addGrab,
				onDrag: updateMain,
				onThrowUpdate: updateMain,
				onDragEnd: check,
				onRelease: removeGrab,
				snap: {
					x: function(endValue) {
						if(endValue < main.minX + w){
							return (main.minX+(w)) * (-1);
						}
						if(endValue > 0){
							return 0;
						}
					}
				}
			})[0];

			s = main.minX;
			c = s + (w*0.9);

			function updateMain(){

				if(old != null && main.x == old){
					self.moving = false;
				}
				else{
					self.moving = true;
				}

				w 		= $('.s-1').width();
				current = Math.round((main.x*(-1)) / w) + 1;

				var difference;

				//get direction
				if(old != null && main.x < old){
					difference = old - main.x;
				}
				else if(old != null && main.x > old){
					difference = old - main.x + 1;
				}

				if(difference == 0) {
					self.moving = false;
				}


				$.each($('.extension--canvas'), function(i){
					var left 	= $(this).offset().left;
					var right 	= $(this).offset().left + 200;
					var w 		= $(window).width();
					if(left < w && left > -200 && right < w + 200 && right > 0 && difference != NaN && difference != undefined){
						var sc 			= asteroids[i].scene[0];
						sc.rotation.y += difference/500;
					}
				});

				$.each($('.js-comet'), function(i){
					var w 		= $(window).width();
					var left 	= $(this).offset().left;
					var right 	= $(this).offset().left + w;
					if(left < w && left > -(w/2) && right < w + (w/2) && right > 0){
						playerRunning = true;
					}
					else{
						playerRunning = false;
					}
				});


				//MANAGE DRAGANIMHANDLER
				var trigger 		= main.x * (-1);
				var ptrigger 		= trigger / ((main.minX + (w)) * (-1)) * 100;

				dragAnim.watch(ptrigger);


				//Home==========================================================
				if(current == 1 && homeRunning == false){
					homeRunning = true;
					endRunning 	= false;
				}

				//link case=====================================================
				else if(main.x < main.minX + (2*w) && endRunning == false){
					homeRunning = false;
					endRunning 	= true;
				}

				else if(current != 1 && main.x > main.minX + (2*w)){
					homeRunning = false;
					endRunning 	= false;
					cancelAnimationFrame(h_raf);
				}

				//rotate on drag
				if(homeRunning == true && difference != NaN && difference != undefined){
					var sc 			= homeCanva.scene[0];
					sc.rotation.y 	-= difference/1000;
				}

				if(playerRunning == true && difference != NaN && difference != undefined){
					var sc 			= comet.scene[0];
					sc.rotation.y 	-= difference/2000;
				}


				old = main.x;

				main.update();

				//update timeline
				$('.timeline').css('width', 100 / (main.minX +(w)) * main.x + 'vw');
			}


			$('body').mousewheel(function(event, delta) {

				if(dragdisable == false){
					//update
					if(s != c){
						main.minX = c;
						s = c;
						main.update();
					}

					if(main.enabled() == true && canscroll == true){
						tuto = null;
						var u = main.scrollProxy.scrollLeft() - (delta * 30);

						if(u < 0){
							u = 0;
						}
						if(u*(-1) < main.minX){
							u = main.minX;
						}
						if(u > 0 && u*(-1) > main.minX + (w)){
							main.scrollProxy.scrollLeft(u);
						}

						updateMain();

						self.moving = false;

						event.preventDefault();
						return false;
					}
				}
				event.preventDefault();
				return false;
			});


			function check(){
				main.update();
			}

			function addGrab(){
				$('.js-discover').addClass('grabbing');
			}

			function removeGrab(){
				$('.js-discover').removeClass('grabbing');
			}

		}
	}

	return Drag;
})();
