$(function(){
	var presen = new Presentaiton();
	$('#left-navi').click(function(){
		presen.movePrev();
	});
	$('#right-navi').click(function(){
		presen.moveNext();
	});
});
