/**
 * date 2014-10-24
 * descript 此js文件为公共js文件包括以下组件, 依赖与jquery库
	1、html5的支持
	2、跨域的问题domain设置
	3、ie6 背景图片修复
	4、Ajax不做缓存
	5、给Function的原型添加了个方法扩展的apply方法
*/

(function(){
	//-----------------------------
	//1、html5的支持
	//-----------------------------
	//该功能去除，通过页面引入

	//-----------------------------
	//2、跨域的问题domain设置
	//-----------------------------
	if($(document).find("script").attr("src").indexOf("WdatePicker.js") < 0){
		if(window.location.href && window.location.href.indexOf("davidApp.com") > 0) {
			document.domain = "davidApp.com";
		}else{
			document.domain = "david.com";
		}
	}
	
	//-----------------------------
	//3、修复ie6图片载入bug
	//-----------------------------
	try{document.execCommand("BackgroundImageCache", false, true);}catch(e){}

	//-----------------------------
	//4、Ajax不做缓存
	//-----------------------------
	$.ajaxSetup ({cache: false});
})();


/**
	5、给Function的原型添加了个方法
	createDelegate（obj，args，appendArgs） obj 来改变function的this，args为传入的参数
*/
Function.prototype.createDelegate = function(obj, args, appendArgs){
	var method = this;
	return function() {
		var callArgs = args || arguments;
		if(appendArgs === true){
			callArgs = Array.prototype.slice.call(arguments, 0);
			callArgs = callArgs.concat(args);
		}else if(typeof appendArgs == "number"){
			callArgs = Array.prototype.slice.call(arguments, 0); // 复制参数
			var applyArgs = [appendArgs, 0].concat(args); // 函数传入参数
			Array.prototype.splice.apply(callArgs, applyArgs);
		}
		return method.apply(obj || window, callArgs);
	};
};

var createMask = wDUtil.singleton( function(){
	var $mask = $("<div id='mask'></div>").addClass("mask");
	$mask.css({
		'color': '#E8E8E8',
		'background-color': '#E8E8E8',
		'position':'absolute',
		'top':'0px',
		'left':'0px',
		'z-index': '1000',
		'filter': 'progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75',
		'opacity':'0.6',
		'width': document.body.clientWidth + document.body.scrollWidth+'px',
		'height': document.body.clientHeight + document.body.scrollHeight+'px',
		})
		.appendTo("body");
	return $mask;
});