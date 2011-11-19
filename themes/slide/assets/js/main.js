$(function(){

	Presentaiton.prototype.move = function(p) {
		if (isNaN(p) || p < 0 || this.totalPage() <= p) {
			p = 1;
		}
		this.updatePager(p);
		this.updateWindowSize();
		location.hash = '#' + p;
		this.page = p;
		$('a.xtrig').attr('href', '#' + p).trigger('click');
		return p;
	}

	Presentaiton.prototype.movePrev = function() {
		if (this.page > 1) {
			this.page = this.move(this.page - 1); 
		}
	}

	Presentaiton.prototype.updateWindowSize = function() {
		var ww = $(window).width();
		var wh = $(window).height();
		var $content = $('div.' + this.options.contentsClass).eq(this.page - 1);
		var y = ($content !== null && $content.position() !== null) ? $content.position().top : 0;
		if ($('#footer')) {
			var fh = $('#footer').outerHeight();
			$content.height(wh - fh - y);
		} else {
			$content.height(wh - y);
		}
		$('.coda-slider, .coda-slider .panel').css('width', ww);
		$('.panel-container').css('width', ww * $('.coda-slider .panel').size());
	}

	Presentaiton.prototype.init = function() {
		this.initParams();
		this.initMovePage();
		this.initResize();
		this.initTimer();
		this.initCodeHighLight();
		this.move(this.page);
		this.updateWindowSize();
		$('#contents-container').codaSlider({
			autoHeight: false,
			dynamicArrows: false,
			dynamicTabs: false
		});
	}

	Presentaiton.prototype.initParams = function() {
		console.log("initParams");
		this.page = parseInt(location.hash.replace('#',''), 10) || 1;
	}

	var presen = new Presentaiton({
		contentsClass: "panel"
	});
});
