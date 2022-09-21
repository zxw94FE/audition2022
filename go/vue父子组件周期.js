/*
 * @Author       : zhaixiaowei@xdf.cn
 * @Date         : 2022-07-21 09:59:57
 * @LastEditors  : zhaixiaowei@xdf.cn
 * @LastEditTime : 2022-07-21 09:59:58
 * @Description  : 描述信息
 */
/** 
 * mounted: 子 > 父 
 * 
 * updated: 子 > 父
 * 
 * destroyed: 子 > 父 
 * 
 * 
 * created和mounted的区别：
 *  created- 模板渲染成html之前调用，初始化某些属性值，在渲染为视图 
 *      推荐在此处进行异步请求，因为data已经创建，可以进行赋值
 *      能更快获取到数据，减少页面加载时间
 *      SSR不支持beforeMount mounted钩子函数，放在created中有助于一致性
 *  mounted- 模板渲染成html之后调用，初始化页面完成后，对dom进行操作。
 * 
 * 
 * 
 * 
 * 
 * keep-alive   deactivated(组件被换掉 缓存到内存中)  activated(组件被切回来，再去缓存里找这个组件)
 * 
 * 
 * 
 * */