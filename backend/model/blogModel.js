import mongoose from "mongoose";
import moment from "moment";
const date_Time = moment().format("MMMM Do YYYY, h:mm:ss a");

const blogSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    imgUrl: String,
    date_Time: { type: String, default: date_Time },
  },
  { timestamps: true }
);

const BlogModel = mongoose.model("Blog", blogSchema);
export default BlogModel;
