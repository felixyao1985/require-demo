/*
* @Author felix
* @CreateTime 2017 / 1 /20
* @Version 1.0
* @Since 1.0
* @description PD数据接口
*/
define(['tool'],function(Tool) {
	var _url = "http://139.196.24.63:8082/";
	/*
	* @description 跨域ajax请求
	* @pram 
		type	请求类型
		url     请求链接
		data    发送数据
		headers	头文件数据
	*/
	var _ajax = function(type,url,data,headers) {
		var type	= type || 'GET';
		var headers = headers || {};
		var data	= data || {};

		return new Promise(function(resolve, reject) {
			$.ajax(url, {
				type: type,
				xhrFields: {
					withCredentials: true,
					useDefaultXhrHeader: false
				},
				data: data,
				headers:headers,
				dataType:'json',
				crossDomain: true,
				error:function(XMLHttpRequest, textStatus, errorThrown) {
					console.log(XMLHttpRequest);
					reject(textStatus);
				},
				success: function(data, status, xhr) {
					
					resolve(data);
				}
			});
		})
	}

	/*
	* @description 获取用户信息
	* @pram 
		token
	*/
	var getUserInfo = function(token) {
		var headers = {};
		headers.Authorization = 'Bearer '+token;
		var url		= _url+'api/Account/UserInfo';
		return _ajax('GET',url,{},headers);
	}

	/*
	* @description 登录
	* @pram 
		user_name 用户名
		password  密码
	*/
	var Login = function(user_name,password) {
		var data = {
			grant_type: 'password',
			username: user_name,
			password: password
		};
		return _ajax('POST',_url+"/Token",data);
	}


	var getUserInfo_byopenid = function(openid) {
		return new Promise(function(resolve, reject) {
			var r = {'PatientID':'313712791','Name':"felix",'status':"等待验证",'token':'假装有ticket'}
			resolve(r);
		})
	}
	

	/*
	* @description 医生信息
	* @pram 
		token
	*/
	var Doctor = function(token) {
		
		var _this			= this;
		_this.headers		= {};
		_this.headers.Authorization = 'Bearer '+token;
		_this.url		= _url+'api/Doctor';
		
		/*
		* @description 通过自定义检索获取相关的知识库条目
		* @pram 
			page			当前页
			rows			每页显示的行数
			queryName      模糊查询 姓名/医院科室

		*/
		var getList = function(page,rows,queryName) {
			var url			= _this.url+'/QueryData';
			var _page		= page || 1;
			var _rows		= rows || 10;
			var _queryName	= queryName ||'';

			var data		= {'page':_page,'rows':_rows,'queryName':_queryName};
			return new Promise(function(resolve, reject) {
				_ajax('GET',url,data,_this.headers)
				.then(function(ret){
					resolve(ret);
				},function(ret){
					throw new Error('Doctor list');
				})
			})
		}

		/*
		* @description 根据ID获取医生信息
		* @pram 
			id
		*/
		var getView = function(id) {
			var url		= _this.url;
			var data		= {'id':id};
			return new Promise(function(resolve, reject) {
				_ajax('GET',url,data,_this.headers)
				.then(function(ret){
					resolve(ret);
				},function(ret){
					throw new Error('Doctor getView');
				})
			})
		}

		/*
		* @description 获取总数
		* @pram 
			queryName      模糊查询 姓名/医院科室

		*/
		var getTotalCount = function(queryName) {
			var url			= _this.url+'/QueryData';
			var _queryName	= queryName ||'';
			var data		= {'page':1,'rows':1,'queryName':_queryName};
			return new Promise(function(resolve, reject) {
				_ajax('GET',url,data,_this.headers)
				.then(function(ret){
					var TotalCount = ret.TotalCount || 0;
					resolve(TotalCount);
				},function(ret){
					throw new Error('TotalCount');
				})
			})
		}

		return {
			getList:getList,
			getView:getView,
			getTotalCount:getTotalCount,
		};
	}

	return {
		Login:Login,
		getUserInfo:getUserInfo,
		getUserInfo_byopenid:getUserInfo_byopenid,
		Doctor:Doctor,
	};
});

	
