// new Compile(el, vm)

class Compile {
    constructor(el, vm) {
        this.$vm = vm
        this.$el = document.querySelector(el)

        if (this.$el) {
            // 提取宿主中模板内容到Fragment标签，dom操作会提高效率
            this.$fragment = this.node2Fragment(this.$el)
            // 编译模板内容，同时进行依赖收集
            this.compile(this.$fragment)
            this.$el.appendChild(this.$fragment)
        }
    }
    node2Fragment(el) {
        // ===== 创建新的空白文档片段 =====
        // DocumentFragments 是DOM节点。它们不是主DOM树的一部分。
        // 通常的用例是创建文档片段，将元素附加到文档片段，然后将文档片段附加到DOM树。
        // 在DOM树中，文档片段被其所有的子元素所代替。
        // ====== 使用的原因 =====
        // 因为文档片段存在于内存中，并不在DOM树中，
        // 所以将子元素插入到文档片段时不会引起页面回流（对元素位置和几何上的计算）。
        // 因此，使用文档片段通常会带来更好的性能。
        const fragment = document.createDocumentFragment()
        let child
        while (child = el.firstChild) {
            fragment.appendChild(child)
        }
        return fragment
    }
    compile(el) {
        const childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            // 判断节点类型
            if (node.nodeType === 1) { // element
                // console.log('编译元素节点：' + node.nodeName)
                this.compileElement(node)
            } else if (this.isInterpolation(node)) {
                // 插值表达式
                // console.log('编译插值文本：' + node.textContent)
                this.compileText(node)
            }

            // 递归子节点
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    }
    isInterpolation(node) {
        // 是文本且符合{{}}
        return node.nodeType === 3 && /\{\{\s*(.*)\s*\}\}/.test(node.textContent)
    }
    compileElement(node){
        // <div k-text="test" @click="onClick"> 关心属性，k开头、@开头
        let nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach(attr => {
            const attrName = attr.name
            const exp = attr.value
            if (this.isDirective(attrName)) {
                // 去掉k-
                const dir = attrName.substring(2)
                this[dir] && this[dir](node, this.$vm, exp)
            }
            if (this.isEvent(attrName)) {
                // 去掉@
                const dir = attrName.substring(1)
                this.eventHandler(node, this.$vm, exp, dir)
            }

        })
    }
    isDirective(attr) {
        return attr.indexOf('k-') === 0
    }
    isEvent(attr) {
        return attr.indexOf('@') === 0
    }
    text(node, vm, exp) {
        this.update(node, vm, exp, 'text')
    }
    html(node, vm, exp) {
        this.update(node, vm, exp, 'html')
    }
    model(node, vm, exp) {
        // data -> view
        this.update(node, vm, exp, 'model')
        // view -> data
        node.addEventListener('input', e => {
            vm[exp] = e.target.value
        })
    }
    htmlUpdater(node, value) {
        node.innerHTML = value
    }
    modelUpdater(node, value) {
        node.value = value
    }
    eventHandler(node, vm, exp, dir) {
        const fn = vm.$options.methods && vm.$options.methods[exp]
        if (dir && fn) {
            node.addEventListener(dir, fn.bind(vm))
        }
    }
    compileText(node){
        // isInterpolation里面，正则表达式括号()分组的那部分
        console.log(RegExp.$1)
        // 1、只具备初始化，却没有动态更改的能力
        // node.textContent = this.$vm[RegExp.$1]
        // 2、具备动态更改的能力
        this.update(node, this.$vm, RegExp.$1, 'text')
    }

    /**
     * 动态更新数据
     * @param node 当前节点
     * @param vm 上下文
     * @param exp 表达式
     * @param dir 指令
     */
    update(node, vm, exp, dir) {
        let updateFn = this[dir + 'Updater']
        updateFn && updateFn(node, vm[exp])
        // 依赖收集
        new Watcher(vm, exp, (value) => {
            updateFn && updateFn(node, value)
        })
    }
    textUpdater(node, val) {
        node.textContent = val
    }
}
