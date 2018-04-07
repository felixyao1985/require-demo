 /*
* @Author felix
* @CreateTime 2017 / 2 /10
* @Version 1.0
* @Since 1.0
* @description wordpress
*/
define([
		'tool',
		'util',
		'rendorHtml',
		'css!module/css/wordpress.css'],function(Tool,util,rendorHtml){
	
	//对搜索的文字进行特殊化
	var regex_str = function (str, search){
		return str.replace(new RegExp("(" + search + ")","ig"), "<strong>" + search + "</strong>");
	}

	var App = function(id) {
		var _id         = id || 'def';
		var _layoutid	= 'wordpress-'+id;
		var _layoutMain	= _layoutid+'-main';
		var _settings	= {
			type:'static',//dynamic
			data:{},
			url:{},
			comparison:true,
			maxShow:5,
			callback:function(){},
		}
		
		//获取数据集
		var getData = function() {
			var data = {};

			if(_settings.type=='static') {
				data = _settings.data;
			};

			return data
		}

		//获得符合要求的字串
		var setListData = function(data,search) {
			var _data			= data;
			var _comparison		= _settings.comparison || true;
			var length			= _data.length;

			return new Promise(function(resolve, reject) {
				var html = "";
				for(var i=0;i<length;i++)
				{
					var item = _data[i];
					var flag = false;
					var rEnd = regex_str(item.name,search);
					var patt1= new RegExp(search);
					
					if(search == ''|| !_settings.comparison){flag = true}
					
					if(patt1.test(item.name)) {flag = true}
					if(flag) {
						html += '<li class="'+_layoutid+'-result" style="cursor: pointer;" mid="'+item.name+'" title="'+item.name+'">'+rEnd+'</li>';
					}

					if(_settings.maxShow==(i+1))break;
				}
				resolve(html);
			})
		}


		
		var rendorList = function($input,html) {
			var $layoutMain		= $("#"+_layoutMain);
			var offset = $input.offset();
			
			$layoutMain.css({
				'top':offset.top+$input.height(),
				'left':offset.left,
				'width':$input.width(),
			})

			if(html!='') {
				$layoutMain.show();
				$layoutMain.find('ul').html(html);
			}else{
				$layoutMain.hide();
				$layoutMain.find('ul').html("");
			}

			$('#'+_layoutMain+' li').on("mouseup touchend" ,function (e) { 
				e.stopPropagation();
				e.preventDefault();
				onClick($input,$(this));
			});
		}

		var onClick = function($input,$li) {
			var callback        = _settings.callback;
			
			$input.val($li.attr('title'));
			$("#"+_layoutMain).hide();
			if (typeof callback == 'function')callback($input,$li);
			
		}

		var init = function($obj,settings) {
			$.extend(_settings,settings);
			var data		= getData();
			var settings	= _settings;
			var $main		= $("#"+_layoutMain);
			if($main.size()==0) {
				$('body').append('<div id="'+_layoutMain+'" class="hide wordpress"><ul></ul></div>');
			
				$('#wrapper').live("mousedown touchstart" ,function (e) {
					$("#"+_layoutMain).hide();
				});
			}
		
			$obj.live("keyup mouseup touchend" ,function (e) { 
				$input = $(this);
				setListData(data,$input.val())
					.then(function(list){
						rendorList($input,list);
					})
				
			});		

		
		}

		return {
			init: init
		};
	}

	return {
		App: App
	};
});
