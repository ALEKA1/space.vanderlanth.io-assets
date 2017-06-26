//==============================================================================
//==============================================================================
//==============================================================================
//RSS ==========================================================================
//==============================================================================
//==============================================================================
//==============================================================================

var RSS = (function(){

	var RSS = function(){
		this.source 		= [];
		this.comets 		= [];
		this.vr 			= [];
		this.step;
		this.index;
		this.i_modal 		= 0;
		this.img_i 			= 0;
		this.countdown 		= 5;
		this.images 		= [];
		this.dragstarted 	= false;
		this.cometprev;
		this.cometnext;
		this.cometopen 		= false;
		this.imageopen 		= false;
		this.imagenext;
		this.imageprev;
		this.imagefiltered 	= [];
	}

	RSS.prototype = {

		init: function(){
			//console.log('RSS.js');
			var self 	= this;
			this.index 	= 0;
			this.step 	= 1;
			var int 	= setInterval(function(){
				if(rssloader.loaded == true){
					self.loadContent();
					clearInterval(int);
				}
			}, 500);
		},

		loadContent: function(){
			var data;
			var self 		= this;

			this.convertData(rssloader.chandra, false);
			this.source.push(rssloader.chandra);

			this.comets.push(rssloader.comet);
		},


		convertData: function(src, arg){
			var self = this;

			$.each(src.results, function(key, value){
				var xmlDoc = jQuery.parseXML(value);
				if (xmlDoc) {
					if(arg == false && isVR == false){
						self.displayData(xmlDoc);
					}
				}
			});

		},


		imgvr: function(src) {
			var self 		= this;

			var i 		= this.index;
			this.i_modal++;

			//retrieve image
			var childs 				= src.childNodes;
			var img 				= childs[5].getAttribute('url');

			var this_old = 'http';
			var this_new = 'https';

			var secure = img.replace(this_old, this_new);

			if(this.index < 10){

				this.index++;

				var image 			= new Image();
				//image.src 			= secure;
				image.crossOrigin 	= 'anonymous';
				image.onload 		= function() {
					self.img_i++;
					imagetocanvas(image, 600, 600 ,true, self.img_i, i);
				};
				image.src 			= secure;

			}

			function imagetocanvas( img, thumbwidth, thumbheight, crop, nbr, ref) {

				var c 				= document.querySelector('#c-' + ref);

				var cx 				= c.getContext('2d');
				c.width 			= thumbwidth;
				c.height 			= thumbheight;
				var dimensions 		= resize(img.width, img.height, thumbwidth, thumbheight);
				if(crop) {
					c.width 		= dimensions.w;
					c.height 		= dimensions.h;
					dimensions.x 	= 0;
					dimensions.y 	= 0;
				}
				cx.drawImage(
					img, dimensions.x, dimensions.y, dimensions.w, dimensions.h
				);
			};

			function resize( imagewidth, imageheight, thumbwidth, thumbheight ) {
				var w = 0, h = 0, x = 0, y = 0,
					widthratio  = imagewidth / thumbwidth,
					heightratio = imageheight / thumbheight,
					maxratio    = Math.max( widthratio, heightratio );

				if ( maxratio > 1 ) {
					w = imagewidth / maxratio;
					h = imageheight / maxratio;
				}
				else{
					w = imagewidth;
					h = imageheight;
				}
				x = ( thumbwidth - w ) / 2;
				y = ( thumbheight - h ) / 2;
				return { w:w, h:h, x:x, y:y };
			};

		},


		displayData: function(src){

			var self 		= this;
			var i 			= this.index;

			this.i_modal++;

			//retrieve content
			var childs 				= src.childNodes;
			var title 				= childs[0].children[0].innerHTML;
			var url 				= childs[0].children[2].nextSibling.innerHTML;
			var img 				= childs[0].children[3].getAttribute('url');
			var length 				= childs[0].children[3].getAttribute('length');
			var date 				= childs[0].children[5].innerHTML;
			var converted_date 		= self.convertDate(date);

			var article 			= document.createElement('article');
			var article_title 		= document.createElement('h3');
			article_title.innerHTML = title;

			var article_date 		= document.createElement('small');
			article_date.classList.add('rss-date');
			article_date.innerHTML 	= converted_date;


			if(this.index < 5 && length < 3000000){

				this.index++;

				//modal
				article.setAttribute('data-modal', (this.index - 1));
				article.classList.add('rss--article');
				article.classList.add('trigger');

				//data
				article.setAttribute('data-trigger-start', (50 + (i*6)));
				article.setAttribute('data-trigger-end', (50 + (i*6)));

				article.appendChild(article_title);
				article.appendChild(article_date);

				var img_container 		= document.createElement('div');
				img_container.classList.add('img__container');
				article.appendChild(img_container);


				document.querySelector('.js-rss').appendChild(article);

				var image 			= new Image();
				image.src 			= img;
				this.images.push(image);

				this.imagefiltered.push(src);

				image.onload 		= function() {
					imagetocanvas(image, 600, 600 ,true);
					self.countdown--;
					if(self.countdown == 0){
						watchRSS();
						dragAnim = new DragHandler();
						dragAnim.init();
					}
				};
			}
			else{
				this.images.push('none');
			}


			function imagetocanvas( img, thumbwidth, thumbheight, crop) {
				var c  				= document.createElement('canvas');
				var cx 				= c.getContext('2d');
				c.width 			= thumbwidth;
				c.height 			= thumbheight;
				var dimensions 		= resize( img.width, img.height, thumbwidth, thumbheight );
				if(crop) {
					c.width = dimensions.w;
					c.height = dimensions.h;
					dimensions.x = 0;
					dimensions.y = 0;
				}
				cx.drawImage(
					img, dimensions.x, dimensions.y, dimensions.w, dimensions.h
				);
				img_container.append( c );
			};

			function resize( imagewidth, imageheight, thumbwidth, thumbheight ) {
				var w = 0, h = 0, x = 0, y = 0,
					widthratio  = imagewidth / thumbwidth,
					heightratio = imageheight / thumbheight,
					maxratio    = Math.max( widthratio, heightratio );

				if ( maxratio > 1 ) {
					w = imagewidth / maxratio;
					h = imageheight / maxratio;
				}
				else{
					w = imagewidth;
					h = imageheight;
				}
				x = ( thumbwidth - w ) / 2;
				y = ( thumbheight - h ) / 2;
				return { w:w, h:h, x:x, y:y };
			}

		},

		convertDate: function(dt){
			var day = ['Mon,', 'Tue,', 'Wed,' ,'Thu,', 'Fri,', 'Sat,', 'Sun,'];
			var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

			//remove day
			for(var i = 0; i < day.length; i++){
				var this_old = day[i];
				var this_new = '';

				var str = dt;
				var res = str.replace(this_old, this_new);
				dt 		= res;
			}

			//change month
			for(var i = 0; i < month.length; i++){
				var this_old = month[i];
				var num;
				if(i < 10){
					num = '0'+(i+1);
				}
				else{
					num = (i+1);
				}
				var this_new = '.' + num + '.';

				var str = dt;
				var res = str.replace(this_old, this_new);
				dt 		= res;
			}

			//remove 2 first space + remove hour/edt
			var cur 		= 0;
			var newChar 	= [];
			var joined;
			for(var i = 0; i < dt.length; i++){
				var char = dt[i];
				if(char === ' ' && cur < 3){
					cur++;

					var str = dt;
					var res = str.replace(char, '');
					dt 		= res;
				}
			}

			for(var i = 0; i < dt.length; i++){
				if(i < 10){
					var char = dt[i];
					newChar.push(char);
				}
				else{
					joined 	= newChar.join('');
					var str = dt;
					var res = str.replace(str, joined);
					dt 		= res;
					return dt;
				}
			}
		},


		previewComet: function(index){

			if(index > 9){
				index -= 10;
			}

			var self 		= this;

			var src 		= this.comets[0].results[index];
			var xmlDoc 		= jQuery.parseXML(src);

			//retrieve content
			var childs 				= xmlDoc.childNodes;
			var title 				= childs[0].children[0].innerHTML;
			var date 				= childs[0].children[5].innerHTML;
			var converted_date 		= self.convertDate(date);

			//display datas for preview
			$('.hotspot-title').html(title);
			$('.hotspot-date').html(converted_date);

		},

		openComet: function(index){

			$('.menu').fadeOut();

			if(index > 9){
				index -= 10;

				this.cometprev = 9;
				this.cometnext = index + 1;
			}
			else if(index == 0){

				this.cometprev = 9;
				this.cometnext = index + 1;
			}
			else if(index == 9){
				this.cometprev = index - 1;
				this.cometnext = 0;
			}
			else{
				this.cometprev = index - 1;
				this.cometnext = index + 1;
			}

			var self 		= this;

			var content 	= this.comets[0].results[index];
			var xmlDoc 		= jQuery.parseXML(content);

			var childs, title, url, txt, date, converted_date;

			if(xmlDoc) {
				//retrieve content
				childs 				= xmlDoc.childNodes;
				title 				= childs[0].children[0].innerHTML;
				url 				= childs[0].childNodes[9].innerHTML;
				txt 				= childs[0].children[2].innerHTML;
				date 				= childs[0].children[5].innerHTML;
				converted_date 		= self.convertDate(date);
			}


			//empty content
			$('.modal__date').empty();
			$('.modal__title').empty();
			$('.modal__more').empty();
			$('.modal__read').attr('href', '');
			$('.modal__img img').attr('src', '');


			//fill new content
			$('.modal__date').html(converted_date);
			$('.modal__title').html(title);
			$('.modal__more').html(txt);
			$('.modal__read').attr('href', url);


			//open modal
			$('.js-discover').addClass('hide');

			$('.rss--modal').removeClass('close');
			$('.rss--header').addClass('close');
			$('.rss--feed').addClass('close');

			$('html').addClass('noscroll');

			this.cometopen = true;

			if(drag != undefined){
				dragdisable = true;
			}

		},

		transitioncomet: function(index){

			var self = this;

			//hide content
			$('.modal__date, .modal__title, .modal__more, .modal__read, .modal__img img').addClass('transition');

			var content 	= this.comets[0].results[index];
			var xmlDoc 		= jQuery.parseXML(content);

			var childs, title, url, txt, date, converted_date;

			if(xmlDoc) {
				//retrieve content
				childs 				= xmlDoc.childNodes;
				title 				= childs[0].children[0].innerHTML;
				url 				= childs[0].childNodes[9].innerHTML;
				txt 				= childs[0].children[2].innerHTML;
				date 				= childs[0].children[5].innerHTML;
				converted_date 		= self.convertDate(date);
			}


			setTimeout(function() {
				//empty content
				$('.modal__date').empty();
				$('.modal__title').empty();
				$('.modal__more').empty();
				$('.modal__read').attr('href', '');
				$('.modal__img img').attr('src', '');

				$('.modal__date').html(converted_date);
				$('.modal__title').html(title);
				$('.modal__more').html(txt);
				$('.modal__read').attr('href', url);
			}, 500);

			//show content
			setTimeout(function() {
				$('.modal__date, .modal__title, .modal__more, .modal__read, .modal__img img').removeClass('transition');
			}, 1000);

			if(index > 4){
				index -= 5;

				this.cometprev = 4;
				this.cometnext = index + 1;
			}
			else if(index == 0){

				this.cometprev = 4;
				this.cometnext = index + 1;
			}
			else if(index == 4){
				this.cometprev = index - 1;
				this.cometnext = 0;
			}
			else{
				this.cometprev = index - 1;
				this.cometnext = index + 1;
			}
		},

		transitionmodal: function(index){

			var self = this;

			//hide content
			$('.modal__date, .modal__title, .modal__more, .modal__read').addClass('transition');
			$('.modal__img img').removeClass('open');

			var content 	= this.imagefiltered[index];

			var childs, title, url, img, txt, date, converted_date;

			//retrieve content
			childs 				= content.childNodes;
			title 				= childs[0].children[0].innerHTML;
			url 				= childs[0].childNodes[9].innerHTML;;
			img 				= childs[0].children[3].getAttribute('url');
			txt 				= childs[0].children[2].innerHTML;
			date 				= childs[0].children[5].innerHTML;
			converted_date 		= self.convertDate(date);

			setTimeout(function() {
				//empty content
				$('.modal__date').empty();
				$('.modal__title').empty();
				$('.modal__more').empty();
				$('.modal__read').attr('href', '');
				$('.modal__img img').attr('src', '');

				$('.modal__date').html(converted_date);
				$('.modal__title').html(title);
				$('.modal__more').html(txt);
				$('.modal__read').attr('href', url);
				$('.modal__img img').attr('src', img);
			}, 500);

			//show content
			setTimeout(function() {
				$('.modal__date, .modal__title, .modal__more, .modal__read, .modal__img img').removeClass('transition');
				$('.modal__img img').addClass('open');
			}, 1000);

			if(index > 4){
				index -= 5;

				this.imageprev = 4;
				this.imagenext = index + 1;
			}
			else if(index == 0){

				this.imageprev = 4;
				this.imagenext = index + 1;
			}
			else if(index == 4){
				this.imageprev = index - 1;
				this.imagenext = 0;
			}
			else{
				this.imageprev = index - 1;
				this.imagenext = index + 1;
			}
		},

		openModal: function(index){

			$('.menu').fadeOut();

			if(index > 4){
				index -= 5;

				this.imageprev = 4;
				this.imagenext = index + 1;
			}
			else if(index == 0){

				this.imageprev = 4;
				this.imagenext = index + 1;
			}
			else if(index == 4){
				this.imageprev = index - 1;
				this.imagenext = 0;
			}
			else{
				this.imageprev = index - 1;
				this.imagenext = index + 1;
			}

			var self 		= this;

			var content 	= this.imagefiltered[index];

			var childs, title, url, img, txt, date, converted_date;

			if(content) {
				//retrieve content
				childs 				= content.childNodes;
				title 				= childs[0].children[0].innerHTML;
				url 				= childs[0].childNodes[9].innerHTML;;
				img 				= childs[0].children[3].getAttribute('url');
				txt 				= childs[0].children[2].innerHTML;
				date 				= childs[0].children[5].innerHTML;
				converted_date 		= self.convertDate(date);
			}


			//empty content
			$('.modal__date').empty();
			$('.modal__title').empty();
			$('.modal__more').empty();
			$('.modal__read').attr('href', '');
			$('.modal__img img').attr('src', '');


			//fill new content
			$('.modal__date').html(converted_date);
			$('.modal__title').html(title);
			$('.modal__more').html(txt);
			$('.modal__read').attr('href', url);
			$('.modal__img img').attr('src', img);

			$('.modal__img img').addClass('open');


			//open modal
			$('.js-discover').addClass('hide');

			$('.rss--modal').removeClass('close');
			$('.rss--header').addClass('close');
			$('.rss--feed').addClass('close');

			$('html').addClass('noscroll');

			this.imageopen = true;

			if(drag != undefined){
				dragdisable = true;
			}

		},

		closeModal: function(){

			$('html').removeClass('noscroll');

			$('.rss--modal').addClass('close');
			setTimeout(function() {
				$('.rss--header').removeClass('close');
				$('.rss--feed').removeClass('close');
				$('.js-discover').removeClass('hide');
				$('.modal__img img').removeClass('open');
				$('.menu').fadeIn();
			}, 200);

			this.cometopen = false;
			this.imageopen = false;

			if(drag != undefined){
				dragdisable = false;
			}
		},

		getvr: function(index){
			// var data = this.vr[index];
			// console.log(data);
			// alert(data);
		}


	}

	return RSS;
})();
