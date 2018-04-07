/*
* @Author felix
* @CreateTime 2017 / 2 /09
* @Version 1.0
* @Since 1.0
* @description 前端路由
*/
define(['Session'],function(Session){

	var removecssfile = function(id){ 
		//判断文件类型 
		var targetelement= "link"; 
		var allsuspects=document.getElementsByTagName(targetelement); 
		//遍历元素， 并删除匹配的元素 
		for (var i=allsuspects.length; i>=0; i--) { 
			if (allsuspects[i] && allsuspects[i].getAttribute('id')!=null && allsuspects[i].getAttribute('id')!=id) {
				allsuspects[i].parentNode.removeChild(allsuspects[i]); 
			}
		} 
	} 

	var AppView = {
		navchange:function(L){
			Session.checkpage(L);
			
			var a;
			if(a=$('nav a.active'))
				a.className='';
			if(a=$('nav a[href="#'+L+'"]'))
				a.className='active';
		},
		start:function(){
			Q.reg('error',function(){
				$('#wrapper').html("链接错误。。。。");
			});

			Q.reg('test',function(page){
				require(['app/test'],function(test){
					test.init(1);
				})
			});


			Q.init({
				key:'',
				pop:this.navchange,
				index:'test'/* 默认 */
			});
		}
	}

	return AppView;
});

	
