/*
 * @Author       : zhaixiaowei@xdf.cn
 * @Date         : 2022-04-29 16:47:25
 * @LastEditors  : zhaixiaowei@xdf.cn
 * @LastEditTime : 2022-04-29 17:29:34
 * @Description  : sort
 */
var compareNumbers = function (a, b) {
    return a - b
}
var stringArray = ["Blue", "Humpback", "Beluga"];
console.log(stringArray.join()); // Blue,Humpback,Beluga
console.log(stringArray.sort()); // [ 'Beluga', 'Blue', 'Humpback' ]
console.log(stringArray.sort(compareNumbers)); // [ 'Beluga', 'Blue', 'Humpback' ]

var numericStringArray = ["80", "9", "700"];
console.log(numericStringArray.join()); // 80,9,700
console.log(numericStringArray.sort()); // [ '700', '80', '9' ]
console.log(numericStringArray.sort(compareNumbers)); // [ '9', '80', '700' ]

var numberArray = [40, 1, 5, 200];
console.log(numberArray.join()); // 40,1,5,200
console.log(numberArray.sort()); // [ 1, 200, 40, 5 ]
console.log(numberArray.sort(compareNumbers)); // [ 1, 5, 40, 200 ]

var mixedNumericArray = ["80", "9", "700", 40, 1, 5, 200];
console.log(mixedNumericArray.join()); // 80,9,700,40,1,5,200
console.log(mixedNumericArray.sort()); // [1,200,40,5,'700','80','9']
console.log(mixedNumericArray.sort(compareNumbers)); // [1,5,'9',40,'80',200,'700']

// 需要被排序的数组
var list = ['Delta', 'alpha', 'CHARLIE', 'bravo'];

// 对需要排序的数字和位置的临时存储
var mapped = list.map(function(el, i) {
  return { index: i, value: el.toLowerCase() };
})

console.log(mapped, 'mapped');
// [
//     { index: 0, value: 'delta' },
//     { index: 1, value: 'alpha' },
//     { index: 2, value: 'charlie' },
//     { index: 3, value: 'bravo' }
//   ]
// 按照多个值排序数组
mapped.sort(function(a, b) {
  return +(a.value > b.value) || +(a.value === b.value) - 1;
});
console.log(mapped, 'mapped-sort');
// [
//     { index: 1, value: 'alpha' },
//     { index: 3, value: 'bravo' },
//     { index: 2, value: 'charlie' },
//     { index: 0, value: 'delta' }
//   ] mapped-sort
// 根据索引得到排序的结果
var result = mapped.map(function(el){
  return list[el.index];
});

console.log(result, 'result') // [  'alpha', 'bravo', 'CHARLIE', 'Delta' ] result