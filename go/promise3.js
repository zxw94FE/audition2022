/*
 * @Author       : zhaixiaowei@xdf.cn
 * @Date         : 2022-07-04 10:40:35
 * @LastEditors  : zhaixiaowei@xdf.cn
 * @LastEditTime : 2022-07-04 10:41:48
 * @Description  : 描述信息
 */
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2 start');
    return new Promise((resolve, reject) => {
        reject();
        console.log('async2 promise');
    })
}
 
console.log('illegalscript start');
 
setTimeout(function () {
    console.log('setTimeout');
}, 0);
 
async1();
 
new Promise(function (resolve) {
    console.log('promise1');
    resolve();
}).then(function () {
    console.log('promise2');
}).then(function () {
    console.log('promise3');
});
console.log('illegalscript end');
/**
 * illegalscript start
 * async1 start
 * async2 start
 * async1 end
 * 
 * setTimeout
 * 
 * promise1
 * promise2
 * promise3
 * 
 * illegalscript end
 */
