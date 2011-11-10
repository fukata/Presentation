(function($) {
function Presentaiton() {
	this.page = 0;
}

Presentaiton.prototype.init = function() {
	this.initMovePage();
	this.initResize();
	this.initCodeHighLight();
}

Presentaiton.prototype.initMovePage = function() {
	$(window).keyup(function(ev){
		ev.stopPropagation();
		var code = ev.keyCode;
		switch (code) {
			case 38: // up
			case 37: // left
			case 75: // k
				page = this.movePrev(page);
				break;
			case 40: // down 
			case 39: // right 
			case 74: // j
				page = this.moveNext(page);
				break;
		}
	});
}

Presentaiton.prototype.initResize = function() {
	$(window).resize(function(){
		this.updateWindowSize();
	});
}

Presentaiton.prototype.initCodeHighLight = function() {
	hljs.tabReplace = '    '; // 4 spaces
	hljs.initHighlightingOnLoad();
	$('code').each(function(i, e) {hljs.highlightBlock(e, '    ')});
}

Presentaiton.prototype.updateWindowSize = function() {
	var wh = $(window).height();
	var $content = $('div.contents:visible');
	$content.height(wh - fh - y);
	if ($('#footer')) {
		var fh = $('#footer').outerHeight();
		$content.height(wh - fh - y);
	} else {
		$content.height(wh - y);
	}
}

Presentaiton.prototype.updatePager = function(p) {
	if (!$('#pager')) return;

	var pager = '<span>Page: ' + addZero(p,2) + '/' + addZero(totalPage() - 1, 2) + '</span>';
	$('#pager').html(pager);
	if (hasPage(p - 1)) $('#pager').append(' ').append($(document.createElement('a')).attr('href','javascript:void(0)').text('Prev').click(function(){prev(p);}));
	if (hasPage(p + 1)) $('#pager').append(' ').append($(document.createElement('a')).attr('href','javascript:void(0)').text('Next').click(function(){next(p);}));
}

Presentaiton.prototype.move(p) {
	if (isNaN(p) || p < 0 || this.totalPage() <= p) p = 0;
	$('div.contents').hide().eq(p).show();
	this.updatePager(p);
	this.updateWindowSize();
	location.hash = '#' + p;
	this.page = p;
	return p;
}

Presentaiton.prototype.moveNext(p) {
	if (p + 1 < this.totalPage()) p = this.move(p + 1);
	return p;
}

Presentaiton.prototype.movePrev(p) {
	if (p > 0) p = this.move(p - 1); 
	return p;
}

Presentaiton.prototype.totalPage() {
	return $('div.contents').size();
}

Presentaiton.prototype.hasPage(p) {
	return p >= 0 && p < this.totalPage();
}

$.Presentaiton = Presentaiton;
})(jQuery);
