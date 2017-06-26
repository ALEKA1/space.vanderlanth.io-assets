//==============================================================================
//==============================================================================
//==============================================================================
// Home ========================================================================
//==============================================================================
//==============================================================================
//==============================================================================

var Home = (function(){

	var Home = function(){
		this.camera 	= [];
		this.scene 		= [];
		this.renderer 	= [];
		this.x 			= 0;
		this.y 			= 0;
	}

	var x, y;
	var scene, camera, renderer;
	var homeparent;


	Home.prototype = {
		init: function(cont, obj, mat, wire){
			if ( ! Detector.webgl ) {
				var message = 'Oups, looks like your browser does not seem to support WebGL...'
				$('.too--small h4').text(message);
				$('.too--small').removeClass('hidden');
			}
			//console.log('Home.js');

			this.camera 	= [];
			this.scene 		= [];
			this.renderer 	= [];
			this.x 			= 0;
			this.y 			= 0;

			this.createMeteor(cont, obj, mat, wire);

			var self = this;
			window.addEventListener( 'mousemove', self.canvaOnDocumentMouseMove, false );
			window.addEventListener( 'resize', self.canvaOnWindowResize, false );
		},

		canvaOnDocumentMouseMove: function(event) {
			x = (( event.clientX - (window.innerWidth / 1.2)) / 100)*(-1);
			y = (( event.clientY - (window.innerHeight / 1.2)) / 100)*(-1);

			this.x = x;
			this.y = y;
		},

		canvaOnWindowResize: function() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		},

		createMeteor: function(scontainer, sobj, smat, swire){

			//base===============================================================================
			var wrap 			= new THREE.Object3D();

			//scene==============================================================================
			scene 				= new THREE.Scene();
			camera 				= new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );
			camera.position.z 	= 65;

			this.camera.push(camera);
			this.scene.push(scene);

			//renderer===========================================================================
			renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
			renderer.setSize( window.innerWidth, window.innerHeight );
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(window.innerWidth, window.innerHeight);
			scontainer[0].appendChild(renderer.domElement);

			//light==============================================================================
			var lights = new THREE.PointLight( 0xffffff, 2, 0 );
			lights.position.set( 0, 100, -100 );
			scene.add(lights);

			var lights2 = new THREE.PointLight( 0xbbbbbb, 1.25, 0 );
			lights2.position.set( 0, 100, 40 );
			scene.add(lights2);

			var clonemat = smat.clone();

			clonemat.bumpScale 			= 0.5;
			clonemat.displacementScale 	= 0.015;

			var clone = sobj[0].clone();

			clone.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.material = clonemat;
				}
			});


			homeparent 			= new THREE.Group();

			homeparent.add(clone);
			scene.add(homeparent);

			homeparent.position.x = 0;
			homeparent.position.y = 0;
			homeparent.position.z = 5;

			clone.rotation.x = -40;
			clone.rotation.y = 20;
			clone.rotation.z = 0;

			this.render();
		},

		render: function(){

			if(x != undefined){
				camera.position.x += ( x - camera.position.x ) * .05;
				camera.position.y += ( - y - camera.position.y ) * .05;
			}

			homeparent.rotation.x += 0.001;
			homeparent.rotation.y += 0.0005;
			homeparent.rotation.z += 0.0005;
			camera.lookAt(scene.position);
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.render(scene, camera);
		}
	}
	return Home;
})();


