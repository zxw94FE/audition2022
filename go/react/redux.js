/*
 * @Author       : zhaixiaowei@xdf.cn
 * @Date         : 2022-08-10 17:30:09
 * @LastEditors  : zhaixiaowei@xdf.cn
 * @LastEditTime : 2022-08-10 17:40:17
 * @Description  : 描述信息
 */
const addCountAction = (text) => {
    return {
        type: 'ADD',
        text
    }
}
const dispatch = (obj) => {
    return obj
}

const fetchData = (text) => (dispatch) => {

    const p = new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 2000)
    })
    return p.then(() => {
        return dispatch(addCountAction(text))
    })

}

const result = fetchData('你好')(dispatch)
console.log(result);