import mongoose from "mongoose";
import moment from "moment";
const date = moment().format("DD / MM / YYYY");
const time = moment().format("hh:mm:ss a");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {type :String, required :true},
    password : String,
    date: { type: String, default: date },
    time: { type: String, default: time },
  },
  {
    timestamps: true,
  }
);


const User = mongoose.model("User",userSchema);
export {User}