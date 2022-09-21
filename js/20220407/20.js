// 实现instance
function myInstanceOf(left, right) {
    // let proto = left.prototype // 错误，拿到左边值的原型应该用 Object.getPrototypeOf(xx)
    let proto = Object.getPrototypeOf(left)
    while (true) {
        if(proto === null) return false
        if (proto === right.prototype)  {return true}
        proto = Object.getPrototypeOf(proto)
    }
}

let a = '123'
console.log(a.prototype) // undefined
console.log(Object.getPrototypeOf(a)) // [String: '']
console.log(a instanceof Object)    // false
console.log(String.prototype)   // [String: '']
console.log(myInstanceOf('123',  String)) // true

/**
 * TODO 学到的点
 *  1. 拿一个数据的原型 使用Object.getPrototypeOf(xx)的方式去使用 而不能直接用 xx.prototype  除非是Object.prototype 或者 String.prototype等构造函数形式
 *  2. while(true) { 进入一个循环，必须满足某种条件才能出来(return false/ return true), 然后在其中循环赋值proto } 这种js思路可以借鉴一下。
 */
