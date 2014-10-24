var dWUtil = {
	isJson :function(text){
		try {
			var json = eval("("+text+")");
			if (typeof json == 'xml') {
				return false;
			}
			return json;
		} catch(e) {
			return false;
		}
	},
	/**
		获取单例
		fn 需要转换为获取单例的函数
		return 单例函数
	*/
	singleton : function( fn ){
		var result;
		return function(){
			return result || ( result = fn .apply( this, arguments ) );
		};
	},
	/**
		获取光标位置
		ctrl 需要获取光标位置的INPUT元素
		return 偏移位置
	*/
	getCursortPosition : function(ctrl) {
		var CaretPos = 0;
		if (document.selection) {
			ctrl.focus ();
			var Sel = document.selection.createRange ();
			Sel.moveStart ('character', -ctrl.value.length);
			CaretPos = Sel.text.length;
		} else if (ctrl.selectionStart || ctrl.selectionStart == '0')
			CaretPos = ctrl.selectionStart;
		return (CaretPos);
	},
	/**
		设置光标位置
		ctrl 需要改变光标位置的INPUT元素
		pos 偏移位置
	*/
	setCaretPosition : function(ctrl, pos) {
		if (ctrl.setSelectionRange) {
			ctrl.focus();
			ctrl.setSelectionRange(pos, pos);
		} else if (ctrl.createTextRange) {
			var range = ctrl.createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	}
};
