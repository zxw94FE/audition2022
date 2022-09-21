// 确定对象的数据类型
function myType(type) {
    return Object.prototype.toString.call(type).slice(8, -1)
}
const obj = [1,2,3]
const string1 = '123'
const boo1 = false
const unde1 = undefined
const null1 = null
const map1 = new Map()
console.log(myType(obj)) // Array
console.log(myType(string1))    // String
console.log(myType(boo1))   //Boolean
console.log(myType(unde1))  // Undefined
console.log(myType(null1))  // Null
console.log(myType(map1))   // Map

// String.slice(start, end) 包含start 不包含end
// 如果start为负数，表示从尾部截取多少个字符串 slice(-2)表示从尾部截取两个字符。
// 如果end为负数，-1表示字符串最后一个字符的位置。 -2表示字符串第二个字符的位置。
