/**
 * 函数柯里化 该技术将一个接受多个参数的函数转换为一系列接受一个参数的函数。
 */

const display = (a, b, c, d, e, f) => [a, b, c, d, e, f];

/**
 * @description Currization of a function (How many times a currization function needs to be executed according to the number of parameters of the function before currization)
 * @param {function} fn -The Currified function
 */

function curry(fn) {
    if (fn.length <= 1) return fn;
    const generator = (...args) => {
        if (fn.length === args.length) {
            //Executes fn and returns the execution result
            return fn(...args)
        } else {
            return (...args2) => {
                console.log(args2, 'args2')
                //Return generator function
                return generator(...args, ...args2)
            }
        }
    }
    return generator
}

const curriedDisplay = curry(display);
console.log("curriedDisplay", curriedDisplay(1)(2)(3)(4)(5)(6));

