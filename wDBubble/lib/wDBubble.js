wDBubble = function (target) {
  this.initialize = function () {
    $bubble = this.createBubble();
    $(document.body).append($bubble);
    this.container = $bubble;
    this.container.bind('mouseenter', this, this.onMouseEnter);
    this.container.bind('mouseleave', this, this.onMouseLeave);
    if(target){
      this.container.css({
        left: $(target).offset().left + ($(target).outerWidth() / 2) - (this.container.outerWidth() / 2),
        top: $(target).offset().top + $(target).outerHeight()
      }, 300);
    }
  };
  this.createBubble = wDUtil.singleton( function(){
    var IE6Class = isIE6() ? ' bubbleIE6' : '';
    var id = 'bubble_' + new Date().getTime();
    var html = '';
    html += '<div id="' + id + '" class="wd_bubble">';
    html += '<div class="bubble_top' + IE6Class + '"></div>';
    html += '<div class="bubble_mid' + IE6Class + '"></div>';
    html += '<div class="bubble_bottom' + IE6Class + '"></div></div>';
    return $(html);
  });
  this.onMouseEnter = function (event) {
    event.data.stopHiding();
  };
  this.onMouseLeave = function (event) {
    event.data.hide();
  };
  this.stopHiding = function () {
    if (this.goingOffHandle && this.goingOffHandle !== null) {
      clearTimeout(this.goingOffHandle);
      this.goingOffHandle = null;
    }
  };
  this.setContent = function (events) {
    this.stopHiding();
    var html = '';
    for (var i = 0; i < events.length; i++)
    html += '<div><div class="event_title">' + events[i].name + '<p class="event_data">' + events[i].content + '</p></div></div>';
    var midSection = $(this.container.children() [1]);
    midSection.empty();
    midSection.append(html);
    var titles = midSection.find('.event_title');
    titles.each(function (inx, element) {
      $(element).bind('mouseenter', function (event) {
        $(element).children(':first').animate({
          opacity: 'toggle'
        }, 200);
      });
      $(element).bind('mouseleave', function (event) {
        $(element).children(':first').animate({
          opacity: 'hide'
        }, 200);
      });
    });
  };
  this.show = function (atL,atR) {
    this.container.animate({
      opacity: 'show'
    }, 250);
    this.container.animate({
      //注意刮号
      left: ((atL||0) - (this.container.outerWidth() / 2)),
      top: atR||0
    }, 300);
  };
  this.hide = function () {
    var self = this;
    this.goingOffHandle = setTimeout(function () {
      self.container.animate({
        opacity: 'hide'
      }, 250);
    }, 700);
  };
  this.initialize();
};