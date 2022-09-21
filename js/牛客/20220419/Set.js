/**
 * Set对象允许你存储任何类型的唯一值，无论是原始值or对象引用
 */

// 创建Set对象

let mySet = new Set()

mySet.add(1) // Set [1]
mySet.add(5)   // Set [1, 5]
mySet.add(5) // Set [1, 5]
mySet.add('string')

// 注意
let obj = {a:1,b:2}
mySet.add({a: 1, b: 2})
mySet.add(obj) // 此时是可以添加进去的，obj指向的是不同的对象，

mySet.has(1)
mySet.has(5)

mySet.delete(5)

mySet.size

console.log(mySet) // Set { 1, 'string', { a: 1, b: 2 }, { a: 1, b: 2 } }

// 迭代

for (let item of mySet) {
    console.log(item)
}

for (const item of mySet.keys()) {
    console.log(item)
}

for (const value of mySet.values()) {
    console.log(value)
}

for (const [key, value] of mySet.entries()) {
    console.log(key, value)
}

// 使用Array.from() 转换Set为Array

let myArr = Array.from(mySet)
console.log(myArr) // [ 1, 'string', { a: 1, b: 2 }, { a: 1, b: 2 } ]


let myArr2 = [...mySet]
console.log(myArr2) // [ 1, 'string', { a: 1, b: 2 }, { a: 1, b: 2 } ]


// 模拟求交集

const set1 = new Set([1,2,3,4])
const set2 = new Set([2,3,4])

const set3 = new Set([...set1].filter(item => set2.has(item)))

// 模拟求 差集
const set4 = new Set([...set1].filter(item => !set2.has(item)))

// 还可以使用forEach
set1.forEach(value => {
    console.log(value)
})


// 几种集合操作，
const mapA = new Set([1,2,3,4])
const mapB = new Set([3,4])
const mapC = new Set([1,2,5,6])
// 1 判断set是否是subSet的超集
function isSuperSet(set, subSet) {
    for (const x of subSet) {
        if(!set.has(x)) {
            return false
        }
    }
    return true
}

// 2. 并集
function union(setA, setB) {
    let _union = new Set(setA)
    for (const value of setB) {
        _union.add(value)
    }
    return _union
}

// 3. 交集

function intersection(setA, setB) {
    let merged = new Set()
    for (const value of setB) {
        if(setA.has(value)) {
            merged.add(value)
        }
    }
    return merged
}

// 并集 & 去除相同项

function symmetricDifference(setA, setB) {
    let _difference = new Map(setA)
    for (const x of setB) {
        if (_difference.has(x)) {
            _difference.delete(x)
        } else {
            _difference.add(x)
        }
    }
    return _difference
}

// 差集

function difference(setA, setB) {
    let _difference = new Set(setA)
    for (const x of setB) {
        _difference.delete(x)
    }
    return _difference
}


// 数组去重

let arr = [1,2,3,4,5,1,2,3,4]
console.log([...new Set(arr)]) // [ 1, 2, 3, 4, 5 ]



// String相关

let text = 'India'
let set6 = new Set(text)
console.log(set6)// Set { 'I', 'n', 'd', 'i', 'a' }
console.log(set6.size) // 5


// 带小写敏感

console.log(new Set('Firefox')) //Set { 'F', 'i', 'r', 'e', 'f', 'o', 'x' }

console.log(new Set('firefox')) //Set { 'f', 'i', 'r', 'e', 'o', 'x' }

