// 核心点 isNaN的值 永远不能全等于自身 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isNaN
// isNaN的polyfill

function isNaN (value) {
    const n = Number(value)
    return n !== n
}


// 所以判断一个值是不是NaN时，先用Number()进行类型转换，然后全等于自身进行判断。
