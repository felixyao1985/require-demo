/*
* @Author felix
* @CreateTime 2017 / 1 /01
* @Version 1.0
* @Since 1.0
* @description 首页容器
*/

define([
	'module/js/test',
	'util',
	'tool',
	'rendorHtml',
	'layout',
	'Session',
	], 
	function(test,util,Tool,rendorHtml,layout,Session) {
		

		var layoutID = 'layouttest';


		var init = function(page) {

			rendorHtml.clear('wrapper');
			layout.insert('wrapper','div',layoutID,'clearfix bg-color');
			
			var promise = new Promise(function(resolve, reject) {
				test.render(layoutID);
				resolve();
			})
			
		}

		return {
			init: init
		};
	}
);
