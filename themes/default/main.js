$(function(){
	var page = parseInt(location.hash.replace('#',''), 10) || 0;
	page = move(page);

	$(window).keyup(function(ev){
		var code = ev.keyCode;
		switch (code) {
			case 38: // up
			case 37: // left
			case 75: // k
				page = prev(page);
				break;
			case 40: // down 
			case 39: // right 
			case 74: // j
				page = next(page);
				break;
		}
	});

	function prev(p) {
		if (p > 0) p = move(p - 1);
		return p;
	}

	function next(p) {
		if (p + 1 < $('div.contents').size()) p = move(p + 1);
		return p;
	}

	function move(p) {
		if (isNaN(p) || p < 0 || $('div.contents').size() <= p) p = 0;
		$('div.contents').hide();
		$('div.contents').eq(p).show();
		location.hash = p;
		return p;
	}
});
