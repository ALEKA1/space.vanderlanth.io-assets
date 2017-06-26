//==============================================================================
//==============================================================================
//==============================================================================
// Asteroid ========================================================================
//==============================================================================
//==============================================================================
//==============================================================================

var Asteroid = (function(){

	var Asteroid = function(i){
		this.ref 		= i;
		this.camera 	= [];
		this.scene 		= [];
		this.renderer 	= [];
	}

	Asteroid.prototype = {
		init: function(cont, obj, mat){
			if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
			//console.log('Asteroid.js');

			this.createAteroid(cont, obj, mat);

			var self = this;
		},

		createAteroid: function(scontainer, sobj, smat){

			//base===============================================================================
			var self = this;
			var wrap 			= new THREE.Object3D();
			var parent;

			//scene==============================================================================
			var scene 			= new THREE.Scene();
			var camera 			= new THREE.PerspectiveCamera( 275, window.innerWidth / window.innerHeight, 0.1, 100 );
			camera.position.z 	= 65;


			//renderer===========================================================================
			var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
			renderer.setSize( 300, 300 );
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize( 300, 300 );
			scontainer[0].appendChild(renderer.domElement);


			this.camera.push(camera);
			this.scene.push(scene);
			this.renderer.push(renderer);


			//light==============================================================================
			var lights = new THREE.PointLight( 0xffffff, 1, 0 );
			lights.position.set( 0, 100, 100 );
			scene.add(lights);

			var lights2 = new THREE.PointLight( 0xbbbbbb, 1, 0 );
			lights2.position.set( 0, 100, 40 );
			scene.add(lights2);

			var lights3 = new THREE.PointLight( 0xffffff, 1, 0 );
			lights2.position.set( -40, 20, -40 );
			scene.add(lights3);

			var astclone = sobj[0].clone();

			smat.bumpScale 			= 0.75;
			smat.displacementScale 	= 0.025;



			astclone.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.material = smat;
				}
			});

			parent 			= new THREE.Group();

			parent.add(astclone);
			scene.add(parent);

			parent.position.x = 0;
			parent.position.y = 0;
			parent.position.z = 5;

			astclone.rotation.x = Math.random() * (360 - 0) + 0;
			astclone.rotation.y = Math.random() * (360 - 0) + 0;
			astclone.rotation.z = Math.random() * (360 - 0) + 0;

			render();


			//render fn==========================================================================
			function render(){

				camera.lookAt(scene.position);
				camera.aspect  = 300 / 300;
				camera.updateProjectionMatrix();

				renderer.render(scene, camera);

			}
		}
	}

	return Asteroid;
})();
