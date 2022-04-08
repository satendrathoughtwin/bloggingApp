import chalk from "chalk";
import BlogModel from "../model/blogModel.js";

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
  const { likerId, userId, blogId } = req.body;
  try {
    const result = await User.findOneAndUpdate(
      {
        _id: blogId,
        userEmail: userId,
      },
      { new: true }
    );

    if (result) {
      res.status(200).json({
        status: true,
        statusCode: 200,
        message: "New Like is added",
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

const disLike = async (req, res) => {
  const { likerId, userId, blogId } = req.body;
  try {
    const result = await User.findOneAndUpdate(
      {
        _id: blogId,
        userEmail: userId,
      },
      { new: true }
    );

    if (result) {
      res.status(200).json({
        status: true,
        statusCode: 200,
        message: "existing like has changed in dislike",
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

const Addcomment = async (req, res) => {
  const { commenterId, commenterMessage, blogId, bloggerId } = req.body;
  try {
    const result = await User.findOneAndUpdate(
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
        message: "New Comment is added",
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

const updateComment = async (req, res) => {
  const { commenterId, commenterMessage, blogId, bloggerId } = req.body;
  try {
    const result = await User.findOneAndUpdate(
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

const deleteComment = async (req, res) => {
  const { commenterId, commenterMessage, blogId, bloggerId } = req.body;
  try {
    const result = await User.findOneAndUpdate(
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

const search_filter_pagination = async (req, res) => {
  const { commenterId, commenterMessage, blogId, bloggerId } = req.body;
  try {
    const result = await User.findOneAndUpdate(
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
};
