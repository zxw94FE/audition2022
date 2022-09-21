/**
 * 哪些是js内置的可迭代对象
 * Array
 * String
 * Map
 * Set
 * arguments
 * Typed Arrays
 * Generator
 */

let map = new Map().set('a', 1).set('b',2)
console.log(map)
console.log(map[Symbol.iterator])
for (let pair of map) {
    console.log(pair)
}

console.log(map.get('a'))

const eduList = new Map([[2, '小学'], [3, '初中'], [4, '高中']])
console.log(eduList.get(2))

const eduList2 = new Map().set(2, '小学').set(3,'初中').set(4, '高中')
console.log(eduList2, 'eduList2')
