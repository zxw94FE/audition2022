// function* helloGenerator (a) {
//     yield "hello world"
//     yield "nihao"
//     return 123
// }
// const g = helloGenerator(123)
//
// console.log(g.return(12).value)
// console.log(g.throw(
//     '这是一段错误'
// ))
// console.log(g.next().value)
// console.log(g.next().value)
// console.log(g.next().value)

try {
    function* helloGenerator (a) {
        yield "hello world"
        yield "nihao"
        return 123
    }
    const g = helloGenerator(123)

    console.log(g.return(12).value)
    console.log(g.throw(
        '这是一段错误'
    ))
} catch (e) {
    console.log(e)
}

let a = Symbol("12")
let obj = {
    age: 18
}
obj[a] = 'zhaoxiaoweinb'
console.log(obj) // { age: 18, [Symbol(12)]: 'zhaoxiaoweinb' }
console.log(Object.getOwnPropertySymbols(obj), 'getOwnPropertySymbols'); // [ Symbol(12) ]

/**
 * TODO
 *  关于generator
 *      Generator.prototype.next()      返回一个由 yield表达式生成的值。
 *      Generator.prototype.return()    返回给定的值并结束生成器。
 *      Generator.prototype.throw()     向生成器抛出一个错误。
 *  关于Symbol
 *      1. 基本数据类型
 *      2. 不能使用 new Symbol()
 *      3. 创建一个symbol let sym1 = Symbol("foo")
 *      4. 给对象的属性赋值 obj[sym1] = "孙悟空"  这是Symbol唯一的作用
 *      5. Symbol是唯一的  Symbol('foo') === Symbol('foo')  结果为false
 *      6. 从对象中查找Symbol属性： Object.getOwnPropertySymbols(目标obj) 如果找不到 数组就会为空
 */


let sym = Symbol("foo")
console.log(typeof sym); // symbol
let symbol = Object(sym)
console.log(typeof symbol); //object
