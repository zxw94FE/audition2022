// 实现数组的reduce方法

// 关于reduce()的参数
// 如果第二个参数指定了，则回调函数从数组下标为0的元素开始执行，
// 如果第二个参数没有指定，则会将数组的第一个元素的值作为初始值，迭代器从第二个元素开始执行
const myReduce = function (fn, initValue) {

    // 先定义几个变量
    let arr = Array.prototype.slice.call(this)
    let startItem
    let startIndex

    if (initValue === undefined) {
        // 如果initValue为空，initValue就是数组的第一项。
        for (let i = 0; i < arr.length; i++) {
            if (!arr.hasOwnProperty(i)) continue
            startIndex = i
            startItem = arr[i]
            break
        }
    }   else {
        startItem = initValue
    }

    // 为什么是 ++startIndex || 0  当initValue有值时，因为startIndex我们并没有指定默认值， ++Undefined 会解析为NaN，所以就需要指定一个初始的startIndex为0
    let res = startItem
    for (let i = ++startIndex || 0; i < arr.length; i++) {
        if (!arr.hasOwnProperty(i)) continue
        // startItem = fn.call(null, startItem, arr[i], i, this)
        res = fn.call(null, res, arr[i], i, this) // 这样写 跟直接用startItem的作用是一样的。
    }
    // return startItem
    return res
}

Array.prototype.myReduce = myReduce

const arr = [1,2,3,4]

const res = arr.myReduce((total, current, index, arr) => {
    return total + current
}, 1)

console.log(res) // 0 + 2 + 6 + 12 = 20

const res2 = arr.reduce((total, current, index, arr) => {
    return total + current
}, 1)
console.log(res2, 'res2') // 22


/**
 * TODO 学到的点
 *  1. 定义变量不赋值，根据后面代码的情况再指定默认值，可以减少一个flag的使用。例如startIndex在处理initValue是否为空时的定义，值得借鉴这种方式
 *  2. 使用递归，保存更新后的值，例如将得到的startItem继续传入函数中，得到叠加后的startItem，
 *      2.1 当然我们也可以使用定义一个res  res+=fn.call() 来进行结果的保存。
 *      *********2.1这种方式不行，必须把得到的res重新传入到函数中********
 */
