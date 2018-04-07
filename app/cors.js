/*
* @Author felix
* @CreateTime 2017 / 1 /01
* @Version 1.0
* @Since 1.0
*/

define([
	'properties',
	'Session',
	'pdapi',
	], 
	function(properties,Session,API) {
		
		var getUserInfo = function(user_name,ticket) {
			return new Promise(function(resolve, reject) {
				API.getUserInfo(user_name,ticket)
					.then(function(res){
						Session.set('user',res);
						resolve();
					})
			})
			
		}

		return {
			getUserInfo: getUserInfo
		};
	}
);
