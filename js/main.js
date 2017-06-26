//console.log('Welcome on Minima 🛠');
// Check if a new cache is available on page load.

//Detect Device
var isMobile;
var isVR = false;
(function(a){
	isMobile = (jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4));
	return isMobile;
})(navigator.userAgent||navigator.vendor||window.opera);

//==============================================================================
//==============================================================================
//INITIATING MODULES ===========================================================
//==============================================================================
//==============================================================================
var textureloader;
var manager;
var objloader;
var selection;
var uiloader;
var fullscreen;
var transition;
var homeCanva, endCanva;
var drag;
var dragAnim;
var feed, podcasts;
var audio;
var podcast_player;
var preloaderjs;
var textures;
var tuto;
var canscroll 		= false;
var canrender 		= false;
var dragdisable 	= false;



//USED ON BOTH CASE
var handler 		= new JsHandler();
var rssloader 		= new RSSPreloader();



//Three JS related variables (discover page)
var activated 		= [];
var previews 		= [];
var asteroids 		= [];
var meteors 		= [];
var comets 			= [];
var int 			= 0;
var comet;
var endCanva;

var homeRunning 	= true;
var endRunning 		= false;
var playerRunning 	= false;

var vractive 		= false;


textures 			= new Textures();
preloaderjs 		= new Preloader();
uiloader 			= new Loader();
fullscreen 			= new Fullscreen();
transition 			= new PageTransition();

if(isMobile == false){
	//NORMAL MODE
	if(window.location.href == "http://space.vanderlanth.io/" || window.location.href == "http://localhost:3000/" || window.location.href == "http://www.space.vanderlanth.io/"){
		//console.log('Normal Mode');
		uiloader.init();
		preloaderjs.init();

		//if screen is too small
		if(isMobile == false && $(this).width() <= 768){
			$('.too--small').removeClass('hidden');
		}
	}
	//NORMAL MODE BUT WRONG PAGE
	else{
		window.location = "http://space.vanderlanth.io";
	}
}

//MOBILE -> 360°/VR
else{
	if(window.location != "http://space.vanderlanth.io/discover-vr.html"){
		window.location = "http://space.vanderlanth.io/discover-vr.html";
	}
	isVR = true;

	var int = setInterval(function(){
		if(document.querySelector('a-scene') != null){
			var scene = document.querySelector('a-scene');
			if (scene.hasLoaded) {
				run();
				clearInterval(int);
			} else {
				scene.addEventListener('loaded', run);
				clearInterval(int);
			}
		}
	}, 500);

}

function run () {
	console.log('run');
	uiloader.init();
	preloaderjs.mobile();
}




function global(){
	fullscreen.init();
}

//==============================================================================
//==============================================================================
//PAGE RELATED FUNCTIONS =======================================================
//==============================================================================
//==============================================================================
function watchRSS(){
	$('.rss--article').on('click', function(e){
		e.preventDefault();
		if(drag.moving == false){
			var indexmodal = $(this).attr('data-modal');
			transition.openModal();
			setTimeout(function() {
				feed.openModal(indexmodal);
			}, 800);
		}
	});

	$('.modal--close').on('click', function(e){
		e.preventDefault();
		e.stopImmediatePropagation();
		feed.closeModal();
		setTimeout(function() {
			transition.closeModal();
		}, 800);
	});
}

function watchcomet(){
	$('.js-comet canvas').on('click',function(e){
		e.preventDefault();
		if(drag.moving == false){
			$('.comet-hotspot').addClass('click');
			if(comet.intersects.length > 0){
				var index = comet.intersects[0].object.userData.index;
				transition.openModal();
				setTimeout(function() {
					feed.openComet(index);
				}, 800);
				$('.podcast-player').addClass('active');
			}
			setTimeout(function() {
				$('.comet-hotspot').removeClass('click');
			}, 140);
		}
	});

	//same for player
	$('#pButton').on('mousedown',function(e){
		e.preventDefault();
		$(this).addClass('click');
	});
	$('#pButton').on('mouseup',function(e){
		e.preventDefault();
		$(this).removeClass('click');
	});
}


function home(){

	comet = new Comet(0);
	comet.init($('.js-comet'));
	comets.push(comet);

	dragAnim = new DragHandler();
	dragAnim.init();

	drag = new Drag();
	drag.init();

	var obj 		= textures.objreturned[0];
	var mat 		= textures.materialreturned[0];

	//set home
	homeCanva 		= new Home();
	var ch 			= $('.canvas-home');
	homeCanva.init(ch, obj, mat, false);
	meteors.push(homeCanva);


	//set end
	endCanva 	= new End();
	var container 	= $('.end--canvas');
	endCanva.init(container, obj, mat);


	r();

	rssloader.init();
	selection();

	//FULLSCREEN====================================================================
	document.querySelector('.fs').addEventListener('click', function(e){
		fullscreen.toggleScreen();
	}, false);


	//VR============================================================================
	document.querySelector('.vr').addEventListener('click',function(e){
		vroverlay();
	}, false);

	document.querySelector('.vrbutton').addEventListener('click',function(e){
		vroverlay();
	}, false);


	//MENU
	$('.menu').on('click', function(e){
		e.preventDefault();
		var txt = $('.menu--label').text();
		if(txt == 'about.'){
			change('close');
			transition.displayMenu();
		}
		else{
			change('about.');
			transition.hideMenu();
		}
	});


	//RESIZE
	$(window).on('resize', function(e){
		if(isMobile == false && $(this).width() <= 768){
			$('.too--small').removeClass('hidden');
		}
		else{
			$('.too--small').addClass('hidden');
		}
	});


	//watch prev/next
	$('.prev').on('click', function(e){
		e.preventDefault();
		if(feed.cometopen == true){
			var i = feed.cometprev;
			feed.transitioncomet(i);
		}
		else if(feed.imageopen == true){
			var i = feed.imageprev;
			feed.transitionmodal(i);
		}
	});

	$('.next').on('click', function(e){
		e.preventDefault();
		if(feed.cometopen == true){
			var i = feed.cometnext;
			feed.transitioncomet(i);
		}
		else if(feed.imageopen == true){
			var i = feed.imagenext;
			feed.transitionmodal(i);
		}
	});

	$(document).keydown(function(e) {
		e.preventDefault();
		//prev
		if(e.which == 37){
			if(feed.cometopen == true){
				var i = feed.cometnext;
				feed.transitioncomet(i);
			}
			else if(feed.imageopen == true){
				var i = feed.imageprev;
				feed.transitionmodal(i);
			}
		}
		//next
		else if(e.which == 39){
			if(feed.cometopen == true){
				var i = feed.cometnext;
				feed.transitioncomet(i);
			}
			else if(feed.imageopen == true){
				var i = feed.imagenext;
				feed.transitionmodal(i);
			}
		}
	});

}


function selection(){
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




//==============================================================================
//==============================================================================
//RENDER THREE JS related fns ==================================================
//==============================================================================
//==============================================================================

var itemSelection = 0;
function countSelection(){
	itemSelection++;
	if(itemSelection == 4){
		renderAsteroids();
	}
}




var h_raf;
function r(){
	var px = 100 / $(window).width() * $('.js-discover > div').offset().left;

	if(homeRunning == true && px < 89){
		homeCanva.render();
	}
	else if(endRunning == true){
		endCanva.render();
	}
	else if(playerRunning == true){
		comet.render();
	}
	requestAnimationFrame(r);
}


function renderAsteroids(){
	requestAnimationFrame(renderAsteroids);
	$.each($('.extension--canvas'), function(i){
		var left 	= $(this).offset().left;
		var right 	= $(this).offset().left + 200;
		var w 		= $(window).width();
		if(left < w && left > -200 && right < w + 200 && right > 0){
			var elem 		= asteroids[i].scene[0].children[3];
			var rend 		= asteroids[i].renderer[0];
			var sc 			= asteroids[i].scene[0];
			var cam 		= asteroids[i].camera[0];

			elem.children[0].children[0].material.wireframe = false;
			elem.rotation.x += 0.005;
			elem.rotation.y += 0.0005;
			elem.rotation.z += 0.0005;
			cam.lookAt(sc.position);
			cam.aspect  = 200 / 200;
			cam.updateProjectionMatrix();

			rend.render(sc, cam);
		}
	});
}



function change(text){
	$('.menu').addClass('change');
	setTimeout(function(){
		$('.menu').toggleClass('closed');
		$('.menu').toggleClass('opened');
		$('.menu--label').text(text);
		$('.menu').removeClass('change');
	}, 500);
}


function vroverlay(){
	$('.menu').toggleClass('change');
	setTimeout(function() {
		$('.menu').toggleClass('closed');
		$('.menu').toggleClass('opened');
	}, 500);
	var statement = $('.vr--modal').hasClass('close');
	if (statement == true) {
		transition.displayVr();
	}
	else {
		transition.hideVr();
	}
}




function readDeviceOrientation() {
	// Landscape
	if(window.innerWidth > window.innerHeight) {
		$('.vr-rotate-overlay').addClass('hidden');
		if(vractive == true){
			//document.querySelector('a-scene').enterVR();
		}
	}
	// Portrait
	else if(window.innerHeight > window.innerWidth){
		if(vractive == true){
			$('.vr-rotate-overlay').removeClass('hidden');
		}
	}
}


function vr(){
	if ( ! Detector.webgl ) {
		var message = 'Oups, looks like your browser does not seem to support WebGL...'
		$('.too--small h4').text(message);
		$('.too--small').removeClass('hidden');
	}

	console.clear();

	rssloader.init();

	$(window).on("orientationchange", function(e){
		readDeviceOrientation();
	});
	readDeviceOrientation();


	//remove ready overlay on start vr button click
	$('.start-vr').on('click', function(e){
		e.preventDefault();

		vractive = true;

		$('.vr-ready-overlay').addClass('start');

		setTimeout(function() {
			$('.vr-ready-overlay').addClass('hidden');
		}, 500);

		// Landscape
		if (window.innerWidth > window.innerHeight) {
			$('.vr-rotate-overlay').addClass('hidden');
			document.querySelector('a-scene').enterVR();
		}
		// Portrait
		else if(window.innerHeight > window.innerWidth){
			$('.vr-rotate-overlay').removeClass('hidden');
		}
	});

	//vractive
	$('.vr-switch').on('click', function(e){
		e.preventDefault();
		if (vractive == true){
			vractive = false;
			$('.vr-switch').text('Switch to VR Mode');
			document.querySelector('a-scene').exitVR();
		}
		else{
			vractive = true;
			$('.vr-switch').text('Switch to 360° Mode');
			document.querySelector('a-scene').enterVR();
			if(window.innerHeight > window.innerWidth){
				$('.vr-rotate-overlay').removeClass('hidden');
			}
		}
	});

	$('.vr-to360').on('click', function(e){
		e.preventDefault();
		vractive = false;
		document.querySelector('a-scene').exitVR();
		$('.vr-rotate-overlay').addClass('hidden');
		$('.vr-switch').text('Switch to VR Mode');
	});
}
