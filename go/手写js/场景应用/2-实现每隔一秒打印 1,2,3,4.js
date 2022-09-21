/*
 * @Author       : zhaixiaowei@xdf.cn
 * @Date         : 2022-07-22 10:37:23
 * @LastEditors  : zhaixiaowei@xdf.cn
 * @LastEditTime : 2022-07-22 11:18:35
 * @Description  : 描述信息
 */
// 使用 let 块级作用域
// for (let i = 1; i < 6; i++) {
//     setTimeout(function() {
//       console.log(i);
//     }, 1000 * i);
// }


// 使用闭包实现
// for (var i = 0; i < 5; i++) {
//     (function(i) {
//       setTimeout(function() {
//         console.log(i)
//       }, i * 1000)
//     })(i)
// }

// 闭包 
for (var index = 1; index < 6; index++) {
    (function (index) {
        setTimeout(() => {
            console.log(index);
        }, index * 1000) 
    })(index)
}
