import chalk from "chalk";
import { User } from "../model/authModel.js";
import generatetoken from "../utils/generateWebToken.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    const userIsExist = await User.findOne({ email });
    if (userIsExist) {
      res.status(200).json({
        status: "success",
        statusCode: 200,
        userExist : true,
        message: "User is already exist",
        data: userIsExist,
      });
      return;
    }
    const result = await userData.save();
    if (result) {
      res.status(200).json({
        status: "success",
        statusCode: 200,
        length: result.length,
        message: "User created successfully",
        data: result,
      });
    }
  } catch (err) {
    console.log(chalk.redBright(`${err.message}`));
    res.status(200).json({
      status: "fail",
      statusCode: 200,
      message: "User hasn't created successfully",
      error: err.message,
    });
  }
};

const signInUser = async (req, res) => {
  const { email, password } = req.body;

  try{


    let result = await User.findOne({ email })
    if(!result)
    {
      console.log("invalid credentials")
      res.status(200).json({
        status : "fail",
        statusCode : 200,
        wrongCredential : true,
        message :"user not exist / invalid credentials"
      })
      return
    }
    const match = await bcrypt.compare(password, result.password);
    if(!match){
      console.log("invalid credentials")
      res.status(200).json({
        status : "fail",
        statusCode : 200,
        wrongCredential : true,
        message :"invalid credentials"
      })
      return
    }
    else{
      const token = await generatetoken(result._id,email)
      result  = {result, token}
      console.log(result)
  
      res.status(200).json({
        status : "success",
        statusCode : 200,
        length : result.length,
        message :"user loggedIn",
        data : {result}
      })
    }
  
  }
   
   catch (err) {
    console.log(chalk.redBright(err))
    res.status(400).json({
        status: "fail",
        statusCode: 400,
        Error :  err.message, 
     
      })
  }
};


const updateUser = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      req.body,
      {
        new: true,
      }
    );
    if (result) {
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "user updated successfully",
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


const getUserById = async (req, res) => {
  console.log(req.params.userId)
  try {
    const result = await User.find({ _id: req.params.userId });
    if (result.length > 0) {
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: " user found Successfully",
        listlength: result.length,
        data: result,
      });
    } else {
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "user is not found",
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

export { registerUser, signInUser, updateUser,getUserById };
