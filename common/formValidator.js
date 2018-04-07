//定义了一个模块。
define(function(){
	var _regexEnum =  {
		intege:"^-?[1-9]\\d*$",					//整数
		intege1:"^[1-9]\\d*$",					//正整数
		intege2:"^-[1-9]\\d*$",					//负整数
		num:"^([+-]?)\\d*\\.?\\d+$",			//数字
		num1:"^[1-9]\\d*|0$",					//正数（正整数 + 0）
		num2:"^-[1-9]\\d*|0$",					//负数（负整数 + 0）
		decmal:"^([+-]?)\\d*\\.\\d+$",			//浮点数
		decmal1:"^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$",　　	//正浮点数
		decmal2:"^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$",　 //负浮点数
		decmal3:"^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$",　 //浮点数
		decmal4:"^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$",　　 //非负浮点数（正浮点数 + 0）
		decmal5:"^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$",　　//非正浮点数（负浮点数 + 0）
		email:"^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
		color:"^[a-fA-F0-9]{6}$",				//颜色
		url:"^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$",	//url
		chinese:"^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$",					//仅中文
		ascii:"^[\\x00-\\xFF]+$",				//仅ACSII字符
		zipcode:"^\\d{6}$",						//邮编
		mobile:"^(13|15)[0-9]{9}$",				//移动电话
		ip4:"^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$",	//ip地址
		notempty:"^\\S+$",						//非空
		picture:"(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$",	//图片
		rar:"(.*)\\.(rar|zip|7zip|tgz)$",								//压缩文件
		date:"^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$",					//日期
		qq:"^[1-9]*[1-9][0-9]*$",				//QQ号码
		tel:"^(([0\\+]\\d{2,3}-)?(0\\d{2,3})-)?(\\d{7,8})(-(\\d{3,}))?$",	//固定电话号码的函数(包括验证国内区号,国际区号,分机号)
		username:"^\\w+$",						//用来用户注册。匹配由数字、26个英文字母或者下划线组成的字符串
		letter:"^[A-Za-z]+$",					//字母
		letter_u:"^[A-Z]+$",					//大写字母
		letter_l:"^[a-z]+$",					//小写字母
		idcard:"^[1-9]([0-9]{14}|[0-9]{17})$"	//身份证
	}

	var _checkList = [];

	//短日期，形如 (2003-12-05)
	var isDate = function (str){
		var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/); 
		if(r==null)return false; 
		var d= new Date(r[1], r[3]-1, r[4]); 
		return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);
	}

	//正浮点数
	var isDecmal = function (str){
		return regexValid(str,'decmal1');
	}

	//正整数
	var isIntege = function (str){
		return regexValid(str,'intege1');
	}

	var isExist = function (str){
		return regexValid(str,'notempty');
	}

	//短时间，形如 (13:04:06)
	var isTime = function (str) {
		var a = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
		if (a == null) {return false}
		if (a[1]>24 || a[3]>60 || a[4]>60)
		{
			return false;
		}
		return true;
	}

	//短日期，形如 (2003-12-05)
	var isDate = function (str){
		var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/); 
		if(r==null)return false; 
		var d= new Date(r[1], r[3]-1, r[4]); 
		return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);
	}

	//长时间，形如 (2003-12-05 13:04:06)
	var isDateTime = function (str) {
		var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/; 
		var r = str.match(reg); 
		if(r==null) return false; 
		var d= new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7]); 
		return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]&&d.getHours()==r[5]&&d.getMinutes()==r[6]&&d.getSeconds()==r[7]);
	}

	//身份证
	var checkCardId = function(socialNo) {  
	  
		if(socialNo == "") {  
			return false;  
		}  

		if (socialNo.length != 15 && socialNo.length != 18) {   
			return false;  
		}  
		/*  
		var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};   
		 
		if(area[parseInt(socialNo.substr(0,2))]==null) {  
		alert("身份证号码不正确(地区非法)!");  
			return false;  
		}  
		*/
		
		var res = {year:'',month:'',day:'',sex:''}
		if(socialNo.length == 18) {

			var month = socialNo.substr(10,2);  
			var day = parseInt(socialNo.substr(12,2));  
			var birth = parseInt(socialNo.substr(6,4)); 
			var sex = parseInt(socialNo.substring(17, 1),10) % 2 ? "男" : "女";; 
			res = {year:birth,month:month,day:day,sex:sex};
			switch(month) {  
				case '01':  
				case '03':  
				case '05':  
				case '07':  
				case '08':  
				case '10':  
				case '12':  
					if(day>31||day==0) {  
						return false;  
					}  
					break;  
				case '04':  
				case '06':  
				case '09':  
				case '11':  
					if(day>30||day==0) {  
						return false;  
					}  
					break;  
				case '02':  
					if((birth % 4 == 0 && birth % 100 != 0) || birth % 400 == 0) {  
						if(day>29) {  
							return false;  
						}  
					} else {  
						if(day>28) {  
							return false;  
						}  
					}  
					break;  
				default:  
					return false;  
			}  

			return res;  
		}
			  
		var Wi = new Array(  
				7,9,10,5,8,4,2,1,6,  
				3,7,9,10,5,8,4,2,1  
				);  
		var   lSum        = 0;  
		var   nNum        = 0;  
		var   nCheckSum   = 0;  

		for (i = 0; i < 17; ++i) {  
			if ( socialNo.charAt(i) < '0' || socialNo.charAt(i) > '9' ) {  
				return false;  
			} else {  
				nNum = socialNo.charAt(i) - '0';  
			}  
			lSum += nNum * Wi[i];  
		}  


		if( socialNo.charAt(17) == 'X' || socialNo.charAt(17) == 'x') {  
			lSum += 10*Wi[17];  
		} else if ( socialNo.charAt(17) < '0' || socialNo.charAt(17) > '9' )  
		{  
			return false;  
		} else  
		{  
			lSum += ( socialNo.charAt(17) - '0' ) * Wi[17];  
		}  

		  
		  
		if ( (lSum % 11) == 1 )  
		{  
			return res;  
		} else {  
			return false;  
		}  
	} 

	var isNull = function (arg1) {
		return !arg1 && arg1!==0 && typeof arg1!=="boolean"?true:false;
	}
	
	var addCheck = function(id,type,msg,cb) {
		var cb	= cb || function(){};
		var msg = msg || '';
		var checkItem = {'id':id,'type':type,'msg':msg,'cb':cb,'enabled':true};
		_checkList.push(checkItem);
	}

	var clear = function() {
		_checkList = [];
	}

	var pageCheck = function (id) {
		var $block = $("#"+id);
		var flag = true;

		for(var i=0;i<_checkList.length;i++){
			var item = _checkList[i];
			var $obj  = $block.find("#"+item.id);
			if($block.find("#"+item.id).size()>0)
			{
				switch(item.type) {
					case 'Exist':
						if(!checkExist($obj)) flag = false;
					break;
					case 'Mobile':
						var check =  regexValid($obj.val(),'mobile');

						if(check)
						{	
							 $obj.removeClass('error');
						}else{	
							 $obj.addClass('error');
							 flag = false;
						}

					break;
					case 'intege1':
						var check =  regexValid($obj.val(),'intege1');

						if(check)
						{	
							 $obj.removeClass('error');
						}else{	
							 $obj.addClass('error');
							 flag = false;
						}

					break;
					case 'decmal1':
						var check =  regexValid($obj.val(),'decmal1');

						if(check)
						{	
							 $obj.removeClass('error');
						}else{	
							 $obj.addClass('error');
							 flag = false;
						}

					break;
					case 'IDCard':
						var check = checkCardId($obj.val());
						if(check)
						{	
							 $obj.removeClass('error');
						}else{	
							 $obj.addClass('error');
							 flag = false;
						}
					break;
				}
			}
		}
		return flag
	}

	var regexValid = function(val,regexp) {
		var regexpress = _regexEnum[regexp];
		if(regexpress==undefined || regexpress=="")return false;
		//console.log(val);
		//console.log((new RegExp(regexpress)).test(val));
		return (new RegExp(regexpress)).test(val);
	}

	var checkExist = function ($elt) {
		var flag = true;
		if($elt.val()!='')
		{	
			 $elt.removeClass('error');
		}else{	
			 $elt.addClass('error');
			 flag = false;
		}

		return flag
	}

	return {
		isTime:isTime,
		isDate:isDate,
		isNull:isNull,
		isExist:isExist,
		isDecmal:isDecmal,
		isIntege:isIntege,
		isDateTime:isDateTime,
		checkCardId:checkCardId,
		checkExist:checkExist,
		addCheck:addCheck,
		pageCheck:pageCheck,
		clear:clear,
	};
});

	
