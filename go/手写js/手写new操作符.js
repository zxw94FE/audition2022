/*
 * @Author       : zhaixiaowei@xdf.cn
 * @Date         : 2022-07-21 16:18:26
 * @LastEditors  : zhaixiaowei@xdf.cn
 * @LastEditTime : 2022-07-21 16:58:28
 * @Description  : 实现一个new操作符
 */
function A (age, name) {
    this.age = age
    this.name = name
}

let a = new A(16, '孙悟空')

console.log(a);

/**
 * 实现new操作符的4个步骤
 * 
 * 1. 创建一个空对象a
 * 2. 对象a的原型等于构造函数的原型
 * 3. 构造函数的this指向对象a,并且执行函数
 * 4. 判断返回值result的类型，如果是引用类型就返回result，如果是值类型就返回对象a
 */

function ObjectFactory() {
    let a = null
    let result = null
    let constructor = Array.prototype.shift.call(arguments)
    if(typeof constructor !== 'function'){
        console.error('不是一个构造函数');
        return
    }
    a = Object.create(constructor.prototype)
    result = constructor.apply(a, arguments)
    let flag = result && (typeof result === 'object' || typeof result === 'function' )
    return flag ? result : a
}



function A (name, age) {
    this.name = name
    this.age = age
}


const b = ObjectFactory(A,'孙悟空', 10)
console.log(b);

let c = new Promise((res, rej) => {
    res( new Promise() {
        
    })
})
c.then(() => {

})
