import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import CompType from './CompType';
import StateTest from './StateTest';
import JsxTest from './JsxTest';
import CartSample from './CartSample'


function App() {
  return (
    <div className="App">
      {/* 自定义组件，开头大写 */}
      {/* <JsxTest /> */}
      {/* 组件类型 */}
      {/* <CompType /> */}
      {/* 状态 */}
      {/* <StateTest /> */}
      {/* 购物车 */}
      <CartSample />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
