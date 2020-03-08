import { mongoose } from "../";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CountSchema = new Schema({
  count: Number,
  time: [String]
});
const Count = mongoose.model("Count", CountSchema);
console.log(`count ${Count.count}`);

export { Count };
