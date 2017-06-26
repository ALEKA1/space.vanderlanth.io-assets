//==============================================================================
//==============================================================================
//==============================================================================
//FULLSCREEN MODE ==============================================================
//==============================================================================
//==============================================================================
//==============================================================================

var PageTransition = (function(){

	var PageTransition = function(){

	}

	PageTransition.prototype = {

		init: function(){
			//console.log('PageTransition.js');
		},

		enter: function(){

		},

		leave: function(){

		},

		openModal: function(){
			$('.transition__item').addClass('open');
			dragdisable = true;
		},

		closeModal: function(){
			$('.transition__item').removeClass('open');
			dragdisable = false;
		},


		displayMenu: function(){
			dragdisable = true;

			$('.transition__item').addClass('open');

			setTimeout(function() {
				$('.js-about').css('display', 'block');
			}, 1000);

			setTimeout(function() {
				$('.js-about').removeClass('close');
			}, 1100);
		},

		hideMenu: function(){
			dragdisable = false;

			$('.js-about').addClass('close');

			setTimeout(function() {
				$('.js-about').css('display', 'none');
			}, 1000);

			setTimeout(function() {
				$('.transition__item').removeClass('open');
			}, 1100);
		},


		displayVr: function(){
			dragdisable = true;

			$('.transition__item--vr').addClass('open');

			setTimeout(function() {
				$('.vr--modal').css('display', 'flex');
			}, 1000);

			setTimeout(function() {
				$('.vrbutton').toggleClass('change');
				$('.vr--modal').removeClass('close');
			}, 1100);
		},

		hideVr: function(){
			dragdisable = false;

			$('.vrbutton').toggleClass('change');

			setTimeout(function() {
				$('.vr--modal').addClass('close');
			}, 300);

			setTimeout(function() {
				$('.vr--modal').css('display', 'none');
				$('.transition__item--vr').removeClass('open');
			}, 1200);
		},
	}

	return PageTransition;
})();
