// 实现数组的some方法

// 先看原生some
let arr = []
let result = arr.some((item, index) => {
    return item > 100
})
console.log(result) // false
// 有一个小知识点： 如果数组长度为0 则some()直接返回false 而every()直接返回true


// 实现some
function mySome(fn, context) {
    const arr = Array.prototype.slice.call(this)
    if(!arr.length) return false
    for (let i = 0; i < arr.length; i++) {
        if(!arr.hasOwnProperty(i)) continue
        let res = fn.call(context, arr[i], i, this)
        if(res) return true // some 有一个是true 则答案就是true
    }
    return false
}

Array.prototype.mySome = mySome
const arr2 = [1,3,6]
const result2 = arr2.mySome(item => {
    return item % 2 === 0
})
console.log(result2)


// 如果是every呢
function myEvery(fn, context) {
    const arr = Array.prototype.slice.call(this)
    if(!arr.length) return false
    for (let i = 0; i < arr.length; i++) {
        if(!arr.hasOwnProperty(i)) continue
        let res = fn.call(context, arr[i], i, this)
        if(!res) return false
    }
    return true
}
Array.prototype.myEvery = myEvery
const arr3 = [0,2,6]
const result3 = arr3.myEvery(item => {
    return item % 2 === 0
})
console.log(result3, 'result3')
