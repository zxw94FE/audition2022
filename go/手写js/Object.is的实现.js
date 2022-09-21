/*
 * @Author       : zhaixiaowei@xdf.cn
 * @Date         : 2022-07-29 18:14:07
 * @LastEditors  : zhaixiaowei@xdf.cn
 * @LastEditTime : 2022-08-01 11:15:24
 * @Description  : 描述信息
 */

Object.defineProperty(Object, 'is', {
    value: function (x, y) {
        if (x === y) {
            // 兼容+0 与 -0
            return x !== 0 || 1 / x === 1 / y
        }
        // 兼容NaN 跟 自身的比较
        return x !== x && y !== y //  !== x 那只能是NaN 才可能返回true
    }
})

/**
 *  Object.is(a, b)
    a === b 
    的区别 

    a ===b 表现为 1. +0 === -0  true  NaN !== NaN   true
    Object.is() 表现为  Object.is(NaN, NaN) true
                        Object.is(+0, -0) false
    
 */
