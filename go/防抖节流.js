/*
 * @Author       : zhaixiaowei@xdf.cn
 * @Date         : 2022-08-08 15:45:32
 * @LastEditors  : zhaixiaowei@xdf.cn
 * @LastEditTime : 2022-08-08 18:26:58
 * @Description  : 防抖节流
 */

/**
 * 立即执行与非立即执行 先去分开 实现  
 * 然后利用 immediate 进行分隔 
 * 逻辑相对来讲是独立的 只要你能分开实现了 那就一定能进行合并 。
 */

// 防抖 非立即执行
function debounce (fn, delay = 200) {
    let timer; // 为了只维护一个timer
    return () => {
        const _this = this
        const args = arguments
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            timer = null
            fn.apply(_this, args)
        }, delay)
    }
}

// 防抖 立即执行一次
function debounce2 (fn, delay) {
    let timer;
    let flag = true;
    return (...args) => {
        const _this = this
        timer && clearTimeout(timer)
        if (flag) {
            fn.apply(_this, args)
            flag = false
        }
        timer = setTimeout(() => {
            fn.apply(_this, args)
            flag = true
        }, delay)
    }
}

// 防抖：立即执行与非立即执行 结合版本
function _debounce (fn, delay = 500, immediate = false) {
    let timer;
    let flag = true;
    return (...args) => {
        const _this = this
        timer && clearTimeout(timer)
        if (immediate) {
            if (flag) {
                fn.apply(_this, args)
                flag = false
            }
            timer = setTimeout(() => {
                fn.apply(_this, args)
                flag = true
            }, delay)
        } else {
            timer = setTimeout(() => {
                fn.apply(_this, args)
            }, delay)
        }
    }
}

// 节流 非立即执行
function throttle (fn, delay = 200) {
    let timer; // 为了只维护一个timer
    return () => {
        const _this = this
        const args = arguments
        if (timer) return
        timer = setTimeout(() => {
            fn.apply(_this, args)
            timer = null // 执行完将timer置为null 下次才能进来。
        }, delay)
    }
}

// 节流 立即执行
function throttle2 (fn, delay) {
    let flag = true
    return (...args) => {
        const _this = this
        if (flag) {
            fn.apply(_this, args)
            flag = false
            setTimeout(() => {
                flag = true
            }, delay)
        }
    }
}

// 节流 立即执行版跟 非立即执行的结合版
function throttle2 (fn, delay, immediate) {
    let timer;
    let flag = true
    return (...args) => {
        const _this = this
        if (immediate) {
            if (flag) {
                fn.apply(_this, args)
                flag = false
                setTimeout(() => {
                    flag = true
                }, delay)
            }
        } else {
            if (timer) return
            timer = setTimeout(() => {
                fn.apply(_this, args)
                timer = null
            }, delay)
        }

    }
}

// 非立即执行的第二种方式 - 利用时间戳 而不使用setTimeout实现的节流 
// 其实现原理，通过比对上一次执行时间与本次执行时间的时间差与间隔时间的大小关系，来判断是否执行函数。若时间差大于间隔时间，则立刻执行一次函数。并更新上一次执行时间。
function _throttle (fn, delay) {
    let last;
    return () => {
        const _this = this
        const args = arguments
        const now = +new Date()
        if (now - last > delay) {
            fn.apply(_this, args)
            last = now
        }
    }
}


function resize () {
    console.log('resize');
}

window.addEventListener('resize', debounce(resize, 500))