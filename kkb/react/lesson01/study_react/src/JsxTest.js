import React, { Component } from 'react'
import logo from './logo.svg'
import './jsxTest.css'

function formatName(user) {
    return user.firstName + '-' + user.lastName
}
export default class JsxTest extends Component {
    render() {
        const name = 'Jerry'
        const greet = <p>hello, jerry</p>
        return (
            <div>
                {/* 表达式 合法的js表达式即可 */}
                <h1>{name}</h1>
                {/* 函数也是表达式 */}
                <p>{formatName({firstName: 'tom', lastName: 'chen'})}</p>
                {/* jsx也是表达式 */}
                {greet}
                {/* 属性  className htmlFor*/}
                <img src={logo} style={{width: '100px'}} alt='logo' className={'img'}/>
                {/* <label htmlFor='ff'>fff</label> */}
            </div>
        )
    
    }
}

