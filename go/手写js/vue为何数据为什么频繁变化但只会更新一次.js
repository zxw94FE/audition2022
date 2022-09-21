/*
 * @Author       : zhaixiaowei@xdf.cn
 * @Date         : 2022-08-01 11:37:09
 * @LastEditors  : zhaixiaowei@xdf.cn
 * @LastEditTime : 2022-08-01 11:48:13
 * @Description  : 描述信息
 */
/**
 * 
 * Vue是异步更新Dom的，Dom的更新放在下一个宏任务或者当前宏任务的末尾（微任务）中进行执行
 * 
 * 
 * 只要观察到数据变化，vue将开启一个队列。并缓冲在同一事件循环中发生的所有数据改变。如果同一个watcher被多次触发，
 * 只会被拖入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和dom操作非常重要。然后，在下一个的事件循环tick中（或者是当前tick的微任务阶段） ，
 * Vue刷新队列并执行实际工作。Vue在内部尝试使用Promise.then和 messageChannel 如果执行环境不支持，会采用setTimeOut(fn, 0)代替
 * 
 * 
 * 
 * 由于vue的事件机制是通过事件队列来调度执行。会等主进程执行空闲后 进行调度。所以会先去等待所有的同步代码执行完成后再去一次刷新。
 * 优势明显、
 * 
 * 执行顺序update 
 * -> queueWatcher 
 * -> 维护观察者队列（重复id的Watcher处理） 
 * -> waiting标志位处理（保证需要更新DOM或者Watcher视图更新的方法flushSchedulerQueue只会被推入异步执行的$nextTick回调数组一次） 
 * -> 处理$nextTick（在为微任务或者宏任务中异步更新DOM）->


用简短的话来总结一下  

由于VUE的数据驱动视图更新是异步的，即修改数据的当下，
视图不会立刻更新，而是等同一事件循环中的所有数据变化完成之后，再统一进行视图更新。
在同一事件循环中的数据变化后，DOM完成更新，立即执行nextTick(callback)内的回调。
 */