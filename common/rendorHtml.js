/*
* @Author felix
* @CreateTime 2017 / 2 /09
* @Version 1.0
* @Since 1.0
* @description 渲染页面
*/
define(['underscore','tool'], function(_,Tool){

	//渲染替换页面
	var rendor = function (target,html,data){
		return new Promise(function(resolve, reject) {
			if(Tool.isNull(document.getElementById(target)))resolve();
			var t=_.template(html);
			document.getElementById(target).innerHTML=t(data);
			resolve();
		});
	};
	
	//将页面渲染与目标元素内的上部
	var prepend = function (target,html,data){
		return new Promise(function(resolve, reject) {
			if(Tool.isNull(document.getElementById(target)))resolve();
			var t=_.template(html);
			document.getElementById(target).innerHTML=t(data)+document.getElementById(target).innerHTML;
			resolve();
		});
	};
	//将页面渲染与目标元素内的后面
	var append = function (target,html,data){
		return new Promise(function(resolve, reject) {
			if(Tool.isNull(document.getElementById(target)))resolve();
			var t=_.template(html);
			document.getElementById(target).innerHTML=document.getElementById(target).innerHTML+t(data);
			resolve();
		});
	};

	var clear = function (target){
		return new Promise(function(resolve, reject) {
			if(Tool.isNull(document.getElementById(target)))resolve();
			document.getElementById(target).innerHTML='';
			resolve();
		});
	};



	return {
		rendor: rendor,
		prepend: prepend,
		append: append,
		clear: clear
	};
});
