/*
* @Author felix
* @CreateTime 2017 / 2 /07
* @Version 1.0
* @Since 1.0
* @description 医生信息组件
*/
define([
		'common/loadImage',
		'rendorHtml',
		'Session',
		'tool',
		'util',
		'properties',
		'pdapi',
		'css!module/css/doctor.css'],function(loadImage,rendorHtml,Session,Tool,util,properties,API){

	var _target				= null;
	var _layoutid			= 'doctor';
	var _guid				= Tool.guid();
	var _layoutMain			= _layoutid+'-main'+_guid;
	var _displayoptions		= true;
	var _imgload			= 'imgload';//图片延迟载入

	var onsuccess			= function(){return true;};
	var onerror				= function(){};
	var onjumpClick			= function(mid) {show(_target).viewPanel(mid);}
	var oninquiryClick		= function(mid) {show(_target).viewPanel(mid);}

	var hideOption = function() {
		_displayoptions = false;
	}

	var showOption = function() {
		_displayoptions = true;
	}

	var success = function(fun) {
		onsuccess = fun;
	}

	var jumpClick = function(fun) {
		onjumpClick = fun;
	}

	var inquiryClick = function(fun) {
		oninquiryClick = fun;
	}

	var init = function(tagid) {
		rendorHtml.clear(tagid);
		rendorHtml.layout.insert(tagid,'div',_layoutMain);
	}


	var show = function(target) {
		_target = target;
		
		
		/*
			初始化页面
		*/
		init(_target);

		/*
			@description 获取医生列表
			@parm 
				obj		: obj
		*/
		var listPanel = function(obj) {
			var options = {'page':1,"rows":10};
			var data    = {};
			$.extend(options,obj);

			var Doctor = new API.Doctor(Session.get('user').token);
			
			Doctor.getList(options.page,options.rows)
				.then(function(ret){
					var items		= ret.Doctors;
					data.items = items;
				}).then(function(){
					data.displayoptions = _displayoptions;
					rendorlist(data)
				})


		}

		var addEvent = function() {
			$('#'+_layoutMain+' .goto-view').click( function () { 
				onjumpClick($(this).attr('mid'));
			});

			$('#'+_layoutMain+' .inquiry').click( function () { 
				oninquiryClick($(this).attr('mid'));
			});
		}

		var rendorlist = function(data) {
			require(['text!module/tpl/doctor-list.tpl'],function(tpl){
				rendorHtml.rendor(_layoutMain,tpl,data)
					.then(function(){
						properties.load();
						loadImage.load(_imgload);
					})
					.then(addEvent())
			})
		}

		/*
			@description 显示医生详情
			@parm 
				id		: 渲染目标ID
		*/
		var viewPanel = function(id) {
			var data = {};
			var Doctor = new API.Doctor(Session.get('user').token);
			Doctor.getView(id)
				.then(function(ret){
					
					data.item = ret;
				}).then(function(){
					data.displayoptions = _displayoptions;
					rendorview(data);
				})

		}

		var rendorview = function(data) {
			require(['text!module/tpl/doctor-view.tpl','lib/jquery.base64'],function(tpl){

				//data.Description = $.base64.atob(data.Description, true, 'unicode');
				rendorHtml.rendor(_layoutMain,tpl,data)
					.then(function(){
						properties.load();
						loadImage.load(_imgload);
					})
					.then(addEvent())
			})
		}

		return {
			listPanel:listPanel,
			viewPanel:viewPanel
		}

	}	

	return {
		show: show,
		jumpClick: jumpClick,
		inquiryClick: inquiryClick,
		hideOption: hideOption,
		showOption: showOption,
	};
});
