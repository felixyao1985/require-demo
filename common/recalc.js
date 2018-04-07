define(function (){
	var doc = document;
	var docEl = doc.documentElement;

	var container = null;
	var init   = function(elt) {
		container = elt;
		resize();
		recalc();
	}

	var resize = function() {
		console.log('resize被调用');
		var proportion = 768 / 1024;
		docEl.style.fontSize = 20 * (container.clientWidth / 320) + 'px';
		container.style.height = container.clientWidth * proportion + "px";
	};
	var recalc = function (){
		console.log('recalc');
		var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
		window.addEventListener(resizeEvt, resize, false);
		doc.addEventListener('DOMContentLoaded', resize, false);
	};
	return {
		init: init
	};
});