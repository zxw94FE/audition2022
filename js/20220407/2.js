// 实现数组的map方法

const myMap = function (fn, context) {
    const arr = Array.prototype.slice.call(this)
    const newArray = new Array()
    for (let i = 0; i < arr.length; i++) {
        if (!arr.hasOwnProperty(i)) continue   // 是为了处理异常情况，不要也可以。
        newArray[i] = fn.call(context, arr[i], i, this)
    }
    return newArray
}

Array.prototype.myMap = myMap
const arr = [1,2,3]

// 第一个参数如果为箭头函数，由于箭头函数this的词法绑定，传context就不起作用了
const newArray = arr.myMap((item, i, context) => {
    console.log(context, 'context')
    // if(i === 1) {
    //     return item + 1   // [ undefined, 3, undefined ]
    // }
    return item + 1 && i === 1 // [false, true, false]
})
console.log(newArray) // [2,3,4]

// 第二个参数是绑定this用的。
const newArr2 = arr.myMap(function (item, i) {
   return this.name
}, {name: '孙悟空'})
console.log(newArr2) // ['孙悟空', '孙悟空', '孙悟空']

