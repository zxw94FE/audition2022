// 实现数组的flat()方法

// 先看原生flat方法

const arr = [1,2,,4,5]

const arr2 = arr.flat()

console.log(arr2) // [1,2,4,5] flat() 会移除空项


// 是用reduce跟扩展运算符进行替代。

// 扩展运算符
const a = [1,[2,[3]]]
const b = (a) => {
    return [].concat(...a)
}
console.log(b(a), 'b') // [ 1, 2, [ 3 ] ] b

// reduce
const c = a.reduce((total, current, index) => {
    if(Array.isArray(current)) {
        return total.concat(...current)
    } else {
        return total.concat(current)
    }
}, [])
console.log(c, 'c') // [ 1, 2, 3 ] c

const d = a.reduce((total, current) => {
    return total.concat(current)
}, [])
console.log(d, 'd') // [ 1, 2, [ 3 ] ] d

// TODO 由上面的例子说明了一件事情，他们只能解构一层， 除了c方法 又继续判断了一层isArray() 导致它能多解构一层，但是也只有两层。所以如果需要自定义depth深度，必然需要遍历。

// 利用 reduce + concat + 递归 实现

function flatDeep (arr, depth) {
    if (depth > 0) {
        return arr.reduce((total, current) => {
            return total.concat(Array.isArray(current) ? flatDeep(current, depth - 1): current)
        }, [])
    } else {
        return arr.slice()
    }
}

const abc = [1,2,[3,[4,[5]]]]
console.log(flatDeep(abc, 3), 'concat+递归')


console.log([1,2,[3]])

// TODO 但是上面这种情况 本质上还是传入了两个参数 所以我们需要做一个真正的flat()

function myFlat(depth = 1) {
    const arr = Array.prototype.slice.call(this)
    if (depth === 0) return arr
    return arr.reduce((total, current) => {
        return total.concat(Array.isArray(current) ? myFlat.call(current, depth - 1): current)
    },[])
}

Array.prototype.myFlat = myFlat
console.log(abc.myFlat(3), '用call切换this')



const gg = [[[[1,2,3]]]]
console.log(gg.myFlat(3), 'gg')

// 还可以使用扩展运算符进行数组降维， 跟 concat作用一致。

function myFlat2 (depth = 1) {
    const arr = Array.prototype.slice.call(this)
    if(depth === 0) return arr
    return arr.reduce((total, current) => {
        if(Array.isArray(current)) {
            return [...total, ...current.myFlat(depth - 1)] // 由于current.myFlat(depth - 1)返回的也是一个数组，所以需要... 解构出来。
        } else {
            return [...total, current]
        }
    }, [])
}

Array.prototype.myFlat2 = myFlat2
const lol = [1,2,[3,[4,5, [6]]]]
console.log(lol.myFlat2(3));
