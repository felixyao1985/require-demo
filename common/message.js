
//定义了一个模块。
define(['util'],function(util){
	var _block			= 'popup-container';
	var _popupoverlay	= 'popup-overlay';
	var _overlayColor	= '#333';
	var _overlayOpacity= .8;

    var onOk = function () {
        return new Promise(function(resolve, reject) {
            $("#"+_block).fadeOut("slow",function(){
                _hide();
                resolve();
            });
        });
    }

	//清除页面元素
	var _hide = function() {
		$("#"+_block).remove();
		_overlay('hide');
		_maintainPosition(false);
	}
	
	//遮罩
	var _overlay = function(status) {
		switch( status ) {
			case 'show':
				_overlay('hide');
				$("BODY").append('<div id="'+_popupoverlay+'"></div>');
				$("#"+_popupoverlay).css({
					position: 'absolute',
					zIndex: 99998,
					top: '0px',
					left: '0px',
					width: '100%',
					height: '100%',
					background: _overlayColor,
					opacity: _overlayOpacity
				});
					//$(document).height()
			break;
			case 'hide':
				$("#"+_popupoverlay).remove();
			break;
		}
	}

	//页面resize变化事件绑定于解除
	var _maintainPosition = function(status) {
		switch(status) {
			case true:
				$(window).bind('resize',_reposition);
			break;
			case false:
				$(window).unbind('resize',_reposition);
			break;
		}
	}
	
	//resize 响应
	var _reposition = function() {
		$("#popup_overlay").height( $(document).height() );
	}

	var _show = function(type,title,msg){
		_hide();
		_overlay('show');
		
		


		$("BODY").append(
		  '<div id="'+_block+'">' +
				'<h1 id="'+_block+'-title"></h1>' +
				'<div id="'+_block+'-content">' +
				  	'<div id="'+_block+'-msg"></div>' +
				'</div>' +
		  '</div>');

		switch(type) {
			case 'dialog':
			 	$("#"+_block).append('<div id="'+_block+'-footer" style="padding: 15px;display: none; text-align: center">' +
          				'<span class="ok" style="color: #4b9aea;font-size: 1.2rem;">'+util.string.OK+'</span>'+
		  		'</div>')
			break;
			default:
				
			break;
		}

		// IE6 Fix
		var pos = ($.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed'; 

		$("#"+_block).css({
			'position': pos,
			'z-index': '99999',
			'margin': '0px 0px 0px -40%',
			'top': '1rem',
			'left': '50%',
			'width': '80%',
			'background-color': '#ffffff',
		});
		
		$("#"+_block+"-content").css({
			'height': '6rem',
			'line-height': '6rem',
		});

		$("#"+_block+"-title").css({
			  'font-size': '1rem',
			  height: '1.5rem',
			  margin: 0,
			  padding:0,
			  'text-align':'center',
			  'padding': '15px 0',
			  'border-bottom': '1px solid #e5e5e5',
		});

		$("#"+_block+"-msg").css({
			  'font-size': '1.2rem',
			  'text-align':'center',
			  'color': '#000000',
		});

		$("#"+_block+"-title").text(title);
		$("#"+_block+"-content").addClass(type);
		$("#"+_block+"-msg").text(msg);
		$("#"+_block+"-msg").html( $("#"+_block+"-msg").text().replace(/\n/g, '<br />') );

	}

	var alert = function(title,msg){

		_show('alert',title,msg);

		return new Promise(function(resolve, reject) {
			$("#"+_block).fadeOut("slow",function(){
			   _hide();
			   resolve();
			});
		});
	}

	var dialog = function (title, msg,cb) {
        _show('dialog',title,msg);
        $('#'+_block+' .ok').click(function () {
            onOk().then(function(){
				if (typeof cb == 'function')cb();
			});
        });
        $('#'+_block+'-footer').show();
    }

	var error = function(title,msg){
		_show('error',title,msg);
		return new Promise(function(resolve, reject) {
			$("#"+_block).fadeOut("slow",function(){
			   _hide();
			   resolve();
			});
		});
	}

	return {
		alert:alert,
		error:error,
		dialog: dialog,

	};
});

	
