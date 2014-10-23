var willHide = false;
var createWDTip = singleton( function(){
	var tip = $(['<div id="tipDiv" class="tip-yellowsimple"  style="display:none;visibility: inherit; opacity: 1;">',
					'<div id="tipTitle" class="tip-inner tip-bg-image"></div>',
					'<div class="tip-arrow tip-arrow-top"  style="visibility: inherit;"></div>',
					'</div>'].join('')).appendTo(document.body);
	tip.hover(function() {
		willHide = false;
	}, function() {
		willHide = true;
		hideAfterTime();
	});
	return tip;
});
function hideAfterTime(hideTimeout){
	setTimeout(hideTip,hideTimeout||1000);
}

function hideTip(){
	if(willHide){
		createWDTip().hide(300);
	}
}

(function($) {
	
	$.fn.showTip = function(options) {
		willHide = false;
		var opts = $.extend({}, $.fn.showTip.defaults, options);
		
		var thisObj = $(this),
		title = opts.content?opts.content:thisObj.attr('title');

		var dragonTip = createWDTip();
		var dragonTipinner = dragonTip.find('div.tip-inner');
		if(thisObj.attr('type') == 'hidden'){
			thisObj = thisObj.parent();
		}
		var offY =thisObj.offset().top,
		offX =thisObj.offset().left,
		divWidth = thisObj.width(),
		divHeight = thisObj.height();
		dragonTipinner.html(title);
		var tipWidth;
		if(title.length <5 ){
			//50为最小宽度
			tipWidth = 50;
		} else if(title.length >25){
			//300为最大宽度
			tipWidth = 300;
		} else {
			//字体12磅，一个字12px
			tipWidth = title.length *12;
		}
		dragonTip.css({left: offX+divWidth/2-tipWidth/2, top: offY+divHeight+10});
		dragonTip.show(opts.showTimeout);
		if(opts.autoHide){
			hideAfterTime(opts.hideTimeout);
		}
		
	};

	$.fn.hideTip = function() {
		willHide = true;
		hideAfterTime();
	};

	$.fn.showTip.defaults = {
		tipSelector : '#tipDiv',
		autoHide:true,
		content : '',
		className : 'tip-yellow',
		showTimeout : 500,
		hideTimeout : 3000
	};

})(jQuery);
