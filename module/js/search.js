/*
* @Author felix
* @CreateTime 2017 / 1 /11
* @Version 1.0
* @Since 1.0
* @description 搜索组件
*/
define([
		'rendorHtml',
		'module/js/tips',
		'tool',
		'util',
		'lib/store.min.js',
		'Session',
		'pdapi',
		'css!module/css/search.css'],function(rendorHtml,tips,Tool,util,store,Session,API){

	var _target			= null;
	var _settings       ={
		key:'keywordList',
		module:'doctor',
		maxTag:'6',
	}	

	var init = function(settings) {
		$.extend(_settings,settings);

		var onclose			= function() {_hide();}
		var onsearch		= function(target,keyword) {showResult(target,keyword);}
		
		var close			= function(fun) {
			if (typeof fun == 'function')onclose = fun;
		}
		
		/*
			@description 搜索callback
		*/
		var search  = function(fun) {
			if (typeof fun == 'function')onsearch = fun;
		}

		var _hide = function() {
			$("#"+_target).remove();
		}

		var addResultEvent = function() {
			$('#'+_target+' .goto-view').click( function () { 
				location.hash = _settings.module+'/view/'+$(this).attr('mid');
			});	
		}
		


		var storeKeyWord = function(){
			var _this = this;
			_this.key		= Tool.md5(_settings.key);
			_this.keywordList = store.get(_this.key);
			
			if(Tool.isUndefined(_this.keywordList))
			{
				_this.keywordList = [];
			}	
		
			var push = function(str) {

				for(var i = 0;i<_this.keywordList.length;i++)
				{
					if(_this.keywordList[i]==str)return false;
				}

				_this.keywordList.push(str);
				if(_this.keywordList.length > _settings.maxTag)_this.keywordList.pop();
				store.set(_this.key,_this.keywordList);
				
			}

			var remove = function(key) {
			
				var _temp = []
				for(var i = 0;i<_this.keywordList.length;i++)
				{
					if(i!=key)_temp.push(_this.keywordList[i]);
				}
				_this.keywordList = _temp;
				store.set(_this.key,_this.keywordList);
			}

			var get = function(){
				return _this.keywordList;
			}

			return {
				push:push,
				get:get,
				remove:remove
			};
		}
		
		//热门标签
		var storeHotTag = function(){
			
			var get = function(){
				return new Promise(function(resolve, reject) {
					switch(_settings.module)
					{
						case 'kbase':
							var KBase = new API.KBase(Session.get('user').token);
							KBase.getHotKeywords()
								.then(function(items){	
									var ret  = [];
									for(var i=0;i<items.length;i++) {
										var item = {};
										item.id			= items[i].KeyWordID;
										item.value		= items[i].KeyWord;
										item.KeyWord	= 'kbase_'+items[i].KeyWordID;
										ret.push(item);
									}
									resolve(ret);
								})
						break
					}
				})
			}

			return {
				get:get
			};
		}

	
		var showTag = function(target) {
			storeHotTag().get().then(function(items){
				if(items.length>0) {
					tips.init(target,util.string.HotTag).rendor();
					$("#"+target).append('<div class="search-tag container-taglist clearfix"></div>');
					for(var i = 0;i<items.length;i++)
					{
						$("#"+target).find(".container-taglist").append('<span id="hottag-'+items[i].id+'" class="search-keyword-list" KeyWord="'+items[i].KeyWord+'">' +items[i].value+'</span>');
					}
					
					$('#'+target+' .search-keyword-list').on("mouseup touchend", function () { 
						onsearch(target,$(this).attr('KeyWord'));
					});
				}
			})
		}

		//历史搜索
		var showHistoryTag = function(target) {
			var keywordList = storeKeyWord().get();
			if(keywordList.length>0) {

				tips.init(target,util.string.HistoryTag).rendor();	
				$("#"+target).append('<div class="search-history container-taglist clearfix"></div>');
				$("#"+target).find(".container-taglist").append('<ul></ul>');
				for(var i = 0;i<keywordList.length;i++)
				{
					$("#"+target).find('ul').append('<li id="keywordList-'+i+'" class="search-keyword-list"><span class="jump">' +keywordList[i]+'</span><span class="remove float-right" mid="'+i+'">X</span></li>');
				}
				
				$('#'+target+' .search-keyword-list .jump').on("mouseup touchend", function () { 
					onsearch(target,$(this).text());
				});
				$('#'+target+' .search-keyword-list .remove').on("mouseup touchend", function () { 
					$(this).parent().remove();
					storeKeyWord().remove($(this).attr('mid'));
				});
			}
		}

		var showResult = function(target,keyword) {
			_target = target;
		
			storeKeyWord().push(keyword);
			var data = {};
			data.items = [];
			require(['text!module/tpl/search-result.tpl'],function(tpl){
				rendorHtml.rendor(target,tpl,data)
					.then(addResultEvent())
			})
		}

		var setcloseType  = function(type) {
			var _closeType = type;
		}


		/*
			@description 组件初始化
			@parm 
				target		: 渲染目标ID
		*/
		var show = function(target) {
			_target = target;
			$("#"+_target).append(
			  '<div id="'+_target+'-container" class="bg-color">' +
				'<div id="'+_target+'-content">' +
				  '<input class="search" id="'+_target+'-input" type="text"  value="" maxlength=20/>'+
				  '<a>'+util.string.cancel+'</a>'+
				'</div>' +
			  '</div>');
			$('#'+_target+'-input').focus();
			$('#'+_target+'-input').keyup( function () { 
				
				if(Tool.isNull($(this).val()))
				{
					$(this).next('a').text(util.string.cancel);
				}else{
					$(this).next('a').text(util.string.search);
				}
			});
			
			$('#'+_target+'-content a').click( function () { 
				if(Tool.isNull($('#'+_target+'-input').val()))
				{
					onclose();
				}else{
					storeKeyWord().push($('#'+_target+'-input').val());
					onsearch(target,$('#'+_target+'-input').val());
				}
			});
		}

		return {
			show: show,
			setcloseType: setcloseType,
			showResult: showResult,
			showTag: showTag,
			showHistoryTag:showHistoryTag,
			close: close,
			search: search,
		};
	}

	return {
		init: init,
	};
});
