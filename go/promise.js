/*
 * @Author       : zhaixiaowei@xdf.cn
 * @Date         : 2022-07-04 10:22:56
 * @LastEditors  : zhaixiaowei@xdf.cn
 * @LastEditTime : 2022-07-04 10:22:58
 * @Description  : Promise.js
 */
const p = new Promise(res => {
    console.log(0);
    res()
})

p.then(res => {
    console.log(1);
}).then(res => {
    console.log(2);
}).then(res => {
    console.log(3);
})

p.then(res => {
    console.log(4);
})

p.then(res => {
    console.log(5);
})

p.then(res => {
    console.log(6);
})

// 输出顺序。 0 1 

