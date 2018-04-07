/*
* @Author felix
* @CreateTime 2017 / 2 /14
* @Version 1.0
* @Since 1.0
*/

define([
	'module/js/doctor',
	'tool',
	'util',
	'pdapi',
	'rendorHtml',
	'Session',
	'properties',
	], 
	function(doctor,Tool,util,API,rendorHtml,Session,properties) {
		var _app				= 'doctor';
		var layout_doctor		= _app+'-doctor';
		var _defrows = 20;
		
		var index = function(page,rows) {
			page = page || 1;
			rows = rows || _defrows;
			
			rendorHtml.layout.insert('wrapper','div',layout_doctor);
		
			//翻页
			var Doctor = new API.Doctor(Session.get('user').token);
			Doctor.getTotalCount()
				.then(function(ret){
					guide.init(layout_doctor,{'nownum':page,'total':Math.ceil(ret/rows)});
					guide.click(function(mid){
						location.hash = _app+'/index/'+mid;
					})					
				})	

			//医生列表
			doctor.hideOption();
			doctor.show(layout_doctor).listPanel({'page':page,"rows":rows});
			doctor.jumpClick(function(mid){
				location.hash = _app+'/view/'+mid;
			});
		}

		var doctorview = function(parm) {
			rendorHtml.layout.insert('wrapper','div',layout_doctor);
			doctor.hideOption();
			doctor.show(layout_doctor).viewPanel(parm);
			doctor.inquiryClick(function(mid){
				location.hash = _app+'/insert/'+mid;
			});
		}



		var init = function(page,parm) {
			var page	 = page || 'index';
			
			rendorHtml.clear('wrapper');
		
			switch(page) {
				case 'index':
					var parm	 = parm || 1;
					index(parm);
				break
				case 'view':
					var parm	 = parm || 0;
					doctorview(parm);
				break
			}
		}

		return {
			init: init
		};
	}
);
