<template>
  <div>
    {{ msg }}
    <ul>
      <li v-for="feature in features" :key="feature.id">
        {{feature}}
      </li>
      <li>{{count}}</li>
    </ul>
    <input type="text" placeholder="输入新特性" @keyup.enter="addFeature" />
  </div>
</template>

<script lang='ts'>
  import {Component, Prop, Vue, Emit} from 'vue-property-decorator'

  // 接口中只需定义结构，不需要初始化
  // 缺陷：TS对模板的支持不足
  interface Feature {
    id: number
    name: string
    version: string
  }

  // 使用泛型
  interface Result<T> {
    ok: 0 | 1
    data: T[]
  }

  function getData<T>(): Result<T> {
    const data: any[] = [
      {id: 1, name: '类型注解', version: '2.0'},
      {id: 2, name: '编译型语言', version: '2.0'}
    ]
    return { ok: 1, data }
  }

  @Component({
    // 这种配置和下面的@prop()的配置都是可以的。
    props: {
      name: {
        type: String,
        default: '匿名'
      }
    }
  })
  export default class Hello extends Vue {

    // 添加! 表示父亲一定会传值（告诉TypeScript编译器，一定会有值）
    // required 告诉vue这里必须有值
    // 装饰器
    @Prop({required:true, default: '', type: String}) msg!: string

    // 可以设置默认值
    // @Prop({required:true, default: ''}) msg='test'

    // TypeScript 和 Vue 之间设置的类型有冲突的情况，会怎样？
    // 实际上是vue在进行传值验证
    // @Prop({required:true, default: '', type: String}) msg!: number

    // 第一种写法：相当于data中的值，有多个值，可以不断列出来
    // private、protected、public
    // private features = ['类型注解', 'blabla']
    // private features: Feature[] = [
    //   {id: 1, name: '类型注解', version: '1.0'},
    //   {id: 2, name: 'blabla', version: '1.1'}
    // ]
    private features: Feature[] = []
    // 第二种写法
    // features: string[]
    // constructor() {
    //   super()
    //   this.features = ['类型注解', '编译型语言']
    // }

    // 重载
    @Emit()
    private addFeature(event: any) {
      this.features.push(event.target.value)
      event.target.value = ''

      return event.target.value
    }

    // 生命周期的函数是有运行的
    private created() {
      // setTimeout(() => {
      //   // this.features.push('foo')
      //   this.features.push({id: 3, name: 'foo', version: '1.0'})
      // }, 1000)

      // 调用接口
      this.features = getData<Feature>().data
    }

    get count() {
      return this.features.length
    }
  }
</script>

<style scoped>

</style>
