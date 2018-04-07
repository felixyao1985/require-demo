/*
* @Author felix
* @CreateTime 2017 / 1 /13
* @Version 1.0
* @Since 1.0
* @description 导航按钮矩阵
*/
define([
		'rendorHtml',
		'tool',
		'util'],function(rendorHtml,Tool,util){

	var _target = null;

	/*
		@description 组件初始化
		@parm 
			target		: 渲染目标ID
	*/
	var render = function(target,name,icon,onclick) {
		_target = target;
		var guid	= Tool.guid();
		$("#"+_target).append(
		  '<div id="'+_target+'-'+guid+'" class="navigate-menu">' +
			'<div  class="navigate-icon ">' +
			  '<img  src="'+icon+'" id="'+_target+'-click"/>'+
			'</div>' +
			'<div  class="navigate-name">' +
			  '<a class="'+_target+'-click">'+name+'</a>'+
			'</div>' +
		  '</div>');

		$('#'+_target+'-'+guid).click( function () { 
			if (typeof onclick == 'function')onclick();
		});
	}

	

	return {
		render: render
	};
});
