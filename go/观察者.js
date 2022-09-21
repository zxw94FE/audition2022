/*
 * @Author       : zhaixiaowei@xdf.cn
 * @Date         : 2022-07-04 17:25:32
 * @LastEditors  : zhaixiaowei@xdf.cn
 * @LastEditTime : 2022-07-05 10:23:47
 * @Description  : 手写EventEmitter
 */

/**
 * 先实现一个简单的观察订阅者模式
 * 情景：报社卖报jack，买报的mike。 jack卖的时候通知一下mike，实现一个简单的观察订阅者模式
 * 属性：订阅者 subscribers 
 *      新增订阅 addSub
 *      取消订阅 cancelSub
 *      发布 publish
 *      订阅的类型 有的喜欢娱乐报纸 有的喜欢体育报纸 type
 */

let jack = {
    subscribers: {
        'any': []
    },

    subscribe: function (type, fn) {
        if(!this.subscribers[type]) {
            this.subscribers[type] = []
        }
        this.subscribers[type].push(fn)
    },

    unSubscribe: function (type = 'any', fn) {
        this.subscribers[type] = 
            this.subscribers[type].filter(i => {
                return i !== fn
            })
    },

    // 只订阅一次。
    once: function (type = 'any', fn) {
        const wrapperFn = (...args) => {
            fn(args)
            // fn.apply(this, args)
            this.unSubscribe(type, wrapperFn)
        }
        this.subscribe(type, wrapperFn)
    },

    publish: function (type = 'any', ...args) {
        this.subscribers[type].forEach(item => {
            item(...args)
        });
    }
}
// 实验一下 

let tom = {
    readNews: function (params) {
        console.log(params)
    },
    talk: function (params) {
        console.log('跟我说话' + params);
    }
}
// 娱乐  readNews
// 体育  readNews talk

jack.subscribe('娱乐', tom.readNews)

jack.subscribe('体育', tom.readNews)

jack.once('体育', tom.talk) // 只订阅了一次 只能触发一次publish

jack.publish('娱乐', '王力宏离婚了')

jack.publish('体育', '库里夺冠了')

jack.publish('体育', '欧文去湖人了')

