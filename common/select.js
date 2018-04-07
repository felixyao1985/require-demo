/*
* @Author felix
* @CreateTime 2017 / 2 /23
* @Version 1.0
* @Since 1.0
* @description 下拉选单
*/
define(['util'],function(util){
	var _settings = {
		id:'',
		seleted:'',
		options:[],
		default:{id:'',value:''},
	}
	
	var setitems = function(settings) {
		$.extend(_settings,settings);
		
		if(_settings.default.value!='') {
			var html = '<option value="'+_settings.default.id+'">'+_settings.default.value+'</option>';
		}else {
			var html = '';
		}

		$.each(_settings.options, function(key, item){
			if(_settings.seleted==item.id) {
				html += '<option value="'+item.id+'" selected>'+item.value+'</option>';
			}else{
				html += '<option value="'+item.id+'">'+item.value+'</option>';
			}
		});
		$('#'+_settings.id).html(html);
	}
	return {
		setitems:setitems,

	};
});

	
