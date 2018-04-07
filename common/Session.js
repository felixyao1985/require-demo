/*
* @Author felix
* @CreateTime 2017 / 2 /09
* @Version 1.0
* @Since 1.0
* @description Session设定
*/
define(['tool','q'],function(Tool,q){
	var start = function(){
		window.Session = {page:{},user:{}};
		return new Promise(function(resolve, reject) {
			resolve();
		});
	}


	var remove = function(key){
		delete window.Session[key];
	}

	var set = function(key,val){
		
		window.Session[key] = val;
	}

	var get = function(key){
		if(Tool.isUndefined(window.Session,key))
		{
			return null;
		}else{
			return window.Session[key];
		}
	}

	var getuser = function(){
		return get('user');
	}

	var checkpage = function(key){
		if(Tool.isUndefined(window.Session.page,key))
		{
			delete window.Session.page[key];
			window.Session.page[key] = {};
			return false;
		}else{
			return true;
		}
	}
	/*
	var setpage = function(key,val){
		if(Tool.isUndefined(window.Session),'page')window.Session['page'] = {};
		window.Session.page[key] = val;
	}

	var getpage = function(key){
		if(Tool.isUndefined(window.Session.page),key)
		{
			return {};
		}else{
			rreturn window.Session.page[key];
		}
		
	}
	*/

	return {
		start:start,
		set:set,
		get:get,
		getuser:getuser,
		remove:remove,
		checkpage:checkpage,

	};
});

	
