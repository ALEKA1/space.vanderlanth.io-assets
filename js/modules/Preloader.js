//==============================================================================
//==============================================================================
//==============================================================================
//Preloader ====================================================================
//==============================================================================
//==============================================================================
//==============================================================================

var Preloader = (function(){

	var Preloader = function(){
		this.threeBase 	= 'js/three.js';
		this.add 		= [
			'js/assets.js',
		];
	}

	Preloader.prototype = {
		init: function(){
			//console.log('Preloader.js');

			var self = this;

			setTimeout(function(){
				var head 		= document.getElementsByTagName('head')[0];
				var script 		= document.createElement('script');
				script.type 	= 'text/javascript';
				script.src 		= self.threeBase;


				$.getScript(self.threeBase, function(){
					setTimeout(function() {
						script.onload = self.next();
					}, 100);
				});

				head.appendChild(script);
			}, 100);
		},

		mobile: function(){
			var self = this;

			setTimeout(function(){
				var head 		= document.getElementsByTagName('head')[0];
				var script 		= document.createElement('script');
				script.type 	= 'text/javascript';
				script.src 		= self.threeBase;


				$.getScript(self.threeBase, function(){
					setTimeout(function() {
						script.onload = self.nextmobile();
					}, 100);
				});

				head.appendChild(script);
			}, 100);
		},

		next: function(){
			setTimeout(function() {
				uiloader.stock(21);
			}, 1000);

			var self = this;

			$.each(self.add, function(index){
				// Adding the script tag to the head as suggested before
				var head 		= document.getElementsByTagName('head')[0];
				var script 		= document.createElement('script');
				script.type 	= 'text/javascript';
				script.src 		= self.add[index];

				if(index == self.add.length - 1){
					setTimeout(function() {
						uiloader.stock(15);
					}, 1000);
					$.getScript('js/assets.js', function(data, textStatus, jqxhr){
						//console.info('Preloader.js - assets loaded');
						manager 		= new THREE.LoadingManager();
						setTimeout(function() {
							textureloader	= new THREE.TextureLoader(manager);
							objloader 		= new THREE.OBJLoader(manager);
							textures.init();

							//bodymovin=========================================
							var animationData = {"v":"4.6.8","fr":25,"ip":0,"op":38,"w":4140,"h":1080,"nm":"drag alt","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Calque de forme 1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"n":"0p667_1_0p333_0","t":0,"s":[2270,540,0],"e":[1710,540,0],"to":[0,0,0],"ti":[0,0,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"n":"0p667_1_0p333_0","t":13,"s":[1710,540,0],"e":[2270,540,0],"to":[0,0,0],"ti":[0,0,0]},{"i":{"x":0.667,"y":0.667},"o":{"x":0.333,"y":0.333},"n":"0p667_0p667_0p333_0p333","t":32,"s":[2270,540,0],"e":[2270,540,0],"to":[0,0,0],"ti":[0,0,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0.261},"n":"0p667_1_0p333_0p261","t":43,"s":[2270,540,0],"e":[1710,540,0],"to":[0,0,0],"ti":[0,0,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"n":"0p667_1_0p333_0","t":58,"s":[1710,540,0],"e":[2270,540,0],"to":[0,0,0],"ti":[0,0,0]},{"t":74}]},"a":{"a":0,"k":[-86,-90,0]},"s":{"a":0,"k":[180,180,100]}},"ao":0,"hasMask":true,"masksProperties":[{"inv":false,"mode":"a","pt":{"a":0,"k":{"i":[[58.471,0],[0,-58.471],[-58.471,0],[0,58.471]],"o":[[-58.471,0],[0,58.471],[58.471,0],[0,-58.471]],"v":[[-88.227,-198.098],[-194.098,-92.227],[-88.227,13.645],[17.645,-92.227]],"c":true}},"o":{"a":0,"k":100},"x":{"a":0,"k":0},"nm":"Masque 1"}],"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[48.726,0],[0,-48.726],[-48.726,0],[0,48.726]],"o":[[-48.726,0],[0,48.726],[48.726,0],[0,-48.726]],"v":[[0,-88.227],[-88.227,0],[0,88.227],[88.227,0]],"c":true}},"nm":"Tracé 1","mn":"ADBE Vector Shape - Group"},{"ty":"st","c":{"a":0,"k":[1,1,1,1]},"o":{"a":0,"k":100},"w":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p167"],"t":0,"s":[25],"e":[177]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p167"],"t":5,"s":[177],"e":[25]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p167"],"t":21,"s":[25],"e":[25]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p167"],"t":43,"s":[25],"e":[177]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p167"],"t":48,"s":[177],"e":[25]},{"t":65}]},"lc":1,"lj":2,"nm":"Contour 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[-88.227,-92.227],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[120,120],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transformer "}],"nm":"Ellipse 1","np":3,"cix":2,"ix":1,"mn":"ADBE Vector Group"}],"ip":0,"op":93,"st":0,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":"Calque de forme 2","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"n":"0p667_1_0p333_0","t":0,"s":[2102,540,0],"e":[734,540,0],"to":[-228,0,0],"ti":[228,0,0]},{"t":32}]},"a":{"a":0,"k":[0,0,0]},"s":{"a":0,"k":[64.912,85.965,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[1712.984,910.156]},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"nm":"Tracé rectangulaire 1","mn":"ADBE Vector Shape - Rect"},{"ty":"st","c":{"a":0,"k":[0.1675705,0.1675705,0.1675705,1]},"o":{"a":0,"k":100},"w":{"a":0,"k":30},"lc":1,"lj":2,"nm":"Contour 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[4186.654,-0.922],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[114,95.798],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transformer "}],"nm":"Rectangle 4","np":3,"cix":2,"ix":1,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[1712.984,910.156]},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"nm":"Tracé rectangulaire 1","mn":"ADBE Vector Shape - Rect"},{"ty":"st","c":{"a":0,"k":[0.1675705,0.1675705,0.1675705,1]},"o":{"a":0,"k":100},"w":{"a":0,"k":30},"lc":1,"lj":2,"nm":"Contour 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[2066.654,-0.922],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[114,95.798],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transformer "}],"nm":"Rectangle 3","np":3,"cix":2,"ix":2,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[1712.984,910.156]},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"nm":"Tracé rectangulaire 1","mn":"ADBE Vector Shape - Rect"},{"ty":"st","c":{"a":0,"k":[0.1675705,0.1675705,0.1675705,1]},"o":{"a":0,"k":100},"w":{"a":0,"k":30},"lc":1,"lj":2,"nm":"Contour 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[-2172.913,-0.922],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[114,95.798],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transformer "}],"nm":"Rectangle 2","np":3,"cix":2,"ix":3,"mn":"ADBE Vector Group"},{"ty":"gr","it":[{"ty":"rc","d":1,"s":{"a":0,"k":[1712.984,910.156]},"p":{"a":0,"k":[0,0]},"r":{"a":0,"k":0},"nm":"Tracé rectangulaire 1","mn":"ADBE Vector Shape - Rect"},{"ty":"st","c":{"a":0,"k":[0.1675705,0.1675705,0.1675705,1]},"o":{"a":0,"k":100},"w":{"a":0,"k":30},"lc":1,"lj":2,"nm":"Contour 1","mn":"ADBE Vector Graphic - Stroke"},{"ty":"tr","p":{"a":0,"k":[-55.508,-0.922],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[114,95.798],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transformer "}],"nm":"Rectangle 1","np":3,"cix":2,"ix":4,"mn":"ADBE Vector Group"}],"ip":0,"op":93,"st":0,"bm":0,"sr":1}]};
							var params = {
								container: document.getElementById('bodymovin'),
								renderer: 'svg',
								loop: true,
								autoplay: true,
								animationData: animationData
							};

							// var anim;
							// anim = bodymovin.loadAnimation(params);
							// $('#bodymovin').css('opacity', 1);
						}, 500);
					});
				}

				// Fire the loading
				head.appendChild(script);
			});
		},

		nextmobile: function(){
			setTimeout(function() {
				uiloader.stock(21);
			}, 1000);

			var self = this;

			$.each(self.add, function(index){
				// Adding the script tag to the head as suggested before
				var head 		= document.getElementsByTagName('head')[0];
				var script 		= document.createElement('script');
				script.type 	= 'text/javascript';
				script.src 		= self.add[index];

				if(index == self.add.length - 1){
					setTimeout(function() {
						uiloader.stock(15);
					}, 1000);
					$.getScript('js/assets.js', function(data, textStatus, jqxhr){
						//console.info('Preloader.js - assets loaded');
						setTimeout(function() {
							uiloader.stock(42);
						}, 1000);
						global();
						handler.init();
					});
				}

				// Fire the loading
				head.appendChild(script);
			});
		}
	}

	return Preloader;
})();
