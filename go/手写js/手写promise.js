const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECT = 'rejected'

const myPromise = function (fn) {
    const self = this
    this.value = null
    this.status = PENDING
    this.resolveCallbacks = []
    this.rejectCallbacks = []
    function resolve(value) {
        if(value instanceof myPromise) {
            return value.then(resolve, reject)
        }
        setTimeout(() => {
            if(self.status === PENDING) { 
                self.status = RESOLVED
                self.value = value
                self.resolveCallbacks.forEach(callback => {
                    callback(value)
                });
            }
        }, 0)
        
        
    }

    function reject(value) {
        setTimeout(() => {
            if(self.status === PENDING) {
                self.status = REJECT
                self.value = value
                self.rejectCallbacks.forEach(callback => {
                    callback(value)
                });
            }
        }, 0)
    }
    try {
        fn(resolve, reject)
    } catch (error) {
        reject(error)
    }
    
}

myPromise.prototype.then = function(onResolved, onRejected) {
    onResolved = 
        typeof onResolved === 'function' 
        ? onResolved
        : function (value) {
            return value
        }

    onRejected = 
        typeof onRejected === 'function' 
        ? onRejected
        : function (value) {
            return value
        }
    if (this.status === PENDING) {
        this.resolveCallbacks.push(onResolved)
        this.rejectCallbacks.push(onRejected)
    }
    if(this.status === RESOLVED) {
        onResolved(this.value)
    }
    if(this.status === REJECT) {
        onRejected(this.value)
    }
    
}

const p = new myPromise((resolve, reject) => {
    let a = Math.random()
    if(a > 0.5) {
        resolve(a)
    }else {
        reject(a)
    }
})

p.then(res => {
    console.log('res ' + res);
}, rej => {
    console.log('rej ' + rej);
})

