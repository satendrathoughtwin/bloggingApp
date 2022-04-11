import mongoose from "mongoose";
import moment from "moment";
const date_Time = moment().format("MMMM Do YYYY, h:mm:ss a");

const blogSchema = new mongoose.Schema(
  {
    userEmail: String,
    title: String,
    description: String,
    imgUrl: String,
    like: { type: Array, default: [] },
    comment: {
      type: Array,
      default: [
        {
          commenterId: String,
          commenterEmail: String,
          comment: String,
        },
      ],
    },
    date_Time: { type: String, default: date_Time },
  },
  { timestamps: true }
);

const BlogModel = mongoose.model("Blog", blogSchema);
export default BlogModel;
