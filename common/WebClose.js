/*
* @Author felix
* @CreateTime 2017 / 2 /09
* @Version 1.0
* @Since 1.0
* @description 页面关闭监听
*/
define(function(){
//window.open("http://test.icloudcare.com/pdweb/index.html?code=dddd&scope=snsapi_userinfo&state=PD#home");
	//var onClose = function(){};
	//启用监听浏览器刷新、关闭的方法
	var set = function(fun){
	  var dd = 1;
	  window.onbeforeunload = function(e){
		dd = $("#home-searchbtnSearch").text(); 
		$.ajax({url: 'http://test.icloudcare.com/control/ajax/basic.html?job=post', type: 'GET', async:false, data: { act: 'postCity' }, dataType: "json", success: function(r){ 
			$.ajax({url: 'http://test.icloudcare.com/control/ajax/basic.html?job=post', type: 'GET', async:false, data: { act: 'postCity2' }, dataType: "json", success: function(r){ 
				$.ajax({url: 'http://test.icloudcare.com/control/ajax/basic.html?job=post', type: 'GET', async:false, data: { act: 'postCity' }, dataType: "json", success: function(r){ 
					$.ajax({url: 'http://test.icloudcare.com/control/ajax/basic.html?job=post', type: 'GET', async:false, data: { act: 'postCity2' }, dataType: "json", success: function(r){ 
					
					}});
				}});			
			}});
		}});



	  }
	  window.onunload = function(){
		window.open("http://test.icloudcare.com/pdweb/index.html?code=dddd&scope=snsapi_userinfo&state=PD#home"+dd);
	  }
	}
	//关闭监听浏览器刷新、关闭的方法
	var clear = function(){
	  window.onbeforeunload = function(){};
	}
	
	return {
		set: set,
		clear: clear,
	};
});
