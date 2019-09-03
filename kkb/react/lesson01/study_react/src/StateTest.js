import React, { Component } from 'react'

class Clock extends Component {
  // 方法一：state 申明复制
  // constructor(props) {
  //   super(props)
  //   this.state = { date: new Date()}
  // }
  // 方法二：state 声明复制
  state = { date: new Date(), counter: 1}
  componentDidMount() {
    this.timer = setInterval(() => {
      // setState修改状态
      this.setState({date: new Date()})
    }, 1000)

    // 面试题1 - 批量操作问题：对同一个key多次操作会合并，只会执行最后一次
    this.setState({counter: this.state.counter + 1})
    this.setState({counter: this.state.counter + 1})
    this.setState({counter: this.state.counter + 1}, () => {
      console.log('cb:' + this.state.counter) // 2
    })
    console.log(this.state.counter) // 1

    // A1、立即获取操作过的值，使用回调函数（React机制）
    this.setState((prevState) => {
      console.log(prevState.counter) // 2
      return prevState.counter
    })
    // A2、定时器：跟事件循环有关（React机制）
    setTimeout(() => {
      console.log(this.state.counter) // 2
    })
    // A3、原生事件
    document.body.addEventListener('click', this.changeCounter)
  }

  changeCounter = () => {
    this.setState({counter: this.state.counter + 1})
    console.log(this.state.counter) // 3
  }
  // 将来要被拆卸
  // 生命周期里是异步执行的
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  render() {
    return (
      <div>
        {this.state.date.toLocaleTimeString()}
        <p>{this.state.counter}</p>
      </div>
    )
  }
}

export default class StateTest extends Component {

  render() {
    return (
      <div>
        <Clock />
      </div>
    )
  }
}
