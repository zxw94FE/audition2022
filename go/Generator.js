/*
 * @Author       : zhaixiaowei@xdf.cn
 * @Date         : 2022-08-03 17:16:00
 * @LastEditors  : zhaixiaowei@xdf.cn
 * @LastEditTime : 2022-08-03 18:08:23
 * @Description  : generator 函数 
 */

function* gen (x) {
    let y = 2 * (yield (x + 1))
    let z = yield (y / 3)
    z = 88
    return x + y + z
}
let it = gen(5)

// x 5  y 18  z 88
console.log(it.next());     // { value:6, done: false}
console.log(it.next(9));    // { value:6, done: false}
console.log(it.next(2));    // { value:111, done: true}

/**
 * it.next() 第一个 里面不用带返回值 无意义
 * it.next(9) next里面的返回值 永远都是上一个yield的返回值。 也就是 yield (x + 1) 所以 y = 18
 * it.next(2) 指的是 yield (y / 3) 的值 所以z的值是2 但是 后面被替换为了 88 所以 z = 88
 */


/**
 * ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，
 * 或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）。

Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。

由于执行 Generator 函数实际返回的是一个遍历器，
因此可以把 Generator 赋值给对象的Symbol.iterator属性，
从而使得该对象具有 Iterator 接口。
 */
let obj = {}
function* gen1 () {
    yield 4
    yield 5
    yield 6
}

obj[Symbol.iterator] = gen1
for (const value of obj) {
    console.log(value);
}

console.log([...obj]);


/**
 * 
由于 Generator 函数运行时生成的是一个 Iterator 对象，
因此，可以直接使用 for…of 循环遍历，且此时无需再调用 next() 方法

这里需要注意，一旦 next() 方法的返回对象的 done 属性为 true，for…of 循环就会终止，且不包含该返回对象
 */

function* gen2 () {
    yield 1
    yield 2
    yield 3
    yield 4
    return 5
}

for (let item of gen2()) {
    console.log(item) // 1 2 3 4
}



//  应用： 某公司的年会上有一个抽奖活动，总共6个人可以抽6次，每抽一次，抽奖机会就会递减

/**
 * 常规做法
 * 
 * {
  let count = 6  // 声明一个全局变量

  // 具体抽奖逻辑的方法
  function draw() {
    // 执行一段抽奖逻辑
    // ...
    // 执行完毕

    console.log(`剩余${count}次`)
  }

  // 执行抽奖的方法
  function startDrawing(){
    if(count > 0) {
      count--
      draw(count)
    }
  }


  let btn = document.createElement('button')
  btn.id = 'start'
  btn.textContent = '开始抽奖'
  document.body.appendChild(btn)

  document.getElementById('start').addEventListener('click', function(){
    startDrawing()
  }, false)

}
 */

// 事实上，抽奖通常是每个人自己来抽，每抽一次就调用一次抽奖方法，
// 而不是点一次就一次性就全部运行完，是可暂停的，这个不就是 Generator 函数的意义所在吗？


// 具体抽奖逻辑的方法
function draw (count) {
    // 执行一段抽奖逻辑
    // ...

    console.log(`剩余${count}次`)
}

// 执行抽奖的方法
function* remain (count) {
    while (count > 0) {
        count--
        yield draw(count)
    }
}

let startDrawing = remain(6)

let btn = document.createElement('button')
btn.id = 'start'
btn.textContent = '开始抽奖'
document.body.appendChild(btn)

document.getElementById('start').addEventListener('click', function () {
    startDrawing.next()
}, false)


  // 应用二： 由于HTTP是一种无状态协议，执行一次请求后服务器无法记住是从哪个客户端发起的请求，
  // 因此当需要实时把服务器数据更新到客户端时通常采用的方法是长轮询和Websocket。
  // 这里也可以用 Generator 函数来实现长轮询

    // 请求的方法
    function* ajax() {
      yield new Promise((resolve, reject) => {
        // 此处用一个定时器来模拟请求数据的耗时，并约定当返回的json中code为0表示有新数据更新
        setTimeout(() => {
          resolve({code: 0})
        }, 200)
      })
    }
  
    // 长轮询的方法
    function update() {
      let promise = ajax().next().value    // 返回的对象的value属性是一个 Promise 实例对象
      promise.then(res => {
        if(res.code != 0) {
          setTimeout(() => {
            console.log('2秒后继续查询.....')
            update()
          }, 2000)
        } else{
          console.log(res)
        }
      })
    }
  
    update()
