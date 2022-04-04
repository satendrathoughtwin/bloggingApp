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
  console.log("userEmail ::----->",req.params.userEmail)
  try {
    const result = await BlogModel.find({ userEmail: req.params.userEmail });
    if (result.length > 0) {
      console.log(result)
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
  console.log("req.body", req.body);
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

export {
  createBlog,
  getAllBlog,
  getBlogById,
  deleteBlog,
  updateBlog,
  getBlogByUserEmail,
};
