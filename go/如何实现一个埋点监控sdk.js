/*
 * @Author       : zhaixiaowei@xdf.cn
 * @Date         : 2022-08-04 18:00:33
 * @LastEditors  : zhaixiaowei@xdf.cn
 * @LastEditTime : 2022-08-04 18:37:37
 * @Description  : 埋点监控sdk
 */

/**
 * 埋点监控的职能范围：
 *  - 用户行为监控。 pv uv 用户的点击操作
 *  - 页面的性能监控 performance.timing
 *  - 错误报警监控
 *      全局捕获的错误信息，代码内部被catch住的报警
 */

/** sdk的设计 */

import StatisticSDK from 'StatisticSDK'

window.insSdk = new StatisticSDK('uuid-12345')

insSdk.event('click', 'confirm')

/**
 * 首先把SDK实例挂载到全局，
 * 之后在业务代码中调用，这里的新建实例时需要传入一个id，
 * 因为这个埋点监控系统往往是给多个业务去使用的，
 * 通过id去区分不同的数据来源。 */

// 1. 实例化部分
class StatisticSDK {
    constructor(productId) {
        this.productId = productId
    }
}

// 2. 数据发送。image beacon的形式
class StatisticSDK {
    constructor(productId) {
        this.productId = productId
    }
    send (baseURL, query = {}) {
        query.productId = this.productId
        let queryStr = Object.entries(query).map(([key, value]) => { `${key}=${value}` }).join('&')
        let img = new Image()
        img.src = `${baseURL}?${queryStr}`

        /**
         * 更优雅的web beacon
         * Navigator.sendBeacon(url,data)
         * 优势：
         *  不会和主要业务代码抢占资源，而是在浏览器空闲时去做发送
         *  并且在页面卸载时也能保证请求成功发送，不阻塞页面刷新和跳转；
         *  现在的埋点监控工具通常会优先使用sendBeacon，但由于浏览器兼容性，还是需要用图片的src兜底。
         */
    }
}

// 用户行为埋点监控
class StatisticSDK {
    constructor(productId) {
        this.productId = productId
    }
    send (baseURL, query = {}) {
        query.productId = this.productId
        let queryStr = Object.entries(query).map(([key, value]) => { `${key}=${value}` }).join('&')
        let img = new Image()
        img.src = `${baseURL}?${queryStr}`
    }
    // 自定义事件
    event (key, val = {}) {
        let eventURL = 'http://demo/'
        this.send(eventURL, { event: key, ...val })
    }

    // pv曝光
    pv () {
        this.event('pv')
    }
}

// 页面性能监控
// 构造函数里自动调用，因为性能数据是必须要上传的，就不需要用户每次都手动调用了
class StatisticSDK {
    constructor(productId) {
        this.productId = productId
        this.initPerformance()
    }
    send (baseURL, query = {}) {
        query.productId = this.productId
        let queryStr = Object.entries(query).map(([key, value]) => { `${key}=${value}` }).join('&')
        let img = new Image()
        img.src = `${baseURL}?${queryStr}`
    }
    // 性能上报
    initPerformance () {
        let performanceURL = 'http://performance/'
        this.send(performanceURL, performance.timing)
    }

}

/**
 * 错误报警监控 分为两种 JS原生错误 和 React 和 Vue 组件错误的处理
 * JS原生错误
 *  - 除了try catch中捕获住的错误, 
 *  - 我们还需要上报没有被捕获住的错误
 *  - 通过error事件和unhandledrejection事件去监听。
 * error
        error事件是用来监听DOM操作错误DOMException和JS错误告警的，具体来说，JS错误分为下面8类：

        InternalError: 内部错误，比如如递归爆栈;
        RangeError: 范围错误，比如new Array(-1);
        EvalError: 使用eval()时错误;
        ReferenceError: 引用错误，比如使用未定义变量;
        SyntaxError: 语法错误，比如var a = ;
        TypeError: 类型错误，比如[1,2].split('.');
        URIError:  给 encodeURI或 decodeURl()传递的参数无效，比如decodeURI('%2')
        Error: 上面7种错误的基类，通常是开发者抛出

        也就是说，代码运行时发生的上述8类错误，都可以被检测到。
   unhandledrejection
        Promise内部抛出的错误是无法被error捕获到的，这时需要用unhandledrejection事件。
 * */
class StatisticSDK {
    constructor(productId) {
        this.productId = productId
        this.initError()
    }
    send (baseURL, query = {}) {
        query.productId = this.productId
        let queryStr = Object.entries(query).map(([key, value]) => { `${key}=${value}` }).join('&')
        let img = new Image()
        img.src = `${baseURL}?${queryStr}`
    }

    error (err, etraInfo = {}) {
        const errorURL = 'http://error/'
        const { message, stack } = err
        this.send(errorURL, { message, stack, ...etraInfo })
    }

    initError () {
        window.addEventListener('error', event => {
            this.error(event)
        })

        window.addEventListener('unhandledrejection', event => {
            this.error(new Error(event.reason), { type: "unhandledrejection" })
        })
    }

    /**
     * 和初始化性能监控一样，初始化错误监控也是一定要做的，所以需要在构造函数中调用。
     * 后续开发人员只用在业务代码的try catch中调用error方法即可。
     */
}

// React的错误边界
// 它的使用很简单，就是一个带有特殊生命周期的类组件，用它把业务组件包裹起来。
// 这两个生命周期是getDerivedStateFromError和componentDidCatch，
// 回到SDK的整合上，在生产环境下，被错误边界包裹的组件，如果内部抛出错误，全局的error事件是无法监听到的，
// 因为这个错误边界本身就相当于一个try catch。所以需要在错误边界这个组件内部去做上报处理。也就是上面代码中的componentDidCatch生命周期。

class ErrorBoundary extends React.Component {
    state = { error: null }
    static getDerivedStateFromError (error) {
        return { error }
    }
    componentDidCatch (error, errorInfo) {
        // 调用我们实现的SDK实例
        insSDK.error(error, errorInfo)
    }
    render () {
        if (this.state.error) {
            return <h2>Something went wrong.</h2>
        }
        return this.props.children
    }
}
  ...
<ErrorBoundary>
    <BuggyCounter />
</ErrorBoundary>

// vue的错误边界
// vue也有一个类似的生命周期来做这件事，不再赘述：errorCaptured

Vue.component('ErrorBoundary', {
    data: () => ({ error: null }),
    errorCaptured (err, vm, info) {
        this.error = `${err.stack}\n\nfound in ${info} of component`
        // 调用我们的SDK，上报错误信息
        insSDK.error(err, info)
        return false
    },
    render (h) {
        if (this.error) {
            return h('pre', { style: { color: 'red' } }, this.error)
        }
        return this.$slots.default[0]
    }
})
  ...
<error-boundary>
    <buggy-counter />
</error-boundary>

/**
 * 我们要设计SDK，首先要清楚它的基本使用方法，才知道后面的代码框架要怎么搭；
 * 然后是明确SDK的职能范围：需要能处理用户行为、页面性能以及错误报警三类监控；
 * 最后是react、vue的项目，通常会做错误边界处理，要怎么接入我们自己的SDK。
 */