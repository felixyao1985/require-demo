//定义了一个模块。
define(['tool'],function(Tool){
	var _redirect_uri		= Tool.UrlEncode(window.location.href);
	var _appid				= 'wx6b1db0bf118a9728';
	var _state				= 'PD';
	var _api_url			= 'https://api.weixin.qq.com/sns/oauth2/';
	var _open_url			= 'https://open.weixin.qq.com/connect/oauth2/';
	var _secret				= 'd4624c36b6795d1d99dcf0547af5443d';

	var authorize = function() {
		window.location.href =_open_url+'authorize?appid='+_appid+'&redirect_uri='+_redirect_uri+'&response_type=code&scope=snsapi_userinfo&state='+_state+'#wechat_redirect';
	}

	var access_token = function(code) {
		var askurl = _api_url+'access_token?appid='+_appid+'&secret='+_secret+'&code='+code+'&grant_type=authorization_code';


		return new Promise(function(resolve, reject) {
			/*
			$.ajax({url: askurl, type: 'GET', async:false, data: { code: 'code' }, dataType: "json", success: function(r){
				resolve(r);
			}});
			*/
			var r = {'openid':'313712791'};
			resolve(r);
		})
	}


	return {
		authorize:authorize,
		access_token:access_token
	};
});

	
