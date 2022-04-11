import chalk from "chalk";
import BlogModel from "../model/blogModel.js";
import { resDataFuc } from "../utils/commanFunction.js";

const createBlog = async (req, res) => {
  const blogData = new BlogModel(req.body);
  try {
    const result = await blogData.save();
    if (result) {
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "blog created successfully",
        data: result,
      });
    }
  } catch (err) {
    console.log(chalk.redBright(err.message));
    res.status(400).json({
      status: "fail",
      statusCode: 400,
      message: err.message,
    });
  }
};

const getAllBlog = async (req, res) => {
  try {
    const result = await BlogModel.find();
    if (result.length > 0) {
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "blog list find Successfully",
        listlength: result.length,
        data: result,
      });
    } else {
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "blog list is Empty",
        listlength: result.length,
        data: result,
      });
    }
  } catch (err) {
    console.log(chalk.redBright(err.message));
    res.status(400).json({
      status: "fail",
      statusCode: 400,
      message: err.message,
    });
  }
};

const getBlogById = async (req, res) => {
  try {
    const result = await BlogModel.find({ _id: req.params.Id });
    if (result.length > 0) {
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "blog list find Successfully",
        listlength: result.length,
        data: result,
      });
    } else {
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "blog list is not found",
        listlength: result.length,
        data: result,
      });
    }
  } catch (err) {
    console.log(chalk.redBright(err.message));
    res.status(400).json({
      status: "fail",
      statusCode: 400,
      message: err.message,
    });
  }
};

const getBlogByUserEmail = async (req, res) => {
  try {
    const result = await BlogModel.find({ userEmail: req.params.userEmail });
    if (result.length > 0) {
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "blog list find Successfully by Email",
        listlength: result.length,
        data: result,
      });
    } else {
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "blog list is not found by Email",
        listlength: result.length,
        data: result,
      });
    }
  } catch (err) {
    console.log(chalk.redBright(err.message));
    res.status(400).json({
      status: "fail",
      statusCode: 400,
      message: err.message,
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const result = await BlogModel.findByIdAndDelete({ _id: req.params.Id });
    if (result) {
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "blog deleted successfully",
        data: result,
      });
    }
  } catch (err) {
    console.log(chalk.redBright(err.message));
    res.status(400).json({
      status: "fail",
      statusCode: 400,
      message: err.message,
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const result = await BlogModel.findByIdAndUpdate(
      { _id: req.params.Id },
      req.body,
      {
        new: true,
      }
    );
    if (result) {
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "blog updated successfully",
        data: result,
      });
    }
  } catch (err) {
    console.log(chalk.redBright(err.message));
    res.status(400).json({
      status: "fail",
      statusCode: 400,
      message: err.message,
    });
  }
};

const like = async (req, res) => {
  const { myProfileId, myProfileEmail, likerProfileEmail } = req.body;
  let message, length;
  try {
    const allreadyInMyLikeList = await BlogModel.findOne({
      _id: myProfileId,
      like: { $in: [likerProfileEmail] },
    });

    const myLikeListResult =
      !allreadyInMyLikeList &&
      (await BlogModel.findOneAndUpdate(
        {
          _id: myProfileId,
          userEmail: myProfileEmail,
        },
        {
          $push: { like: likerProfileEmail },
        },
        { new: true }
      ));

    myLikeListResult
      ? ((message = "new Like is added"), (length = myLikeListResult.length))
      : (message = "like is already exist");
    myLikeListResult
      ? resDataFuc(res, true, 200, true, message, length, false)
      : resDataFuc(res, true, 203, false, message, length, false);
  } catch (err) {
    console.log(chalk.redBright(err.message));
    resDataFuc(res, false, 400, false, message, length, false, err.message);
  }
};

const isIN_MY_Like_List = async (req, res) => {
  const { myProfileId, likerProfileEmail } = req.body;
  let message, length;
  try {
    const allreadyInMyLikeList = await BlogModel.findOne({
      _id: myProfileId,
      like: { $in: [likerProfileEmail] },
    });
    allreadyInMyLikeList
      ? (message = "like is exist")
      : (message = "like isn't exist");
    allreadyInMyLikeList
      ? resDataFuc(res, true, 200, true, message, 1, false)
      : resDataFuc(res, true, 203, false, message, length, false);
  } catch (err) {
    console.log(chalk.redBright(err.message));
    resDataFuc(res, false, 400, false, message, length, false, err.message);
  }
};

const disLike = async (req, res) => {
  const { myProfileId, myProfileEmail, likerProfileEmail } = req.body;
  let message, length;
  try {
    const myLikeListResult = await BlogModel.findOneAndUpdate(
      {
        _id: myProfileId,
        email: myProfileEmail,
      },
      {
        $pullAll: { like: [likerProfileEmail] },
      },
      { new: true }
    );

    myLikeListResult
      ? ((message = "liker has leaved"), (length = myLikeListResult.length))
      : (message = "liker has already leaved");
    myLikeListResult
      ? resDataFuc(res, true, 200, true, message, length, false)
      : resDataFuc(res, true, 203, false, message, length, false);
  } catch (err) {
    console.log(chalk.redBright(err.message));
    resDataFuc(res, false, 400, false, message, length, false, err.message);
  }
};

const addComment = async (req, res) => {
  const { myProfileId, myProfileEmail, comment } = req.body;
  let message, length;
  try {
    const myCommentListResult = await BlogModel.findOneAndUpdate(
      {
        _id: myProfileId,
        email: myProfileEmail,
      },
      {
        $push: { comment },
      },
      { new: true }
    );

    myCommentListResult
      ? ((message = "new follower/following is added"),
        (length = myCommentListResult.length))
      : (message = "follower/following is already exist");
    myCommentListResult
      ? resDataFuc(res, true, 200, true, message, length, false)
      : resDataFuc(res, true, 203, false, message, length, false);
  } catch (err) {
    console.log(chalk.redBright(err.message));
    resDataFuc(res, false, 400, false, message, length, false, err.message);
  }
};

const updateComment = async (req, res) => {
  const { myProfileId, myProfileEmail, commentId, comment } = req.body;
  try {
    const myCommentListResult = await BlogModel.findOneAndUpdate(
      {
        _id: myProfileId,
        userEmail: myProfileEmail,
        "$comment.id": `${commentId}`,
      },

      {
        $set: {
          "comment.$.comment": `${comment}`,
        },
      },
      { new: true }
    );

    myCommentListResult
      ? ((message = "new follower/following is added"),
        (length = myCommentListResult.length))
      : (message = "follower/following is already exist");
    myCommentListResult
      ? resDataFuc(res, true, 200, true, message, length, false)
      : resDataFuc(res, true, 203, false, message, length, false);
  } catch (err) {
    console.log(chalk.redBright(err.message));
    resDataFuc(res, false, 400, false, message, length, false, err.message);
  }
};

const deleteComment = async (req, res) => {
  const { myProfileId, myProfileEmail, commentId } = req.body;
  let message, length;
  try {
    const myCommentListResult = await BlogModel.findOneAndUpdate(
      {
        _id: myProfileId,
        email: myProfileEmail,
      },
      {
        $pullAll: {
          Comment: [{ _id: commentId }],
        },
      },
      { new: true }
    );

    myCommentListResult
      ? ((message = "new follower/following is added"),
        (length = myCommentListResult.length))
      : (message = "follower/following is already exist");
    myCommentListResult
      ? resDataFuc(res, true, 200, true, message, length, false)
      : resDataFuc(res, true, 203, false, message, length, false);
  } catch (err) {
    console.log(chalk.redBright(err.message));
    resDataFuc(res, false, 400, false, message, length, false, err.message);
  }
};

const search_filter_pagination = async (req, res) => {
  const { commenterId, commenterMessage, blogId, bloggerId } = req.body;
  try {
    const result = await BlogModel.findOneAndUpdate(
      {
        _id: blogId,
        userEmail: bloggerId,
      },
      { new: true }
    );

    if (result) {
      res.status(200).json({
        status: true,
        statusCode: 200,
        message: "Exisitng Comment has updated",
        data: result,
      });
    }
  } catch (err) {
    console.log(chalk.redBright(err.message));
    res.status(400).json({
      status: false,
      statusCode: 400,
      error: err.message,
    });
  }
};

export {
  createBlog,
  getAllBlog,
  getBlogById,
  deleteBlog,
  updateBlog,
  getBlogByUserEmail,
  like,
  disLike,
  isIN_MY_Like_List,
  addComment,
  deleteComment,
  updateComment,
};
