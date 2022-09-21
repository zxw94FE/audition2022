/*
 * @Author       : zhaixiaowei@xdf.cn
 * @Date         : 2022-07-05 15:08:19
 * @LastEditors  : zhaixiaowei@xdf.cn
 * @LastEditTime : 2022-07-05 15:34:19
 * @Description  : vue3都做了哪些优化
 */
/**
 * 1. 使用monorepo来进行代码管理
 *      - 将功能划分分布到不同的packages中，
 * 2. 使用typescript来进行类型检查
 *  -   vue2使用的是flow ts支持的更好，生态更好
 * 3. 利用tree-shaking 可以有效的减少代码打包后的体积，加快加载js的速度，提升项目性能。
 *      -tree-shaking 主要是利用了es6的模块化，export跟import 进行代码的静态分析，来对未引用的模块进行标记。
 * 4. 去掉了很多不常用的feature 如 filter跟inline-template
 * 5. 数据劫持的优化，由Object.defineProperty 改为 proxy
 *  - Object.defineProperty的缺点：
 *      - 只能监听已存在的属性，所以无法监听对象属性的添加跟删除，
 *      - 数组没key，所以无法监听数组长度的变化，跟数组元素的更新。
 *      - 即便可以通过set delete等实例方法进行操作，但还是比较复杂
 *      - 对象如果属性有嵌套，会进行递归劫持，非常的消耗性能
 *  - proxy
 *      - 代理整个对象，对象属性的添加跟删除都能监听的到。
 *      observe = new proxy(data, {
 *          get() {
 *              //track
 *          },
 *          set() {
 *              //track
 *          }
 *       })
 *      - Proxy API 并不能监听到内部深层次的对象变化 因此 Vue.js 3.0 的处理方式是在 getter 中去递归响应式，这样的好处是真正访问到的内部对象才会变成响应式
 *      而不是无脑递归，这样无疑也在很大程度上提升了性能
 * 
 * 6. 编译优化：
 *      - vue2 vNode的性能跟模板大小呈正相关, 跟动态节点的数量无关 
 *      - vue3 通过编译阶段对静态模板的分析，生成了block tree，block tree是一个将模板基于动态节点指令切割的嵌套区块，每个区块内部的节点结构是固定的，而且每个区块只需要以一个 Array 来追踪自身包含的动态节点
 *          借助 Block tree，Vue 将 vnode 更新性能由与模版整体大小相关提升为与动态内容的数量相关，这是一个非常大的性能突破，
 * 
 * 7， Composition
 *      - 优化逻辑组织
 *      - 优化逻辑复用
 *          - vue2 minxins 缺点：容易变量命名冲突，变量来源不清晰
            - vue3 数据来源清晰，也不担心命名冲突了。
                更好的类型支持 为它们都是一些函数，在调用函数时，自然所有的类型就被推导出来了 
                另外，Composition API 对 tree-shaking 友好，代码也更容易压缩。
 */