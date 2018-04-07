define(function (){
	this.audio = null
	/**
	 * 背景音乐
	 * @param {[type]} url  [description]
	 * @param {[type]} loop [description]
	 */
	var init = function (url){
		audio = new Audio(url);
		//audio.autoplay = true;
	}

	var play = function (loop){
		audio.loop = loop || false; //是否循环
		audio.play();
	}

	var pause = function (callback){
		var promise = new Promise(function(resolve, reject) {
			audio.pause();
			resolve();
		});

		promise.then(function(){
			callback && callback();
		});
	}

	var end = function (callback){
		
		audio.addEventListener('ended', function() {
			callback()
		}, false);
	}
	

	return {
		init:init,
		play: play,
		end:end,
		pause:pause
	}
});