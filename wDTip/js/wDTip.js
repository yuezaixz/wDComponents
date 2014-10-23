//倒数隐藏标志位，无改变该状态为false，指定延迟后即将隐藏
var willHide = false;
//气泡框单例，基于dWUtil.js的单例方法
var createWDTip = singleton( function(){
	var tip = $(['<div id="tipDiv" class="tip-yellowsimple"  style="display:none;visibility: inherit; opacity: 1;">',
					'<div id="tipTitle" class="tip-inner tip-bg-image"></div>',
					'<div class="tip-arrow"  style="visibility: inherit;"></div>',
					'</div>'].join('')).appendTo(document.body);
	tip.hover(function() {
		willHide = false;
	}, function() {
		willHide = true;
		_hideAfterTime();
	});
	return tip;
});
//延迟隐藏函数
function _hideAfterTime(hideTimeout){
	setTimeout(_hideTip,hideTimeout||1000);
}
//标志位为true则隐藏，该方法不对外开放
function _hideTip(){
	if(willHide){
		createWDTip().hide(300);
	}
}

(function($) {
	
	$.fn.showTip = function(options) {
		//不降隐藏
		willHide = false;
		var opts = $.extend({}, $.fn.showTip.defaults, options);
		var thisObj = $(this),
		title = opts.content?opts.content:thisObj.attr('title');
		var dragonTip = createWDTip();
		//设置内容区
		var dragonTipinner = dragonTip.find('div.tip-inner');
		dragonTipinner.html(title);
		//设置箭头的位置
		var dragonArrow = dragonTip.find('div.tip-arrow');
		dragonArrow.addClass('tip-arrow-'+opts.position);
		//防止弹出的对象为隐藏对象，那么则以其父对象为基准来弹出气泡。主要用于自动验证表单的操作
		if(thisObj.attr('type') == 'hidden'){
			thisObj = thisObj.parent();
		}
		//以下代码争对top方式的position进行
		var offY =thisObj.offset().top,
		offX =thisObj.offset().left,
		divWidth = thisObj.width(),
		divHeight = thisObj.height(),
		tipWidth = dragonTip.width();
		
		offX = offX+divWidth/2-tipWidth/2;
		offY = offY+divHeight+10;
		//left，不让ToolTip提示框超出浏览器
		// alert(offX)
		if(offX + tipWidth > document.body.clientWidth){
			offX = document.body.clientWidth - tipWidth-5;
		}
		if (offX < 5) offX = 5;
		//alert(thisObj.offset().left+","+thisObj.width()/2)
		dragonArrow.css({left:thisObj.offset().left+thisObj.width()/2-offX});
		dragonTip.css({left: offX , top: offY });
		dragonTip.show(opts.showTimeout);
		if(opts.autoHide){
			setTimeout(function(){createWDTip().hide(300);}, opts.hideTimeout);
		}
		
	};

	$.fn.hideTip = function() {
		willHide = true;
		_hideAfterTime();
	};

	$.fn.showTip.defaults = {
		position:'top',//暂时只支持top
		autoHide:false,
		content : '',
		className : 'tip-yellow',//暂不支持
		showTimeout : 500,
		hideTimeout : 3000
	};

})(jQuery);
$(function(){
	$('.dWtip').each(function() {
		var each = $(this);
		var content = each.data('content'),
		trigger = each.data('trigger'),
		autoHide = each.data('autohide'),
		showTimeout = each.data('showtime'),
		hideTimeout = each.data('hidetime');
		var options= {};
		if(!content) return;
		options['content'] = content;
		if (autoHide) options['autoHide'] = autoHide;
		if (showTimeout) options['showTimeout'] = showTimeout;
		if (hideTimeout) options['hideTimeout'] = hideTimeout;
		if(!trigger || trigger === 'mouseover'){
			each.hover(
				function () {
					each.showTip(options);
				},
				function () {
					each.hideTip();
				}
			);
		} else{
			each[trigger](function(){each.showTip(options);});
		}
	});
});