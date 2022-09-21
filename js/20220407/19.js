// 实现Object.assign() 方法
function isComplexDataType (data) {
    return (typeof data === 'object' || typeof data === 'function') && data !== null
}

//
function myAssign (target, ...source) {
    if (target == null) throw new Error('Cannot convert undefined or null to object')
    return source.reduce((total, current) => {
        if(!isComplexDataType(current)) return total
        return [...Object.keys(current)].forEach(key => {
            total[key] = current[key]
        })
        return total
    }, target)
}

Object.prototype.myAssign = myAssign;

let target = {
    a: 1,
    b: 1
}

let obj1 = {
    a: 2,
    b: 2,
    c: undefined
}

let obj2 = {
    a: 3,
    b: 3,
    d: null
}

// const c =  myAssign(target, obj1, obj2)

const d = Object.assign('123', {name: "孙悟空"})
console.log(d)

console.log(undefined === null)

const obj = {
    name: 123,
    age: 123,
    sex: 123
}
// console.log(Object.keys(obj)); // ['name', 'age', 'sex']
// console.log(...Object.keys(obj)) // 'name', 'age', 'sex'  相当于是把他们给解构了出来。

/**
 * TODO 学到的点
 *  1. null==undefined 为true  null===undefined 为false
 *  2.
 */
