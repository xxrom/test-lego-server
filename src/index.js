import Koa from "koa";
console.log("hello");
const app = new Koa();

app.use(async ctx => {
  ctx.body = "Hello World";
});

app.listen(process.env.PORT || "4444");
