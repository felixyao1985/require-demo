//test
define(['rendorHtml'], function(rendorHtml){
	var target = null;
	var page = null;
	var fun = null;

	var view = function(self,id) {

	}

	var nextClick = function(self) {

	}

	var namePanel = function(self) {
		
		var data = {};
		require(['text!module/tpl/patientreg.tpl'],function(tpl){
			rendorHtml.rendor(target,tpl,data).then(nextClick());
		})
	}
	var onclick = function(self,id) {

	}
	
	var render = function(target,page) {
		var target = target;
		var page = page||'name';
		eval(page+'Panel(this)');
	}

	return {
		render: render
	};
});
