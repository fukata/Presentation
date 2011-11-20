(function($) {
	function Presentaiton(options) {
		this.page = 0;
		this.timer = null;
		this.startDate = null;
		this.options = $.extend({
			contentsClass: "contents"
		}, options);
		this.init();
	}

	Presentaiton.prototype.init = function() {
		this.initParams();
		this.initMovePage();
		this.initResize();
		this.initTimer();
		this.initCodeHighLight();
		this.move(this.page);
	}

	Presentaiton.prototype.initParams = function() {
		console.log("initParams");
		this.page = parseInt(location.hash.replace('#',''), 10) || 0;
	}

	Presentaiton.prototype.initMovePage = function() {
		console.log("initMovePage");
		var self = this;
		$(window).keyup(function(ev){
			ev.stopPropagation();
			var code = ev.keyCode;
			switch (code) {
				case 36: // Home
					self.move(0);
					break;
				case 35: // End
					self.move(self.totalPage() - 1);
					break;
				case 38: // up
				case 37: // left
				case 75: // k
					self.movePrev();
					break;
				case 40: // down 
				case 39: // right 
				case 74: // j
					self.moveNext();
					break;
			}
		});
	}

	Presentaiton.prototype.initResize = function() {
		console.log("initResize");
		var self = this;
		$(window).resize(function(){
			self.updateWindowSize();
		});
	}

	Presentaiton.prototype.initTimer = function() {
		console.log("initTimer");
		if ($('#time').size() > 0) {
			var self = this;
			this.startDate = new Date();
			this.timer = setInterval(function(){self.updateTime();}, 500);
		}
	}


	Presentaiton.prototype.initCodeHighLight = function() {
		console.log("initCodeHighLight");
		if ('hljs' in window) {
			hljs.tabReplace = '    '; // 4 spaces
			hljs.initHighlightingOnLoad();
			$('code').each(function(i, e) {hljs.highlightBlock(e, '    ')});
		}
	}

	Presentaiton.prototype.updateWindowSize = function() {
		var wh = $(window).height();
		var $content = $('div.' + this.options.contentsClass + ':visible');
		var y = $content.position() !== null ? $content.position().top : 0;
		if ($('#footer').size() > 0) {
			var fh = $('#footer').outerHeight();
			$content.height(wh - fh - y);
		} else {
			$content.height(wh - y);
		}
	}

	Presentaiton.prototype.updatePager = function(p) {
		if (!$('#pager')) return;
		var self = this;
		var pager = '<span>Page: ' + this.addZero(p,2) + '/' + this.addZero(this.totalPage() - 1, 2) + '</span>';
		$('#pager').html(pager);
		if (this.hasPage(p - 1)) $('#pager').append(' ').append($(document.createElement('a')).attr('href','javascript:void(0)').text('Prev').click(function(){self.prev(p);}));
		if (this.hasPage(p + 1)) $('#pager').append(' ').append($(document.createElement('a')).attr('href','javascript:void(0)').text('Next').click(function(){self.next(p);}));
	}

	Presentaiton.prototype.updateTime = function() {
		if (this.page == this.totalPage() - 1) {
			clearInterval(this.timer);
			return;
		}

		var t = (new Date()).getTime() - this.startDate.getTime();
		var h = m = s = 0;
		t /= 1000;
		if (t > 3600) {
			h = parseInt(t / 3600);
			t = t % 3600;
		}
		if (t > 60) {
			m = parseInt(t / 60);
			t = t % 60;
		}
		s = parseInt(t);

		$('#time').html('経過：' + this.addZero(h) + '時間' + this.addZero(m) + '分' + this.addZero(s) + '秒');
	}

	Presentaiton.prototype.addZero = function(n, z) {
		z = z || 1;
		var zero = '';
		var len = z - (''+n).length + 1;
		for (var i = 0; i < len; i++) zero += '0';
		return n < Math.pow(10, z) ? zero + n : n;
	}

	Presentaiton.prototype.move = function(p) {
		if (isNaN(p) || p < 0) {
			p = 0;
		} else if (p > this.totalPage()) {
			p = this.totalPage() - 1;
		}
		$('div.' + this.options.contentsClass).hide().eq(p).show();
		this.updatePager(p);
		this.updateWindowSize();
		location.hash = '#' + p;
		this.page = p;
		return p;
	}

	Presentaiton.prototype.moveNext = function() {
		if (this.page + 1 < this.totalPage()) {
			this.page = this.move(this.page + 1);
		}
	}

	Presentaiton.prototype.movePrev = function() {
		if (this.page > 0) {
			this.page = this.move(this.page - 1); 
		}
	}

	Presentaiton.prototype.totalPage = function() {
		return $('div.' + this.options.contentsClass).size();
	}

	Presentaiton.prototype.hasPage = function(p) {
		return p >= 0 && p < this.totalPage();
	}

	window.Presentaiton = Presentaiton;
})(jQuery);
