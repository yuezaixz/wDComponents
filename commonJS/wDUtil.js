var wDUtil = {
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
		转换成正整数
	*/
	toPInt : function(num){
		return num || 0;
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
	},
	extend : function(subc, superc, overrides) {
		var F = function() {};
		F.prototype=superc.prototype;
		subc.prototype=new F();
		subc.prototype.constructor=subc;
		subc.superclass=superc.prototype;
		if (superc.prototype.constructor == Object.prototype.constructor) {
			superc.prototype.constructor=superc;
		}
		if (overrides) {
			for (var i in overrides) {
				subc.prototype[i]=overrides[i];
			}
		}
	}
};

/**
 * 观察者类
 * 主要用来处理事件机制的
 */
wDUtil.Observer = function() {
	if(!this.listeners) {
		this.listeners = {};
	}
};
wDUtil.Observer.prototype = {
	addEvent :function(event) {
		for(var eventName in event){
			this.listeners[eventName] = new wDUtil.CustomEvent(eventName,this);
		}
	},
	on :function(eventName,fn) {
		if(!this.listeners[eventName]) this.listeners[eventName] = new wDUtil.CustomEvent(eventName,this);
		this.listeners[eventName].on(fn);
	},
	un :function(eventName,fn) {
		return this.listeners[eventName].un(fn);
	},
	fireEvent :function(eventName,args) {
		this.listeners[eventName].fire(args);
	},
	unsubscribeAll :function() {
		this.listeners[eventName].unsubscribeAll();
	}
};

wDUtil.CustomEvent = function(type, oScope) {

    this.type = type;
	this.subscribers = [];
    this.scope = oScope || window;
};
wDUtil.CustomEvent.prototype = {
	on: function(fn) {
		this.subscribers.push(new wDUtil.Subscriber(fn, this.scope));
	},
	un: function(fn) {
		var found = false;
        for (var i=0, len=this.subscribers.length; i<len; ++i) {
            var s = this.subscribers[i];
            if (s && s.contains(fn, s.scope)) {
                this._delete(i);
                found = true;
            }
        }
        return found;
	},
	fire: function(args) {
		var length = this.subscribers.length;
		for(var i=0;i<length;i++){
			var s = this.subscribers[i];
			s.fn.apply(s.obj, args);
		}
	},
	unsubscribeAll: function() {
		for (var i=this.subscribers.length-1; i>-1; i--) {
            this._delete(i);
        }

        this.subscribers=[];
        return i;
	},
	_delete :function(index) {
		var s = this.subscribers[index];
        if (s) {
            delete s.fn;
            delete s.obj;
        }
        this.subscribers.splice(index, 1);
	}
};


wDUtil.Subscriber = function(fn, obj) {
    this.fn = fn;
    this.obj =  obj||null;
};

wDUtil.Subscriber.prototype = {
	contains : function(fn, obj) {
		if (obj) {
			return (this.fn == fn && this.obj == obj);
		} else {
		return (this.fn == fn);
		}
	}
};