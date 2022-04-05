import mongoose from "mongoose";
import moment from "moment";
const date = moment().format("DD / MM / YYYY");
const time = moment().format("hh:mm:ss a");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true },
    password: String,
    profession : {type : String, default : "Blogger"},
    imgUrl: {
      type: String,
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
