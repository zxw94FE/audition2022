/*
 * @Author       : zhaixiaowei@xdf.cn
 * @Date         : 2022-09-14 17:30:49
 * @LastEditors  : zhaixiaowei@xdf.cn
 * @LastEditTime : 2022-09-14 17:34:08
 * @Description  : 描述信息
 */
export const imgUrl2Base64 = (url) => {
  return new Promise((resolve, reject) => {
    if (url) {
      const img = document.createElement('img')
      img.crossOrigin = 'anonymous'
      img.src = url
      // img.src = url + '?timeStamp=' + new Date().getTime()
      img.onload = function () {
        // 要先确保图片完整获取到，这是个异步事件
        try {
          const canvas = document.createElement('canvas') // 创建canvas元素
          var width = img.width // 确保canvas的尺寸和图片一样
          var height = img.height
          canvas.width = width
          canvas.height = height
          canvas.getContext('2d').drawImage(img, 0, 0, width, height) // 将图片绘制到canvas中
          const dataURL = canvas.toDataURL('image/png') // 转换图片为dataURL
          console.log('确实转成了dataURL')
          resolve(dataURL)
        } catch (err) {
          console.error(err)
          resolve(url + `?useCredential=${new Date().getTime()}`)
        }
      }
      img.onerror = function (err) {
        console.error(err)
        resolve(url + `?useCredential=${new Date().getTime()}`)
      }
    } else {
      resolve(url)
    }
  })
}

