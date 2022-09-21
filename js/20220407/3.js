// 实现数组的filter方法

function myFilter (fn, context) {
    const arr = Array.prototype.slice.call(this)
    const resultArr = new Array()
    for (let i = 0; i < arr.length; i++) {
        if (!arr.hasOwnProperty(i)) continue
        fn.call(context, arr[i], i, this) && resultArr.push(arr[i])
    }
    return resultArr
}

Array.prototype.myFilter = myFilter
const arr = [1, 2, 3]
const resultArr = arr.myFilter((item) => {
    return item >= 2
})
console.log(resultArr, 'resultArr')


// 继续研究一下第一个参数this

const arr2 = [10, 100 , 200]
const resultArr2 = arr2.myFilter(function (item, i, context) {
    return this.name.indexOf('悟空') > -1  // 此时的this就是{name: 孙悟空}
}, {name: '孙悟空'})
console.log(resultArr2, 'resultArr2') // [10, 100, 200]
