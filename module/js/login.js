
//定义了一个模块。
define(['wxapi','pdapi','tool','Session'],function(WXAPI,PDAPI,Tool,Session){
	var getUserInfo = function(){
		return new Promise(function(resolve, reject) {
			var _res = {'wxinfo	':{},'user':{}};
			
			/*测试*/
			var token = '';
			PDAPI.Login('Test_123','123456')
			.then(function(ret){
				token=ret.access_token;
				var res={};
				res.id = 1;
				res.token = token;
				res.name = 'felix';
				_res['user']	= res;
				return resolve(_res);
			},function(ret){
				console.log(ret);
				return resolve(_res);
			});
			/*
			if(Tool.GetQueryString('code') !='' && Tool.GetQueryString('state') =='PD')
			{
				WXAPI.access_token(Tool.GetQueryString('code'))
					.then(function(res){
						_res['wxinfo']['openid']	= res.openid;
						_res['wxinfo']['code']		= Tool.GetQueryString('code');
					});
				
				PDAPI.getUserInfo_byopenid(_res.openid)
					.then(function(res){
						_res['user']	= res;
					});

				//return _res;
				return resolve(_res);
			}
			
			if(Tool.GetQueryString('username') !='' && Tool.GetQueryString('ticket') !='' && Tool.GetQueryString('state') =='App')
			{
				PDAPI.getUserInfo(Tool.GetQueryString('username'),Tool.GetQueryString('ticket'))
					.then(function(res){
						_res['user']	= res;
					});
				//return _res;
				return resolve(_res);
			}
			
			if(!Tool.isNull(Session.get('user').id))
			{
				//return Session.get('user');
				return resolve(Session.get('user'));
			}else{
				//WXAPI.authorize();
			}
			*/
		});
	}
	

	return {
		getUserInfo:getUserInfo

	};
});

	
