/*
 * @Author       : zhaixiaowei@xdf.cn
 * @Date         : 2022-07-20 18:01:29
 * @LastEditors  : zhaixiaowei@xdf.cn
 * @LastEditTime : 2022-07-20 18:01:31
 * @Description  : 描述信息
 */
// 创建组件构造器
let Component = Vue.extend({  template: '<div>test</div>'})
// 挂载到 #app 上
new Component().$mount('#app')

// 除了上面的方式，还可以用来扩展已有的组件
let SuperComponent = Vue.extend(Component)
new SuperComponent({    created() {        console.log(1)    }})
new SuperComponent().$mount('#app')
