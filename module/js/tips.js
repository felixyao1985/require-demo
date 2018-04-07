/*
* @Author felix
* @CreateTime 2017 / 2 /08
* @Version 1.0
* @Since 1.0
* @description Tips
*/

define([
	'rendorHtml',
	], 
	function(rendorHtml) {
		var _target			= null;
		var _msg			= '';	
		
		var init = function(target,msg,className) {
			_target		= target;
			_msg		= msg || "";
			_className	= className || "top-tips";

			var layout = target+"-tips";

			rendorHtml.layout.insertTop(_target,'div',layout,_className);
			$("#"+layout).css({
				padding:"8px 2%",
				color:"#999999",
				"font-size":"0.8rem",
				"line-height":"0.8rem"
			});

			var setText = function(msg) {
				_msg = msg;
			}

			var rendor = function(){
				$("#"+layout).text(_msg);
			}
			
			return {
				rendor:rendor,
				setText:setText
			}
		}


		return {
			init: init
		};
	}
);
