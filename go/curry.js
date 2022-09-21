/*
 * @Author       : zhaixiaowei@xdf.cn
 * @Date         : 2022-07-05 10:54:48
 * @LastEditors  : zhaixiaowei@xdf.cn
 * @LastEditTime : 2022-07-13 15:33:42
 * @Description  : 函数柯里化
 */

/**
 * 
 * 将一个函数从可调用的f(a,b,c) 变成可调用的f(a)(b)(c) 柯里化不会调用函数，它只是对函数进行转换
 */
const sum = (a, b) => {
    return a + b
}

const curry = (fn) => {
    return function (a) {
        return function (b) {
            return fn(a, b)
        }
    }
}
// const curriedSum = curry(sum)

// console.log(curriedSum);

// const res = curriedSum(1)(2)

// console.log(res);



/**
 * 函数柯里化的好处：
 * 生成偏函数
 */

 const curriedSum = curry(sum)
 const a = curriedSum(1) // 固定第一位数字 为  1
 const b = a(2) // 第二位就可以是 2 或者任何数字。
 console.log(b);
 
 const c = a(3)
 console.log(c);

// 在举个例子：有一个用于格式化和输出信息的日志（logging）函数 log(date, importance, message)。
// 在实际项目中，此类函数具有很多有用的功能，例如通过网络发送日志（log），在这儿我们仅使用 alert：
function log(date, importance, message) {
    alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}

// 柯里化 lodash库内的柯里化

log = _.curry(log);

// 两种兼容方法都可以
// log(new Date(), "DEBUG", "some debug"); // log(a, b, c)
// log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)

// 现在，我们可以轻松地为当前日志创建便捷函数

// logNow 会是带有固定第一个参数的日志的偏函数
let logNow = log(new Date());

// 使用它
logNow("INFO", "message"); // [HH:mm] INFO message

//现在，logNow 是具有固定第一个参数的 log，换句话说，就是更简短的“偏应用函数（partially applied function）”或“偏函数（partial）”。

// 我们可以更进一步，为当前的调试日志（debug log）提供便捷函数：

let debugNow = logNow("DEBUG");

debugNow("message"); // [HH:mm] DEBUG message

// 所以：

// 柯里化之后，我们没有丢失任何东西：log 依然可以被正常调用。
// 我们可以轻松地生成偏函数，例如用于生成今天的日志的偏函数。

// 实现一个函数柯里化

function curry2(fn) {
    return function curried(...args) {
        if(args.length >= fn.length) {
            return fn.apply(this, args)
        } else {
            return function (...args2) {
                return curried.apply(this, args.concat(args2))
            }
        }
    }
}








/**
 *  柯里化的限制：
 * 1. 只处理固定参数数量的函数。使用 rest 参数的函数，例如 f(...args)，不能以这种方式进行柯里化。
 * 2. 比柯里化多一点
 *      根据定义，柯里化应该将 sum(a, b, c) 转换为 sum(a)(b)(c)。
        但是，如前所述，JavaScript 中大多数的柯里化实现都是高级版的：它们使得函数可以被多参数变体调用。

        总结
柯里化 是一种转换，将 f(a,b,c) 转换为可以被以 f(a)(b)(c) 的形式进行调用。JavaScript 实现通常都保持该函数可以被正常调用，并且如果参数数量不足，则返回偏函数。

柯里化让我们能够更容易地获取偏函数。就像我们在日志记录示例中看到的那样，普通函数 log(date, importance, message) 在被柯里化之后，当我们调用它的时候传入一个参数（如 log(date)）或两个参数（log(date, importance)）时，它会返回偏函数。
 */
