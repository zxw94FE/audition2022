1. link跟@import的区别 ：
    结论：强烈建议使用link而不使用@import方式
   1.从属关系区别
   @import是 CSS 提供的语法规则，只有导入样式表的作用；link是HTML提供的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性等
   2.加载顺序区别
   加载页面时，link标签引入的 CSS 被同时加载；@import引入的 CSS 将在页面加载完毕后被加载。
   3.兼容性区别
   @import是 CSS2.1 才有的语法，故只可在 IE5+ 才能识别；link标签作为 HTML 元素，不存在兼容性问题
   4.DOM可控性区别
   可以通过 JS 操作 DOM ，插入link标签来改变样式；由于 DOM 方法是基于文档的，无法使用@import的方式插入样式


2. 清除浮动。子元素浮动，解决父元素高度塌陷的方法
   1. 给父元素创建bfc
      1. 父元素 overflow:hidden
      2. float: left/right
      3. position: absolute
      4. display: inline-block
   2. 利用clear: both
       2. 父元素伪元素选择器(.clearfix) .clearfix::after {content: ""; clear: both; display: block; overflow: hidden}
       3. 浮动元素下方添加空div 并添加样式 clear: both;
