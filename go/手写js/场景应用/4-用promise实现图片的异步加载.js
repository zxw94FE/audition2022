/*
 * @Author       : zhaixiaowei@xdf.cn
 * @Date         : 2022-07-22 16:50:52
 * @LastEditors  : zhaixiaowei@xdf.cn
 * @LastEditTime : 2022-07-22 17:43:34
 * @Description  : 
 */
const imageAsync = (url) => {
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.url = url
        img.onload = function () {
            resolve(img)
        }
        img.onerror = function(err) {
            reject(err)
        }
    }) 
}

imageAsync(url).then(() => {
    console.log('加载成功');
}).catch(error => {
    console.log('加载失败');
})