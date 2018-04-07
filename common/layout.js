/*
* @Author felix
* @CreateTime 2017 / 2 /09
* @Version 1.0
* @Since 1.0
* @description 页面布局
*/
define(function(){

	//插入目标元素之后
	var insert = function(target,tag,id,classname){
		var id			= id || target+tag;
		var classname	= classname || "";
		var $tag		= document.createElement(tag);
		$tag.id			= id;
		$tag.className	= classname; 
		document.getElementById(target).appendChild($tag);
	}

	//插入最前
	var insertTop = function(target,tag,id,classname){
		var id			= id || target+tag;
		var classname	= classname || "";
		var $tag		= document.createElement(tag);
		var $parent		= document.getElementById(target);
		$tag.id			= id;
		$tag.className	= classname; 
		$parent.insertBefore($tag,$parent.firstChild);
	}

	//插入目标元素之前
	var insertpre= function(target,tag,id,classname){
		var id			= id || target+tag;
		var classname	= classname || "";
		var $tag		= document.createElement(tag);
		var $target		= document.getElementById(target);
		var $parent		= $target.parentNode;
		$tag.id			= id;
		$tag.className	= classname; 
		$parent.insertBefore($tag,$target);
	}

	var remove = function (target){
		return new Promise(function(resolve, reject) {
			if(Tool.isNull(document.getElementById(target)))resolve();
			document.getElementById(target).innerHTML='';
			document.getElementById(target).parentNode.removeChild(document.getElementById(target));
			resolve();
		});
	};

	return {
		remove: remove,
		insertTop: insertTop,
		insert: insert,
		insertpre: insertpre,

	};
});
