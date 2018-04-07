/*
* @Author felix
* @CreateTime 2017 / 1 /24
* @Version 1.0
* @Since 1.0
* @description 表单缓存组件
*/
/*
$.each(Array, function(i, field){
  field.name
  field.value
});
*/
define([
		'lib/store.min.js',
		'tool'],function(store,Tool){
	
	var _key = Tool.md5('formcache');

	/*
		@description 保存目标范围内的表单
		text checkbox radio select 
	*/
	var save = function(target) {
		var formcache = store.get(_key) || {};
		var formArray = {};
		
		$("#"+target).find(":text,:hidden,:radio:checked,select,:checkbox:checked").each(function(i){
			var key		= $(this).attr('name');
			if(!Tool.isUndefined(key)) {
				var value	= $(this).val();
				if(key.indexOf("[]") > 0 ){
					key=key.replace("[]","");
					if(Tool.isUndefined(formArray[key])) {
						formArray[key] = [];
					}	
					formArray[key].push(value);
				}else{
					formArray[key] = value;
				}

				
			}
		});
		
		formcache[target] = formArray;
		store.set(_key,formcache);
	}

	var load = function(target) {
		var formcache = store.get(_key) || {};
		var serArray  = formcache[target] || {};
		var arrKey    = {};
		
		$("#"+target).find(":text,:hidden,select").each(function(i){
			var name		= $(this).attr('name');
			if(!Tool.isUndefined(name)) {
				var key			= name.replace("[]","");
				if(!Tool.isUndefined(serArray[key])) {
					if(name.indexOf('[]') > 0 ){
						if(Tool.isUndefined(arrKey[key])) {
							arrKey[key] = 0;
						}else{
							arrKey[key]++;
						}
						alert(name+":"+key+":"+serArray[key][arrKey[key]]);
						$(this).val(serArray[key][arrKey[key]]);
					}else{
						$(this).val(serArray[key]);
					}				
				}
			}
		});

		$("#"+target).find(":radio,:checkbox").each(function(i){
			var name		= $(this).attr('name');
			var key			= name.replace("[]","");
			var value		= $(this).val();
			if(!Tool.isUndefined(serArray[key])) {
				if(name.indexOf('[]') > 0 ){
					if($.inArray(value,serArray[key])!= -1 ) {
						$(this).attr('checked',true);
					}
				}else{
					if(!Tool.isUndefined(serArray[key]) && value == serArray[key]) {
						$(this).attr('checked',true);
					}
				}
			}
		});
		console.log(serArray);
		return serArray;
	}

	var clear = function() {
		store.set(_key,{});
	}

	return {
		save: save,
		load: load,
		clear: clear,
	};
});
