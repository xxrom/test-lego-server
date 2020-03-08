import { mongoose } from "../";

const Schema = mongoose.Schema;

const CountSchema = new Schema({
  count: Number,
  time: [String]
});
const Count = mongoose.model("Count", CountSchema);
console.log(`count ${Count ? Count.count : "UNDEFINED!!!"}`);

export { Count };
