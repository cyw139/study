class KVue {
    constructor(options) {
        this.$options = options
        // 处理data选项
        this.$data = options.data
        // 响应化
        this.observe(this.$data)

        // new Watcher()
        // this.$data.test
        // new Watcher()
        // this.$data.foo.bar

        new Compile(options.el, this)

        if (options.created) {
            options.created.call(this)
        }
    }
    observe(obj) {
        if (!obj || typeof obj !== 'object') {
            return
        }
        Object.keys(obj).forEach(key => {
            // 定义响应事件
            this.defineReactive(obj, key, obj[key])
            // 代理到vm上
            // 解决：this.test 和 this.$data.test 同时可用
            this.proxyData(key)
        })
    }
    proxyData(key) {
        Object.defineProperty(this, key, {
            get() {
                return this.$data[key]
            },
            set(newValue) {
                if (newValue !== this.$data[key]) {
                    this.$data[key] = newValue
                }
            }
        })
    }
    defineReactive(obj, key, val) {
        const dep = new Dep()

        Object.defineProperty(obj, key, {
            get() {
                // 将Dep.target(watcher 对象)添加到dep中
                Dep.target && dep.add(Dep.target)
                return val
            },
            set(newValue) {
                if (newValue !== val) {
                    val = newValue
                    // console.log(`${key}的值更新了！`)
                    dep.notify()
                }
            }
        })

        this.observe(val)
    }
}
class Dep{
    constructor() {
        this.deps = []
    }
    add(watcher) {
        this.deps.push(watcher)
    }
    notify() {
        this.deps.forEach(watcher => watcher.update())
    }
}
class Watcher{
    constructor(vm, key, cb) {
        this.vm = vm
        this.key = key
        this.cb = cb

        Dep.target = this
        this.vm[this.key] // 添加watcher到dep
        Dep.target = null
    }
    update() {
        // console.log(`属性更新了`)
        this.cb.call(this.vm, this.vm[this.key])
    }
}
