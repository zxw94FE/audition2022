/*
 * @Author       : zhaixiaowei@xdf.cn
 * @Date         : 2022-07-04 15:34:27
 * @LastEditors  : zhaixiaowei@xdf.cn
 * @LastEditTime : 2022-07-04 16:36:40
 * @Description  : 描述信息
 */

let data = {
    msg: {
        a: 10
    },
    arr: [1, 2, 3]
}
let handler = {
    get(target, key) {
        // 懒监听，去获取的时候才监听对象里面的对象，而不是直接递归循环监听
        console.log(target, '获取key: ' + key)
        if (typeof target[key] === 'object' && target[key] !== null) {
            console.log('进入了递归循环', target[key]);
            return new Proxy(target[key], handler)
        }
        return Reflect.get(target, key)
    },
    set(target, key, value) {
        let oldValue = target[key]
        console.log(target, '更新key: ' + key)
        if (oldValue !== value) {
            // 通知view更新
        }
        return Reflect.set(target, key, value)
    }
}
let proxy = new Proxy(data, handler)
proxy.arr.unshift(4)
/**
 * 总结： vue3.0 与 vue2 的数据绑定原理 区别
 * 
 * vue2 数据劫持
核心方法： Object.defineProperty

let obj = {},
value = 1
Object.defineProperty(obj,'a',{
    get() {
        console.log('这里监听到了数据获取')
        return value
    },
    set(newValue, value) {
        if(newValue !== value) {
            value = newValue
            console.log('这里监听到了数据更改')
        }
    }
})
console.log(obj.a) // 这里监听到了数据获取   1
obj.a = 2 // 这里监听到了数据更改

所以再初始化Vue时，对data进行了劫持，每个属性都通过Object.defineProperty变成了getter/setter，一旦数据发生改变，就会触发set，然后去更新view

let data = {
    name: 'nike',
    info: {
        age: 21
    }
}
Object.keys(data).forEach(key=>{
    defineProperty(data, key, data[key])
})
function defineProperty(target, key, value) {
    Object.defineProperty(target,key,{
        get() {
            console.log('这里监听到了数据获取')
            return value
        },
        set(newValue, value) {
            if(newValue !== value) {
                value = newValue
                console.log('这里监听到了数据更改')
            }
        }
    })
}
data.name = 'tom' // 这里监听到了数据更改
data.info.age = 22 // 这里监听到了数据获取（这里没有触发更改，get和set相对立，总要触发一个）
data.info = {age:22} // 这里监听到了数据更改

至于data.info.age = 22为什么没有触发set呢，因为上面的逻辑仅仅是对data下面的一层进行了劫持，而再往下的改变是监听不到的，所以就引出了两外一个东西

Watch

watch: {
    info: {
        handler(){},
        deep: true
    }
}
此处的deep表示深度监听，这样就会对该属性递归遍历并逐一劫持，类似于深拷贝

vue.$set 从字面意思看，就是手动触发set
Vue 无法检测 property 的添加或移除。由于 Vue 会在初始化实例时对 property 执行 getter/setter 转化，所以 property 必须在 data 对象上存在才能让 Vue 将它转换为响应式的
// 添加一个属性
this.$set(this.obj,'b',1) // Vue.set(vm.obj,'b',1)

// 添加多个属性
this.obj = Object.assign({},this.obj,{a:1,b:2})

Vue 不能检测以下数组的变动：

当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue
当你修改数组的长度时，例如：vm.items.length = newLength

// 解决第一个 Vue.set, Array.prototype.splice
Vue.set(vm.items,indexOfItem,newValue) 
vm.items.splice(indexOfItem,1,newValue)

// 解决第二个 Array.prototype.splice
vm.items.splice(newLength)

缺点
不能监听数组下标及长度变化、实例对象新增或删减属性
需要使用递归、闭包，消耗性能和内存
代码较复杂，需要做数据备份

----------------------------------------------------------------
vue3 数据劫持
很明显，Object.defineProperty有一些缺陷，不仅要遍历data逐个劫持，还不能监听到数组的改变，所以VUE3使用了ES6的Proxy
Proxy字面理解代理,就跟经纪人一样，一旦与某个明星data绑定，那么这个明星想干嘛就得先通过代理

let data = {
    msg: {
        a: 10
    },
    arr: [1, 2, 3]
}
let handler = {
    get(target, key) {
        // 懒监听，去获取的时候才监听对象里面的对象，而不是直接递归循环监听
        console.log('获取key: ' + key)
        if (typeof target[key] === 'object' && target[key] !== null) {
            return new Proxy(target[key], handler)
        }
        return Reflect.get(target, key)
    },
    set(target, key, value) {
        let oldValue = target[key]
        console.log('更新key: ' + key)
        if (oldValue !== value) {
            // 通知view更新
        }
        return Reflect.set(target, key, value)
    }
}
let proxy = new Proxy(data, handler)
proxy.arr.push(4)

为什么每次都有length，其实Proxy的监听数组实现是把数组变成了一个类数组对象而已

let arr = {
    '0': 1,
    '1': 2,
    length: 2
}

Proxy除了get,set还有deleteProperty/apply/getOwnPropertyDescriptor等等12个方法，恰好与Reflect对应，所以在这些方法里面可以实现拦截器

set(target, key, value) {
    if(key[0] === '_') {
        throw new Error('这是私有变量，不能更改')
    }
    return Reflect.set(target, key, value)
}

双向绑定原理
使用订阅者-发布模式
其中核心组成部分：

监听器Observer： 上面的数据劫持
订阅者容器： 监听器监听到数据变动时，遍历订阅者容器发布消息
Compile：解析模板指令，将模板中的变量替换成数据，比如{{title}}
Watcher： 连接Observe和Compile的桥梁

订阅者容器
function Dep() {
    this.subs = []
}
Dep.prototype = {
    addSub(sub) {
        this.subs.push(sub)
    },
    notify() {
        // 每个订阅者都有一个update方法
        this.subs.forEach(sub=>sub.update())
    }
}

Compile
核心思想：
    解析特殊指令，比如{{}},@,bind,v-for
    将dom节点转换为文档碎片，提高性能

function Compile(el) {
    this.$el = document.querySelector(el)
    this.$fragment = this.node2Fragment(this.$el) // 将根节点下所有Dom转换为文档碎片
    this.init() // 解析指令
    this.$el.appendChild(this.$fragment) // 将文档碎片插入根节点
}

Compile.prototype = {
    node2Fragment(el) {
        let fragment = document.createDocumentFragment(),
            child
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    }
}

Watcher

function Watch(vm, exp) {
    this.vm = vm  // 数据集合
    this.exp = exp // 需要监听的属性
    this.value = this.get() // 初始化时触发自己的get
}
Watch.prototype = {
    update() {
        // 执行Compile的方法，触发view更新
    },
    get() {
        Dep.target = this // Dep.target表示当前订阅者
        let value = this.vm[this.exp] // 这里会触发Observer的getter，因为数据集合已经被劫持
        Dep.target = null  // 重置
        return value
    }
}
Object.defineProperty(data,key,{
    get() {
        Dep.target && dep.addDep(Dep.target) // 向订阅者容器中添加当前订阅者
        return val
    },
    set() {
        dep.notify() // 如果发生变化，通知所有订阅者
    }
})

总结

Vue双向绑定原理是采用发布订阅者模式，在初始化时劫持数据的各个属性的setter/getter，在数据变动时发布消息给订阅者，触发响应的监听回调。
而每个组件都对应一个Watcher实例，它会在组件渲染的过程中把接触过的数据记录为依赖，当依赖的setter出发时，会通知Watcher，从而使组件重新渲染
它的框架：MVVM

MVC缺点：view和model可以直接通信互相影响，而与之比较：

MVVM的优点：
1.数据与视图分离
2.数据驱动视图，开发者只需要关心数据，DOM操作被封装
 * 
 */