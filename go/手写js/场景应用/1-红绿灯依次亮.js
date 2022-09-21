/*
 * @Author       : zhaixiaowei@xdf.cn
 * @Date         : 2022-07-22 10:10:30
 * @LastEditors  : zhaixiaowei@xdf.cn
 * @LastEditTime : 2022-07-22 10:36:28
 * @Description  : 描述信息
 */

function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}

// const task = function (timer, light, callback) {
//     setTimeout(() => {
//         if(light === 'red') {
//             red()
//         }else if(light === 'green') {
//             green()
//         }else if(light === 'yellow') {
//             yellow()
//         }
//         callback()
//     }, timer)
// }


// // 递归亮灯的一个周期
// const step = () => {
//     task(300, 'red', () => {
//         task(200, 'green', () => {
//             task(100, 'yellow', step)
//         })
//     })
// }


// step()




// ----------------------------------------------------------------------------------------------------------------

// 用promise实现

const task = (timer, light) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(light === 'red') {
                red()
            }
            else if(light === 'green') {
                green()
            }
            else if(light === 'yellow') {
                 yellow()
            }
            resolve()
        }, timer)
    })
}

// .then的方式
// const step = () => {
//     task(300, 'red')
//         .then(() => task(200, 'green'))
//         .then(() => task(200, 'yellow'))
//         .then(step)
// }

// step()


// async await 的 方式
const taskRunner = async () => {
    await task(300, 'red')
    await task(200, 'green')
    await task(200, 'yellow')
    taskRunner()
}

taskRunner()