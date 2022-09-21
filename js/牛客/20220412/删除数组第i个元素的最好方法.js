// 删除第三个元素

// 方法1：
let arr = [1, 2, 3, 4, 5]
arr.splice(3 - 1, 1) // splice方法改变了原数组

console.log(arr, 'arr')

// 方法2：

/**
 * slice() 方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。
 * concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
 */
let arr1 = [1, 2, 3, 4, 5]
let newArr = arr1.slice(0, 2).concat(arr1.slice(3, 5))

console.log(newArr, 'arr')


// 方法3：
/**
 * 这个方法是错误的，因为数组中可能会有重复的元素，for循环里的条件判断不严谨，其次dx到底是 索引 还是 索引加1  也不清楚，所以解法错误且不严谨。
 * @type {number[]}
 */
let arr2 = [1, 2, 3, 4, 5]
Array.prototype.remove = function (dx) {
    if (isNaN(dx) || dx > this.length) {
        return false;
    }
    for (var i = 0,
             n = 0; i < this.length; i++) {
        if (this[i] != this[dx]) {
            this[n++] = this[i]
        }
    }
    this.length -= 1
}

arr2.remove(3)

