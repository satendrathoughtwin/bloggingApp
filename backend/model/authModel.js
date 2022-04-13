import mongoose from "mongoose";
import moment from "moment";
const date = moment().format("DD / MM / YYYY");
const time = moment().format("hh:mm:ss a");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, trim: true },
    number: { type: Number, unique: true, trim: true },
    followers: { type: Array, default: [] },
    following: { type: Array, default: [] },
    profession: { type: String, default: "Blogger", trim: true },
    imgUrl: {
      type: String,
      trim: true,
      default: "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
    },
    date: { type: String, default: date },
    time: { type: String, default: time },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export { User };
