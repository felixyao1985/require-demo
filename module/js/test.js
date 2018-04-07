//定义了一个模块。
define([
	'tool',
	'formValidator',
	'rendorHtml',
	'Session',
	'properties',
	'pdapi',
	'css!module/css/test.css'],function(Tool,formValidator,rendorHtml,Session,properties,API){

	var _target = null;
	var _doc = document;
	var _docEl = _doc.documentElement;

	var resize = function() {
		$(".slices").css("line-height",$(".slices").outerHeight() + "px");
	};
	var recalc = function (){
		var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
		window.addEventListener(resizeEvt, resize, false);
		_doc.addEventListener('DOMContentLoaded', resize, false);
	};




	var showPanel = function(act) {
		
		var $slices  = $(".slices");
		var $btnNext = $("#btnNext");
		var $btnPrev = $("#btnPrev");
		var $btnSend = $("#btnSend");
		var $thisBlock = $slices.children('div:visible');
		
		if(act == 'Next' && !$thisBlock.is(":last"))
		{
			$thisBlock.hide();
			$thisBlock.next().show();	
			$btnPrev.show();
		}else if(act == 'Prev' && !$thisBlock.is(":first")){
			$thisBlock.hide();
			$thisBlock.prev().show();
			$btnNext.show();
			$btnSend.hide();
		}
		
		if($slices.children('div:visible').next().is(":last"))
		{
			$btnNext.hide();
			$btnPrev.show();
			$btnSend.show();
		}

		if($slices.children('div:visible').prev().is(":first"))
		{
			$btnNext.show();
			$btnPrev.hide();
		}
	}


	var nextClick = function() {
		var $btnNext = $("#btnNext");

		$btnNext.click( function () {
			if(checkForm())showPanel('Next');
		});
		
	}
	
	var prevClick = function() {
		var $btnPrev = $("#btnPrev");
		$btnPrev.click( function () { 
			showPanel('Prev');
		});
	}

	var sendClick = function() {
		var $btnSend = $("#btnSend");
		$btnSend.click( function () { 
			sendData();
		});
	}

	var sendData = function() {
		if(formValidator.pageCheck('test'))
		{
			API.putPatientBasic()
				.then(function(r) {
					sendSuccessPanel(r);
				})
				.catch(function(error) { console.log(error) });
		}
	}

	var checkForm = function() {
		return formValidator.pageCheck($(".slices").children('div:visible').attr('id'));
	}

	var inputkeyup = function() {
		
		Tool.setOnlyInputNum($("#txtPhone"));
		
		$("#txtName").keyup( function () { 
			$("#spanName").text($(this).val());
		});

		$("#txtIDCard").keyup( function () { 
			var res = formValidator.checkCardId($(this).val());
			if(res){
				$("#spanIDCard").text($(this).val());
				$("#spanSex").text(res.sex);
				$("#spanBirthday").text(res.year+'-'+res.month+'-'+res.day);
			}
		});

		$("#txtPhone").keyup( function () { 
			$("#spanPhone").text($(this).val());
		});

		formValidator.addCheck("txtName",'Exist');
		formValidator.addCheck("txtIDCard",'Exist');
		formValidator.addCheck("txtIDCard",'IDCard');
		formValidator.addCheck("txtPhone",'Exist');
	}

	var addEvent = function() {
		nextClick();
		prevClick();
		sendClick();
		inputkeyup();
	}

	var patient1stPanel = function() {
		
		var data = {};
		data.nextClick = function(t){
			console.log(t)
			$(t).click( function () { 
				alert(11)
			});
			
				
		}
		require(['text!module/tpl/test.tpl'],function(tpl){
			rendorHtml.rendor(_target,tpl,data)
				.then(function(){
					recalc();
					resize();
					properties.load(_target);

				})
				.then(addEvent());
		})
	}

	var sendSuccessPanel = function(data) {
		/*
		var data = {};
		$("#wrapper").text("patient1stPanel start");
		require(['text!module/tpl/patientreg.tpl'],function(tpl){
			rendorHtml.rendor(_target,tpl,data)
				.then(function(){
					recalc();
					resize();
					properties.load();
				})
				.then(addEvent());
		})
		*/
		console.log(data);
		$("#wrapper").text("假装已经提交成功");
	}


	var render = function(target) {
		_target = target;
		patient1stPanel(this);
	}

	return {
		render: render
	};
});
