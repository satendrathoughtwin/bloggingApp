import mongoose from "mongoose";
import moment from "moment";
const date_Time = moment().format("MMMM Do YYYY, h:mm:ss a");

const blogSchema = new mongoose.Schema(
  {
    userEmail: { type: String, trim: true },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    imgUrl: { type: String, trim: true },
    like: { type: Array, default: [] },
    comment: [
      {
        commenterId: String,
        commenterEmail: String,
        comment: { type: String, trim: true },
      },
    ],
    date_Time: { type: String, default: date_Time },
  },
  { timestamps: true }
);

const BlogModel = mongoose.model("Blog", blogSchema);
export default BlogModel;
