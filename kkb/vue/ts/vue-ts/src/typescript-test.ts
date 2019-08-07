// 类型注解
let name1: string | object
name1 = 'tom'
// name1 = 1 // wrong
let name3: string | { name: string }
name3 = { name: 'tom' }

let name2 = 'jerry'

// 数组
let names: string[]
names = ['mike']

// 任意类型
let foo: any = 'xx'
foo = 3

// 任意类型也可用于数组
let list: any[] = [1, 'Jack', true, {}]
list[1] = 100

// 函数中的类型
function greeting(person: string): string {
  return 'Hello' + person
}
function greeting2(person: string): void {
  console.log(person)
}
greeting('tom')
// 常见内置类型
// string number boolean void any object

// 函数
// 此处name和age必填参数，可设置默认值
// 可选参数，加上？
// 可选参数在必选参数后面
function sayHello(name: string, age: number=20, job?: string): string {
  return '你好：' + name + ' ' + age
}

sayHello('jerry')
sayHello('jerry', 36)
// sayHello('jerry') // wrong

// 重载
// 定义：参数数量、参数类型、返回类型不同、函数名却相同
// 先声明，在实现
function info(a: {name:string}): string
function info(a: string): object
function info(a: {name: string}|string): any {
  if (typeof a === 'object') {
    return a.name
  } else {
    return { name: a }
  }
}
console.log(info({name: 'tom'}))
console.log(info('tom'))

// class, 面向对象
class Shape {
  // area: number
  // 也可以在构造函数constructor中添加修饰符，就不用再做显示声明
  // protected color: string

  constructor (protected color: string, private width: number, private height: number) {
    // this.area = width * height
    this.color = color
  }

  //可以使用get 和 set 来生成area属性，相当于计算属性compute
  get area() {
    return this.width * this.height
  }

  shoutout() {
    return "I'm" + this.color + ' with an area of ' + this.area + ' cm squared.'
  }
}

class Square extends Shape {
  constructor (color: string, side: number) {
    super(color, side, side)
    console.log(this.color)
  }
  // 方法覆盖
  shoutout() {
    return '我是' + this.color + '面积是' + this.area + '平方厘米'
  }
}

const square = new Square('blue', 2)
console.log(square.shoutout())
