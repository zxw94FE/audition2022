/*
 * @Author       : zhaixiaowei@xdf.cn
 * @Date         : 2022-07-21 15:16:46
 * @LastEditors  : zhaixiaowei@xdf.cn
 * @LastEditTime : 2022-07-21 15:46:21
 * @Description  : 构造函数的prototype是否在对象的原型链上
 */
function myinstanceof(left, right) {
    let proto = Object.getPrototypeOf(left), // 获取对象的原型
        // prototype = Object.getPrototypeOf(right) 
        prototype = right.prototype
    
    while (true) {
        if(!proto) return false
        if(proto === prototype) return true

        proto = Object.getPrototypeOf(proto)
    }
}   


/**
 * 先整理一下原型链的知识点：
 * 1. 每个构造函数默认都会创建一个prototype对象，用于存储对象实例共享的变量跟方法
 *  所以 User.prototype就是构造函数的原型，它用于让构造函数找到自己的原型，同样也可以通过prototype手动更改构造函数的原型。
 * 2. __proto__ 
 *  用于获取对象实例原型的非标准方法 - 不提倡使用 
 * 3. Object.getPrototypeOf()
 *  ES5 提供的用于获取对象原型的标准方法
 *  如果指定的不是对象 就会报错。
 */

var obj = new Object()
Object.getPrototypeOf(Object)
Object.getPrototypeOf(Function)
Object.getPrototypeOf(Object) ===  Function.prototype // true 因为 是把Object这一构造函数看作对象，返回的当然是函数对象的原型，也就是 Function.prototype。
Object.getPrototypeOf(obj) === Object.prototype // true
Object.getPrototypeOf({}) === Object.prototype // true  Object.prototype是构造出来的对象的原型。


/** 
 * 总结
 * - 一般不使用prototype去获取原型对象，除非要改变构造函数的原型对象
 * - 获取对象实例的原型对象，首选Object.getprototypeOf()
 * - 在ES5不支持的情况下，再用__proto__获取对象实例的原型
 */