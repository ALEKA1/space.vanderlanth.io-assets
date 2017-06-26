//==============================================================================
//==============================================================================
//==============================================================================
//Textures ====================================================================
//==============================================================================
//==============================================================================
//==============================================================================

var Textures = (function(){

	var Textures = function(){

		this.totalmtr 			= 0;
		this.totalobj 			= 0;

		this.mtrready 			= false;
		this.objready 			= false;


		//sources images
		this.meteorsrc 			= ['images/meteor.jpg', 		'images/mars-dismap.jpg', 		'0xffccdd', 	0.75, 		0.0025];
		this.cometsrc 			= ['images/comet-map.jpg', 		'images/comet-dismap.jpg', 		'0xffccdd', 	0.75, 		0.0025];

		this.materialsrc 		= [
			this.meteorsrc,
			this.cometsrc
		];


		//sources obj
		this.meteorobjsrc		= ['others/home.obj']; 		//0
		this.c1					= ['others/1.obj'];			//1
		this.c2					= ['others/2.obj'];			//2
		this.c3					= ['others/3.obj'];			//3
		this.objsrc 			= [
			this.meteorobjsrc,
			this.c1, this.c2, this.c3
		];


		//materials that will be returned
		this.meteor;
		this.comet;
		this.materialreturned 	= [
			this.meteor,
			this.comet
		];


		//objects that will be returned
		this.meteorobj 			= [];
		this.c1obj 				= [];
		this.c2obj 				= [];
		this.c3obj 				= [];
		this.objreturned 		= [
			this.meteorobj,
			this.c1obj, this.c2obj, this.c3obj
		];


	}

	Textures.prototype = {

		init: function(){
			//console.log('Textures.js');
			this.images();
			this.objects();
		},


		//load images
		images: function(){
			var self = this;

			$.each(self.materialsrc, function(index){
				var smap 			= self.materialsrc[index][0];
				var sdismap 		= self.materialsrc[index][1];

				var bumpScale 		= self.materialsrc[index][3];
				var disScale 		= self.materialsrc[index][4];

				var fullyLoaded 	= 0;

				var map 			= textureloader.load(smap, function (t) {
					fullyLoaded++;
					if(fullyLoaded == 2){
						self.material(map, dismap, index, bumpScale, disScale);
					}
				});

				var dismap 			= textureloader.load(sdismap, function (t) {
					fullyLoaded++;
					if(fullyLoaded == 2){
						self.material(map, dismap, index, bumpScale, disScale);
					}
				});
			});
		},


		//simultaneously load .obj files
		objects: function(){
			var self = this;
			$.each(self.objsrc, function(index){

				objloader.load(self.objsrc[index][0], function(object) {
					self.objreturned[index].push(object);
					self.totalobj++;
					if(self.totalobj == self.objreturned.length){
						self.objready = true;
						self.loaded();
					}
				});
			});
		},


		//create textures once images are ready
		//notes: add args.
		material: function(map, dismap, index, b, d){
			var self = this;
			this.materialreturned[index] = new THREE.MeshPhongMaterial({
				'map': map,
				'bumpMap': dismap,
				'bumpScale' : b,
				'displacementMap': dismap,
				'displacementScale': d,
				'reflectivity': 0,
				'specular': 0x000000,
				'shininess': 0
			});
			this.totalmtr++;
			if(this.totalmtr == this.materialreturned.length){
				this.mtrready = true;
				this.loaded();
			}
		},


		//All the assets are loaded
		//trigger handler js for the first time
		loaded: function(){
			if(this.objready == true && this.mtrready == true){

				//console.info('Textures.js - assets loaded');
				setTimeout(function() {
					uiloader.stock(42);
				}, 1000);
				tuto = new Tuto();
				tuto.init();

				global();
				handler.init();
			}
			else {
				return false;
			}
		}
	}

	return Textures;
})();
