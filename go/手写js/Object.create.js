/*
 * @Author       : zhaixiaowei@xdf.cn
 * @Date         : 2022-07-21 15:12:47
 * @LastEditors  : zhaixiaowei@xdf.cn
 * @LastEditTime : 2022-07-21 15:12:48
 * @Description  : 
 */
function create(obj) {
    function Fn() {}
    Fn.prototype = obj
    return new Fn()
}