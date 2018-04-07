require.config({
	//baseUrl: 'lib',  //改变基目录（baseUrl）
	urlArgs: "bust=" +  (new Date()).getTime(),
	paths: {
		"text": "lib/text",
		//"css": "lib/css",
		"q": "lib/q",
		"jquery": "lib/jquery",
		"jquery-transition":"lib/jquery-transition",
		"recalc": "common/recalc",
		"route":"common/route",
		"properties":"common/properties",
		"rendorHtml": "common/rendorHtml",
		"layout": "common/layout",
		"Session": "common/Session",
		"pdapi": "common/pdapi",
		"tool": "common/tool",
		"formValidator": "common/formValidator",
		"util": "common/util/util",
		"message": "common/message",
	},
    map: {
        '*': {
            "css": "lib/css"
        }
    },
	shim:
		{
		'properties': {
			deps: [
				'lib/jquery.i18n.properties',
				'jquery'
			],
			exports: 'properties'
		},
		'route': {
			deps: [
				'q',
				'jquery'
			],
			exports: 'route'
		},
		'rendorHtml': {
			deps: [
				'lib/underscore'
			],
			exports: 'rendorHtml'
		},
	},	
	waitSeconds: 15    
});

require(['Session','route','css!module/css/main.css'], function (Session,route){
	
	document.body.addEventListener('touchstart', function () { }); //移动端触发CSS active效果
	
	Session.start()
		.then(function() {
			//console.log(Session.get('user'));
			$("#wrapper").text("route start");
			route.start();
		});
});