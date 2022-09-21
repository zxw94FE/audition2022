/*
 * @Author       : zhaixiaowei@xdf.cn
 * @Date         : 2022-07-04 17:21:02
 * @LastEditors  : zhaixiaowei@xdf.cn
 * @LastEditTime : 2022-07-04 17:22:15
 * @Description  : 描述信息
 */

/**
 * keep的使用：
 * 在动态组件中的应用
 * <keep-alive :include="whiteList" :exclude="blackList" :max="amount">
  <component :is="currentComponent"></component>
</keep-alive>

在vue-router中的应用
<keep-alive :include="whiteList" :exclude="blackList" :max="amount">
  <router-view></router-view>
</keep-alive>

三个属性：
include定义缓存白名单，keep-alive会缓存命中的组件；
exclude定义缓存黑名单，被命中的组件将不会被缓存；
max定义缓存组件上限，超出上限使用LRU的策略置换缓存数据。
注意点：
1.使用include的时候，必须给所有路由管理起来的vue组件都设置name属性，不然，没有name属性的也会被缓存下来，这样就不好实现有条件的筛选
2.使用exclude的时候，也必须给所有路由管理起来的vue组件都设置name属性，不然，没有name属性的组件也会被排除在外
3.当同时使用include和exclude的时候，exclude的优先级会更高，include就不生效
4.缓存了组件之后，再次进入组件不会触发beforeCreate、created 、beforeMount、 mounted，如果你想每次进入组件都做一些事情的话，你可以放在activated进入缓存组件的钩子中。
同理：离开缓存组件的时候，beforeDestroy和destroyed并不会触发，可以使用deactivated离开缓存组件的钩子来代替。

 */