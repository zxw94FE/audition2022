/*
 * @Author       : zhaixiaowei@xdf.cn
 * @Date         : 2022-07-04 10:34:30
 * @LastEditors  : zhaixiaowei@xdf.cn
 * @LastEditTime : 2022-07-04 10:39:45
 * @Description  : 描述信息
 */
  async function async1 () {
    console.log('async1 start')
    await async2();
    console.log('async1 end')
  }
  async function async2 () {
    console.log('async2')
  }
  console.log('script start')
  setTimeout(function () {
    console.log('setTimeout')
  }, 0)
  async1();
  new Promise (function (resolve) {
    console.log('promise1')
    resolve();
  }).then (function () {
    console.log('promise2')
  })
  console.log('script end')

/**
 * script start
 * async1 start 
 * async 2
 * async1 end
 * 
 * promise 1
 * promise 2
 * 
 * setTimeout 
 * 
 * script end
 */
