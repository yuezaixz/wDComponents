$(function(){
	var $modals = $(".floatLayer");
	$modals.each(function(index, val) {
		var $modal = $(val);
		$modal.dblclick(function(event) {
			var targetSelector = $modal.data('target');
			var $target = $(targetSelector);
			var $mask = createMask();
			$mask.click(function () {
				$mask.fadeOut(500);
				$target.fadeOut(500);
			});
			$mask.fadeIn(500);

			var offY =$modal.offset().top,
			offX =$modal.offset().left,
			divWidth = $modal.width(),
			divHeight = $modal.height(),
			targetWidth = $target.width(),
			targetHeight = $target.height();

			var targetOffX = offX + divWidth/2 - targetWidth/2;
			var targetOffY = offY + divHeight/2 - targetHeight/2;

			$target.css({
				left: wDUtil.toPInt(targetOffX),
				top: wDUtil.toPInt(targetOffY),
				'z-index':1001
			});
			$target.fadeIn(500);
		});
	});

});