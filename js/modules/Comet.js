//==============================================================================
//==============================================================================
//==============================================================================
// Comet ========================================================================
//==============================================================================
//==============================================================================
//==============================================================================

var Comet = (function(){

	var Comet = function(i){
		this.ref 			= i;
		this.camera 		= [];
		this.scene 			= [];
		this.renderer 		= [];
		this.objects 		= [];
		this.raycaster 		= new THREE.Raycaster();
		this.mouse 			= new THREE.Vector2();
		this.intersects;
		this.currentPreview = null;
	}

	var x, y;
	var clientx, clienty;
	var scene, camera, renderer;

	Comet.prototype = {
		init: function(cont){
			if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
			//console.log('Comet.js')
			this.createAsteroid(cont);

			var self = this;

			document.querySelector('.js-comet').addEventListener( 'mousemove', function(event){
				self.onMouseMove(event);
			}, false );
			window.addEventListener( 'resize', self.canvaOnWindowResize, false );
		},

		canvaOnWindowResize: function() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		},

		createAsteroid: function(scontainer){

			//base===============================================================================
			var self = this;
			var wrap 			= new THREE.Object3D();

			//scene==============================================================================
			scene 				= new THREE.Scene();
			camera 				= new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
			camera.position.z 	= 230;


			//renderer===========================================================================
			renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
			renderer.setSize( window.innerWidth, window.innerHeight );
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize( window.innerWidth, window.innerHeight );
			scontainer[0].appendChild(renderer.domElement);


			this.camera.push(camera);
			this.scene.push(scene);
			this.renderer.push(renderer);


			//light==============================================================================
			var lights = new THREE.PointLight( 0xbbbbbb, 1, 0 );
			lights.position.set( 0, 100, 140 );
			scene.add(lights);

			var lights2 = new THREE.PointLight( 0xbbbbbb, 1, 0 );
			lights2.position.set( 0, 100, 0 );
			scene.add(lights2);


			for (var i = 0; i < 14; i++) {

				var indexobj 	= Math.round(Math.random()*2) + 1;
				var indexmat 	= Math.round(Math.random());

				var sobj 	= textures.objreturned[indexobj];
				var smat 	= textures.materialreturned[indexmat];

				var cometclone = sobj[0].clone();

				smat.bumpScale 			= 0.75;
				smat.displacementScale 	= 0.025;


				cometclone.traverse( function ( child ) {
					if ( child instanceof THREE.Mesh ) {
						child.material = smat;
					}
				});



				cometclone.children[0].userData 	= {index: 	i};
				cometclone.userData 				= {
					x: 		Math.random() * (0.002 - (-0.005)) + (-0.005),
					y: 		Math.random() * (0.002 - (-0.005)) + (-0.005),
					z: 		Math.random() * (0.002 - (-0.005)) + (-0.005)
				};


				scene.add(cometclone);

				this.objects.push(cometclone);


				var minx;
				if(i % 2 == 0){
					minx = 0 - Math.floor(Math.random() * 50);
				}
				else{
					minx = 0 + Math.floor(Math.random() * 50);
				}

				var miny = i * 18 - 120;

				cometclone.position.x 		= minx;//Math.floor(Math.random() * (80 - (-80))) + (-80);
				cometclone.position.y 		= miny;//Math.floor(Math.random() * (200 - (-200))) + (-200);
				cometclone.position.z 		= Math.floor(Math.random() * (75 - (-75))) + (-75);

				cometclone.rotation.x 	= Math.random() * (360 - 0) + 0;
				cometclone.rotation.y 	= Math.random() * (360 - 0) + 0;
				cometclone.rotation.z 	= Math.random() * (360 - 0) + 0;

				cometclone.scale.set(0.0265, 0.0265, 0.0265);
			}

			render();
			setTimeout(function() {
				watchcomet();
			}, 2000);

			//render fn==========================================================================
			function render(){

				//requestAnimationFrame(render);

				self.raycaster.setFromCamera(self.mouse, self.camera[0]);
				self.intersects = self.raycaster.intersectObjects(self.scene[0].children, true);

				if(self.intersects.length == 0){
					$('.js-comet').css('cursor', 'inherit');
					$('.comet-hotspot').removeClass('active');
					self.currentPreview = null;
				}else{
					$('.comet-hotspot').addClass('active');
				}

				for ( var i = 0; i < self.intersects.length; i++ ) {
					if(self.currentPreview == null || self.intersects[i].object.userData.index != self.currentPreview){
						var el = self.intersects[i].object.userData;
						feed.previewPodcast(el.index);
						self.currentPreview = el.index;
						$('.js-comet').css('cursor', 'pointer');
					}
				}

				self.hotspot();

				for(var i = 0; i < self.objects.length; i++){
					var obj 			= self.objects[i];
					var datas 			= obj.userData;

					obj.rotation.x 		+= datas.x;
					obj.rotation.y 		+= datas.y;
					obj.rotation.z 		+= datas.z;
				}

				scene.rotation.y 		+= 0.001;

				if(x != undefined){
					camera.position.x += ( x - camera.position.x ) * 0.05;
					camera.position.y += ( - y - camera.position.y ) * 0.05;
				}

				camera.lookAt(scene.position);
				camera.aspect  = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.render(scene, camera);

			}

		},

		render: function(){
			var self = this;
			self.raycaster.setFromCamera(self.mouse, self.camera[0]);
			self.intersects = self.raycaster.intersectObjects(self.scene[0].children, true);

			if(self.intersects.length == 0){
				$('.js-comet').css('cursor', 'inherit');
				$('.comet-hotspot').removeClass('active');
				self.currentPreview = null;
			}else{
				$('.comet-hotspot').addClass('active');
			}

			for ( var i = 0; i < self.intersects.length; i++ ) {
				if(self.currentPreview == null || self.intersects[i].object.userData.index != self.currentPreview){
					var el = self.intersects[i].object.userData;
					feed.previewComet(el.index);
					self.currentPreview = el.index;
					$('.js-comet').css('cursor', 'pointer');
				}
			}

			self.hotspot();

			for(var i = 0; i < self.objects.length; i++){
				var obj 			= self.objects[i];
				var datas 			= obj.userData;

				obj.rotation.x 		+= datas.x;
				obj.rotation.y 		+= datas.y;
				obj.rotation.z 		+= datas.z;
			}

			scene.rotation.y 		+= 0.001;

			if(x != undefined){
				camera.position.x += ( x - camera.position.x ) * 0.05;
				camera.position.y += ( - y - camera.position.y ) * 0.05;
			}

			camera.lookAt(scene.position);
			camera.aspect  = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.render(scene, camera);
		},


		hotspot: function(){
			$('.comet-hotspot').css({
				'left': clientx + 'px',
				'top':clienty + 'px'
			});
		},


		onMouseMove: function(event) {
			//get left bound of canvas to adjust raycast
			var left = document.querySelector('.js-comet').getBoundingClientRect().left;


			x = (( (event.clientX-left) - (window.innerWidth / 1.2)) / 10)*(-1);
			y = ((event.clientY - (window.innerHeight / 1.2)) / 10)*(-1);

			clientx = event.clientX-left;
			clienty = event.clientY;

			this.mouse.x = ( (event.clientX-left) / window.innerWidth ) * 2 - 1;
			this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		}
	}

	return Comet;
})();
