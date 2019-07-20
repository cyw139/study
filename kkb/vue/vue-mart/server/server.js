/**
 * Node koa 服务器代码
 *
 * 安装依赖：npm i koa koa-router jsonwebtoken koa-jwt
 *
 * + koa-jwt@3.6.0
 * + koa@2.7.0
 * + jsonwebtoken@8.5.1
 * + koa-router@7.4.0
 *
 * 启动：cd server && node ./server.js
 */
const Koa = require("koa"); // 定义api
const Router = require("koa-router"); // 定义api
const jwt = require("jsonwebtoken"); // 签发令牌
const jwtAuth = require("koa-jwt"); // 校验

const secret = "it's a secret"; // 密钥

const app = new Koa();
const router = new Router();

router.get('/api/login', async ctx => {
  const {username, password} = ctx.query
  console.log(username, password)
  if (username === "kaikeba" && password === '123') {
    // 生成令牌
    const token = jwt.sign(
      {
        data: {name: "kaikeba"},// 用户信息数据，不能存放敏感数据
        exp: Math.floor(Date.now() / 1000) + 60 * 60 // 过朗时间
      },
      secret
    )
    ctx.body = {code: 1, token}
  } else {
    ctx.status = 401
    ctx.body = { code: 0, message: "用户名或者密码错误"}
  }
});

router.get(
  "/api/userinfo",
  jwtAuth({secret}), // koa-jwt ，必须通过校验
  async ctx => {
    ctx.body = {code: 1, data: {name: "jerry", age: 20}};
  }
)
app.use(router.routes())
app.listen(3000)
