import Koa from "koa";
import mongoose from "mongoose";

import { Count } from "./models/countModel";

const app = new Koa();
// TODO: hardcode =)
const ID = "5e6453d99ceaa1810b1d8d09";

const timeOptions = {
  era: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
  timezone: "UTC",
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
};

mongoose.connect(
  `mongodb+srv://test:${encodeURIComponent(
    "testadmin"
  )}@cluster0-kulk4.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("err", err => console.error("connection error:", err));
db.once("open", () => {
  console.log(`CONNECTED: We're connected!`);

  // const countInit = 0;
  // Create user
  // Count.create({
  //   count: countInit,
  //   time: [new Date().toLocaleDateString("en-GB")]
  // });
  // Find Count by email
  // Count.findOne({
  //   count: countInit
  // }).then(res => console.log(`res0 `, res));
  // // Find Count by email with the password field included
  // Count.findOne({
  //   count: 999
  // })
  //   .select("+time")
  //   .then(res => console.log(`res1`, res));
});

app.use(async ctx => {
  console.log(`app use get`);

  const data = await Count.find({ _id: ID });
  const count = Array.isArray(data) && data.length > 0 ? data[0].count : "NULL";
  const time = Array.isArray(data) && data.length > 0 ? data[0].time : [];

  Count.updateOne(
    {
      _id: ID
    },
    {
      $inc: { count: 0.5 },
      $set: {
        time: [...time, new Date().toLocaleDateString("en-GB", timeOptions)]
      }
    }
  )
    .then(res => console.log(`change res`, res))
    .catch(err => console.log(`err`, err));

  ctx.body = `Hello world / ${count}`;
});

app.listen(process.env.PORT || "4444");

export { mongoose };
