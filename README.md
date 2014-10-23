WDComponents
===========
#Feature
##wDTip
dWtip是一个基于jQuery的JavaScript组件，他的作用在于弹出气泡层，气泡层的样式、内容的配置方式是采用bootstrap的data-api的设计方式，引入插件后设置相应的class为 dWtip后并设置相应的data属性，即可弹出气泡层。
气泡层不会超出主屏幕范围且内容区域，箭头为自适应的指向归属的DOM节点。
###实例代码
```html
<!--data-trigger 为触发方式，没该属性自动为鼠标移入移出触发事件 -->
<!--data-content 为内容区域，可以是html代码 -->
<a class="dWtip tooltip" data-trigger='mouseover' data-content="作者：<b>大胃吴</b><br>时间：2014/10/23" >dWtip</a>
<!-- 气泡层带图片 -->
<a class="dWtip tooltip" data-content="<img src='images/bg.jpg'/>">气泡层</a>
<!-- 气泡层带网页 -->
<!--data-showtime 为隐藏的动画动作时间 -->
<a class="dWtip tooltip" data-content="<iframe style='width:600px;height:300px;overflow: scroll;' src='http://www.baidu.com'></iframe>" data-showtime="100"  >dWtip</a>
<!--data-autohide 为自动隐藏的开关 -->
<!--data-hidetime 为显示自动隐藏条件下的延迟隐藏时间 -->
<button class="dWtip" data-autohide="true" data-content="这是按钮弹出气泡层,设置了10秒后自动消失" data-trigger='click' data-hidetime="5000">点击弹出气泡</button>
```
###暂缺功能

* 暂无法设置弹出气泡的位置，只能在下放弹出。不能自动在其左右或上方弹出。
* 无法定制气泡的样式
* 箭头为图片，用CSS样式来设置箭头效果会更好