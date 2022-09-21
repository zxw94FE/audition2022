// 通过reduce实现数组的filter方法

// 先看数组的reduce方法

const arr = [1,2,3,4]

const initValue = 10000

const newArr = arr.reduce((total, currentValue, currentIndex, originArr) => {
    return total + currentValue
}, initValue)

console.log(newArr) // 10010

// 实现filter方法
const myFilter = function (fn, context) {
    console.log(context, 'context1')
    const arr = Array.prototype.slice.call(this)
    return arr.reduce((total, current, index) => {
        return fn.call(context, current, index, this) ? [...total, current] : [...total]
    }, [])
}

Array.prototype.myFilter = myFilter

const arr2 = [7,7,7]
arr2.myFilter((item, i, context) => {
    console.log(context, 'context') // [ 7, 7, 7 ] context
    return item >= 2
})


const arr3 = [8, 8, 8]
const result3 = arr3.myFilter((item, index) => {
    console.log(this, 'this') // {} this
    return item > 1
})
console.log(result3)
