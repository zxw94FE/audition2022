/**
 * Map对象保存键值对，并且能够记住插入的顺序，任何值都可以作为一个键或者一个值 NaN都可以 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map#map_%E4%B8%8E%E6%95%B0%E7%BB%84%E7%9A%84%E5%85%B3%E7%B3%BB
 *
 */
/**
 * 创建
 */
let map1 = new Map()
map1.set('string', 'swk')
map1.set(isNaN, '我是NaN')

console.log(map1[Symbol.iterator], 'iterator')

let map2 = new Map([['string', 'swk'], [isNaN, '我是NaN']])

// 长度
console.log(map2.size)

/*
* 迭代map
* */

// for...of
for (let [key, value] of map1) {
    console.log(key, value)
}

for (let key of map1.keys()) {
    console.log(key)
}

for (let value of map1.values()) {
    console.log(value)
}

for (let [key, value] of map1.entries()) {
    console.log(key, value)
}

// forEach
map1.forEach((key, value) => {
    console.log(key, value)
})

// map跟数组的相互转换

let kvArray = [['key1', 'value1'], ['key2', 'value2']]

const map3 = new Map(kvArray)

map3.get('key1')

Array.from(map3) // map跟二维数组相互转换

let kvArray2 = [...map3]

Array.from(map3.keys()) // ['key1', 'key2']


// map也可以复制或者合并

let original = new Map([
    [1, 'one']
])

let clone = new Map(original)

console.log(clone.get(1)) //one
console.log(clone === original) // false 不为同一个对象的引用 ==也是false


// 合并

let first = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three']
])

let second = new Map([
    [1, 'first'],
    [4, 'four'],
    [5, 'five']
])

let merged = new Map([...first, ...second])
console.log(merged.get(1)) // first
console.log(merged.get(4)) // four

// map对象跟数组合并

let merged2 = new Map([[...first], [6, 'six']])
console.log(merged2)

// 给Map设置属性时， 不建议 Map1[key] = value这种做法
let map4 = new Map()
map4['key1'] = 'value1'
map4['key2'] = 'value2'

map4.has('key1') // false
map4.delete('key2') // false
console.log(map4) // 依旧没变化还是两个属性，行为不符合预期 所以不建议你这样去做


// 正确的做法是
let map5 = new Map()
map5.set('key1', 'value1')
map5.set('key2', 'value2')
console.log(map5)

map5.has('key1') // true
map5.delete('key2') // true
console.log(map5)
