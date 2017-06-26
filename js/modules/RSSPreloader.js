//==============================================================================
//==============================================================================
//==============================================================================
//RSSPreloader ==========================================================================
//==============================================================================
//==============================================================================
//==============================================================================

var RSSPreloader = (function(){

	var RSSPreloader = function(){

		var chandra 		= ['chandra', 	20,		'https://www.nasa.gov/rss/dyn/lg_image_of_the_day.rss'];
		var comet 			= ['comet', 	10, 	'https://www.nasa.gov/rss/dyn/solar_system.rss'];

		this.urls = [
			chandra,
			comet,
		];

		this.chandra;
		this.comet;

		this.current 	= 0;
		this.total 		= 2;

		this.loaded 	= false;

		this.feeds 		= {};
	}

	RSSPreloader.prototype = {

		init: function(){
			//console.log('RSSPreloader.js');

			var self = this;
			for(var i = 0; i < self.urls.length; i++){
				self.loadContent(self.urls[i][0], self.urls[i][1], self.urls[i][2]);
			}
		},

		loadContent: function(name, quantity, link){
			var self = this;

			YUI().use('yql', function(Y){
				var query = 'select * from rss(0,' + quantity + ') where url = "' + link + '"';
				var q = Y.YQL(query, function(r){
					self.savedata(name, r);
				}, {
					format: 'xml'
				})
			})
		},

		savedata: function(name,src){
			switch(name) {
				case 'chandra':
					this.chandra = src;
					this.current++;
					break;
				case 'comet':
					this.comet = src;
					this.current++;
					break;
			}

			if(this.current == this.total){
				//console.info('RSSPreloader.js - assets loaded');
				this.loaded 	= true;
				feed 			= new RSS();
				feed.init();
				return this.loaded;
			}
		}
	}

	return RSSPreloader;
})();
