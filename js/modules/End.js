//==============================================================================
//==============================================================================
//==============================================================================
// End ========================================================================
//==============================================================================
//==============================================================================
//==============================================================================

var End = (function(){

	var End = function(){
		this.cam 		= [];
		this.scen 		= [];
		this.rendere 	= [];
		this.x 			= 0;
		this.y 			= 0;
	}

	var x, y;
	var scene, camera, renderer;
	var endparent;


	End.prototype = {
		init: function(cont, obj, mat, wire){
			if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
			//console.log('End.js');

			this.cam 		= [];
			this.scen 		= [];
			this.rendere 	= [];
			this.x 			= 0;
			this.y 			= 0;

			this.createMeteorEnd(cont, obj, mat, wire);

			var self = this;
			window.addEventListener( 'resize', self.canvaOnWindowResize, false );
			window.addEventListener( 'mousemove', self.canvaOnDocumentMouseMove, false );
		},

		canvaOnWindowResize: function() {
			camera.aspect = (window.innerWidth / 100 * 66) / (window.innerHeight / 100 *75);
			camera.updateProjectionMatrix();
			renderer.setSize((window.innerWidth / 100 * 66), (window.innerHeight / 100 *75));
		},

		canvaOnDocumentMouseMove: function(event) {
			x = (( event.clientX - (window.innerWidth / 1.2)) / 100)*(-1);
			y = (( event.clientY - (window.innerHeight / 1.2)) / 100)*(-1);

			this.x = x;
			this.y = y;
		},

		createMeteorEnd: function(scontainer, sobj, smat, swire){

			//base===============================================================================
			var wrap 			= new THREE.Object3D();

			//scene==============================================================================
			scene 				= new THREE.Scene();
			camera 				= new THREE.PerspectiveCamera( 75, (window.innerWidth / 100 * 66) / (window.innerHeight / 100 *75), 0.1, 100 );
			camera.position.z 	= 65;

			this.cam.push(camera);
			this.scen.push(scene);

			//renderer===========================================================================
			renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
			renderer.setSize((window.innerWidth / 100 * 66), (window.innerHeight / 100 *75) );
			renderer.setPixelRatio(window.devicePixelRatio);
			scontainer[0].appendChild(renderer.domElement);

			//light==============================================================================
			var lights = new THREE.PointLight( 0xffffff, 1, 0 );
			lights.position.set( 0, 100, -100 );
			scene.add(lights);

			var lights2 = new THREE.PointLight( 0xffffff, 1, 0 );
			lights2.position.set( 0, 100, 40 );
			scene.add(lights2);

			var lights3 = new THREE.PointLight( 0xffffff, 1, 0 );
			lights2.position.set( 0, -100, 40 );
			scene.add(lights3);



			var cloneend = sobj[0].clone();

			var clonemat = smat.clone();

			clonemat.bumpScale 			= 0.5;
			clonemat.displacementScale 	= 0.015;
			clonemat.wireframe 			= true;

			cloneend.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.material = clonemat;
				}
			});

			endparent 			= new THREE.Group();

			endparent.add(cloneend);
			scene.add(endparent);

			endparent.position.x = 0;
			endparent.position.y = 0;
			endparent.position.z = 0;

			cloneend.rotation.x = 30;
			cloneend.rotation.y = 80;
			cloneend.rotation.z = 10;


			this.render();
		},

		render: function(){

			if(x != undefined){
				camera.position.x += ( x - camera.position.x ) * .05;
				camera.position.y += ( - y - camera.position.y ) * .05;
			}

			endparent.rotation.x += 0.001;
			endparent.rotation.y += 0.0005;
			endparent.rotation.z += 0.0005;
			camera.lookAt(scene.position);
			camera.aspect = (window.innerWidth / 100 * 66) / (window.innerHeight / 100 *75);
			camera.updateProjectionMatrix();

			renderer.render(scene, camera);
		}
	}
	return End;
})();


