/*
* @Author felix
* @CreateTime 2017 / 1 /13
* @Version 1.0
* @Since 1.0
* @description 公告组件
*/
define([
		'rendorHtml',
		'tool',
		'util'],function(rendorHtml,Tool,util){

	var _target = null;
	
	var setString = function(string) {
		$("#"+_target).find('div').text(string);
	}
	/*
		@description 组件初始化
		@parm 
			target		: 渲染目标ID
	*/
	var render = function(target,string) {
		_target = target;
		var guid	= Tool.guid();
		$("#"+_target).append(
		  '<div id="'+_target+'-'+guid+'" class="notice">' +
			'<span  class="top-left"></span>' +
			'<span  class="top-right "></span>' +
			'<span  class="bottom-left "></span>' +
			'<span  class="bottom-right "></span>' +
			'<div>'+string+'</div>'+
		  '</div>');

	
	}

	

	return {
		render: render,
		setString: setString
	};
});
