//定义了一个模块。
define(['tool'],function(Tool){
	var $i18n = null;

	var type=navigator.appName
	if (type=="Netscape"){
		var lang = navigator.language
	}else{
		var lang = navigator.userLanguage
	}
	var lang = lang.substr(0,2);

	$.i18n.properties({//加载资浏览器语言对应的资源文件
		name : 'strings', //资源文件名称
		path : 'common/i18n/', //资源文件路径
		mode : 'map', //用Map的方式使用资源文件中的值
		language : lang,
		mode:'both',
		callback : function() {//加载成功后设置显示内容
			$i18n = $.i18n;
			//prop = $.i18n.prop('Name');
			//console.log(prop);
		}
	});
	
	var load = function(target) {
		//[description!='']
		if(Tool.isUndefined(target)) {
			var target = 'body';
		}else{
			var target = "#"+target;
		}
		

		$(target+" input").each(function(i){
			if($(this).attr('description')!='' && $(this).attr('description')!=undefined &&$i18n.prop($(this).attr('description'))!=undefined)
			{
				$(this).attr('placeholder',$i18n.prop($(this).attr('description')));
				$(this).attr('description','');
			}
		});

		$(target+" button,"+target+" font").each(function(i){
			
			if($(this).attr('description')!='' && $(this).attr('description')!=undefined &&$i18n.prop($(this).attr('description'))!=undefined)
			{
				$(this).text($i18n.prop($(this).attr('description')));
				$(this).attr('description','');
			}
			
		});


	}

	return {
		$i18n:$i18n,
		load:load
	};
});

	
