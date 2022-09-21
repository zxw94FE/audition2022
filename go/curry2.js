/*
 * @Author       : zhaixiaowei@xdf.cn
 * @Date         : 2022-07-13 15:33:36
 * @LastEditors  : zhaixiaowei@xdf.cn
 * @LastEditTime : 2022-07-13 15:33:37
 * @Description  : 描述信息
 */
function add (a, b, c) {
    return a + b + c 
}

function _curry (fn) {
    return function curried (...args) {
        if(args.length >= fn.length) {
            console.log(this, 'this');
            return fn.apply(this, args)
        } else {
            return function (...args2) {
                return curried.apply(this, args.concat(args2))
            }
        }
    }
}

const curry_add = _curry(add)

curry_add(1, 2, 3) === curry_add(1)(2)(3)