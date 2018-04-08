### 基于require脚手架设计

###### 前端模块化编程是现在大趋势。不同于reactjs，angularjs，vue等前端框架有一定的学习成本，requirejs的学习成本很低，仅用来管理模块，并且可以与任意其他前端框架结合使用。适用于小型单页项目。

# 模块的异步加载

require.js加载的模块，采用AMD规范。也就是说，模块必须按照AMD的规定来写。
Test.js:
```javascript
    　　define(function (){
    　　　　var add = function (x,y){
    　　　　　　return x+y;
    　　　　};
    　　　　return {
    　　　　　　add: add
    　　　　};
    　　});
```
加载方式
```javascript
    　　require(['test'], function (test){
    　　　　alert(test.add(1,1));
    　　});
```
# 脚手架目录结构
- index.html 主页面
- main.js  主程序
- lib 第三方库
	-css [CSS文件导入工具]
	-jquery 	[jquery库]
	-jquery.i18n.properties [jquery i18n工具]
	-jquery-transition [动画效果工具库]
	-q [route 控制库]
- commend
	-require [require库]
	-store [本地数据库工具]
	-text [文件读取工具]
	-underscore [JavaScript 工具库]
- commend 公共函数库
	- tool [JS工具]
	- rendorHtml [页面渲染]
	- layout  [页面布局]
	- route [route 控制]
	- properties [i18n]
	- Session [数据BUS]
	- formValidator [表单检查]
	- api [服务器通信接口]
	-  i18n [i18n语言文件目录 语法规则与JAVA一致]
	- util [其他工具类]
- app [layout控制层]
- module
	- css [组件CSS]
	- img [组件图片]
	- js [组件JS ViewModle]
	- model [组件数据bean]
	- tpl [组件HTML页面]
