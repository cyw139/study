import React, { Component } from 'react'

function Cart(props) {
  return (
    <table>
      <tbody>
        {props.data.map(d => {
          return <tr key={d.text} onClick={() => props.onSelect(d.text)}>
            <td>{d.text}</td>
            <td>{d.count}</td>
            <td>¥{d.price * d.count}</td>
          </tr>
        })}
      </tbody>
    </table>
  )
}


export default class CartSample extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '开课吧',
      showTitle: true,
      goods: [
        { text: '百万年薪架构师', price: 100, id: 1 },
        { text: 'web全栈架构师', price: 80, id: 2 },
        { text: 'Python爬虫', price: 60, id: 3 }
      ],
      cart: []
    }
    setTimeout(() => {
      this.setState({
        showTitle: false
      })
    }, 2000)

    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    // this 指向 input（onChange={this.handleChange}）
    // 可以用bind进行绑定作用域
  }
  // 推荐使用的方式
  handleChange1 = (e) => {
    // this 指向 作用域本身 （onChange={this.handleChange}）
    this.setState({ name: e.target.value })
  }
  addGood = () => {
    this.setState({
      goods: [...this.state.goods, {text: this.state.name, price: 666, id: (this.state.goods.length + 1) }]
    })
  }
  addCart(good) {
    const item = this.state.cart.find(c => c.text === good.text)
    if (item) {
      item.count += 1
      this.setState({cart: [...this.state.cart]})
    } else {
      this.setState({cart: [...this.state.cart, { ...good, count: 1}]})
    }
  }
  // 子父通信
  onSelect = name => {
    console.log(name)
  }
  render() {
    const goods = this.state.goods.map(good => 
    <li key={good.id}>
      {good.text}
      <button onClick={() => this.addCart(good)}>加入购物车</button>
    </li>
    )
    // 循环操作
    return (
      <div>
        {/* 条件语句 */}
        {this.state.showTitle && <h1>{this.state.name}</h1>}
        {/* 事件处理 */}
        <div>
          {/* react中单向数据流 */}
          <input
          type="text"
          value={this.state.name}
          // 三种写法，哪些是可以使用
          // 传参比较方便
          onChange={e => this.handleChange1(e)}
          // 这样调用的话，this
          // onChange={this.handleChange}
          // 立即执行，表示还未做什么就执行了。这样是不行的。
          // onChange={this.handleChange(e)}
          />
          <button onClick={e => this.addGood()}>添加</button>
        </div>
        <ul>
          {/* {this.state.goods.map(good => <li key={good.text}>{good.text}</li>)} */}
          {goods}
        </ul>
        {/* 购物车 */}
        <Cart data={this.state.cart} onSelect={this.onSelect}></Cart>

      </div>
    )
  }
}
