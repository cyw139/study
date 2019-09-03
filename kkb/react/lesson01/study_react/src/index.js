import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// 2、新代码，添加html代码，只能渲染一次；解决，如下【3】所示：
// ReactDOM.render(<h1>React Study</h1>, document.getElementById('root'));

// 3、定时更新，方法一，用于演示，不会在项目中用
// let count = 1
// render()
// setInterval(render, 1000)
// function render() {
//   ReactDOM.render(<h1>React Study, {count++}</h1>, document.getElementById('root'));
// }

// 4、jsx（js和html的混合体） >  React.createElement() > vdom
ReactDOM.render(<App />, document.getElementById('root')); // 类似Vue中$mount挂载操作


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
