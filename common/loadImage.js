/*
* @Author felix
* @CreateTime 2017 / 2 /22
* @Version 1.0
* @Since 1.0
* @description 图片延迟载入
*/
define(function(){

	var load = function(elt) {
		$('.'+elt).each(function()
		{
			var obj = $(this);
			var url = $(this).attr('src-temp');
			if(url!='' && url!=undefined) {
				//$(this).css('width','50px');
				//$(this).css('height','50px');
				
				//$(this).attr('src','/loading.gif');
				loadImage(obj,url,function(obj,img) { 
					obj.attr('src',url);
					obj.attr('src-temp','');
					//obj.css('width','auto');
					//obj.css('height','auto');
				});
			}
		});	
	}


	
	var loadImage = function (obj,url,callback)
	{
		var img = new Image(); //创建一个Image对象，实现图片的预下载
			
		img.onload = function() {
			img.onload = null;
			callback(obj,img);
		}
		img.src = url;
	}

	return {
		load: load
	};
});
