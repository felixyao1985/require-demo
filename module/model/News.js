
/*
* @Author felix
* @CreateTime 2017 / 2 /20
* @Version 1.0
* @Since 1.0
* @description  新闻 Model
*/

define(function() {
		this._data = {
		  "NewsID": 1,
		  "NewsTitle": "sample string 2",
		  "NewsContent": "sample string 3",
		  "Source": "sample string 4",
		  "Author": "sample string 5",
		  "ViewCount": 6,
		  "Category": "sample string 7",
		  "PublicDate": "2017-02-20T21:27:20.5008237+08:00"
		}

		this.tempdata = {};

		var set = function(data) {
			tempdata = {}
			$.extend(tempdata,_data,data);
		}

		var get = function() {
			return tempdata;
		}

		return {
			set: set,
			get: get
		};
	}
);
