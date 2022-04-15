import chalk from "chalk";
import { User } from "../model/authModel.js";
import generatetoken from "../utils/generateWebToken.js";
import bcrypt from "bcrypt";
import sendEmail from "../utils/email.js";
import sendMessage from "../utils/message.js";
import { resDataFuc } from "../utils/commanFunction.js";
let varificationCode = Math.floor(Math.random() * 1000000 + 1);

const registerUser = async (req, res) => {
  const { name, email, password, number } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = new User({
    name,
    email,
    password: hashedPassword,
    number,
  });

  try {
    const userIsExist = await User.findOne({ email });
    if (userIsExist) {
      res.status(200).json({
        status: "success",
        statusCode: 200,
        userExist: true,
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

  try {
    let result = await User.findOne({ email });
    if (!result) {
      res.status(200).json({
        status: "fail",
        statusCode: 200,
        wrongCredential: true,
        message: "user not exist / invalid credentials",
      });
      return;
    }
    const match = await bcrypt.compare(password, result.password);
    if (!match) {
      res.status(200).json({
        status: "fail",
        statusCode: 200,
        wrongCredential: true,
        message: "invalid credentials",
      });
      return;
    } else {
      const token = await generatetoken(result._id, email);
      const { name, number, _id } = result;
      const finalResult = { _id, name, number, email: result.email, token };
      res.status(200).json({
        status: "success",
        statusCode: 200,
        length: result.length,
        message: "user loggedIn",
        data: finalResult,
      });
    }
  } catch (err) {
    console.log(chalk.redBright(err));
    res.status(400).json({
      status: "fail",
      statusCode: 400,
      Error: err.message,
    });
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

const getUserByEmail = async (req, res) => {
  try {
    const result = await User.find({ email: req.params.email });
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

const email_Number_Varification = async (req, res) => {
  const { emailNumberVarification, type } = req.body;
  const subject = "Verification Code Of Forget Password For Blog App ";
  const html = `<p>You have forgot your login Password, So you are trying to generate new Password</p><h4> You varification code is :</h4> <h1>${varificationCode}</h1>`;
  const msg = `You have forgot your login Password, So you are trying to generate new Password,
  You varification code is : ${varificationCode}`;
  try {
    let messageResult;
    let emailResult;
    if (typeof type === "string") {
      const findEmailInDb = await User.findOne({
        email: emailNumberVarification,
      });
      if (findEmailInDb)
        emailResult = await sendEmail(
          subject,
          html,
          process.env.RECEIVER_EMAIL
        );
    } else if (typeof type === "number") {
      const findNumberInDb = await User.findOne({
        number: emailNumberVarification,
      });
      if (findNumberInDb) {
        messageResult = await sendMessage(msg, process.env.RECEIVER_MOBILE_NO);
        res.status(200).json({
          status: true,
          statusCode: 200,
          isProceed : true,
          message: "Number is registerd",
        });
        return;
      } else {
        res.status(203).json({
          status: true,
          statusCode: 203,
          isProceed : false,
          message: "Number is not registerd",
        });
        return;
      }
    }

    if ((messageResult && emailResult) || messageResult || emailResult) {
      res.status(200).json({
        status: true,
        statusCode: 200,
        isProceed : true,
        message: `varification code has sent on your registered mobile ${process.env.RECEIVER_MOBILE_NO} and Email ${process.env.RECEIVER_EMAIL}`,
      });
      return;
    } else {
      res.status(204).json({
        status: true,
        statusCode: 204,
        isProceed : false,
        message: `Mobile and Email has not found`,
      });
      return;
    }
  } catch (err) {
    res.status(400).json({
      status: true,
      statusCode: 400,
      message: err.message,
    });
    return;
  }
};

const verify_Verification_Code = async (req, res) => {
  const { otp } = req.body;

  if (parseInt(otp) !== varificationCode) {
    res.status(200).json({
      status: false,
      statusCode: 200,
      changePasswordPermission: false,
      message: "Wrong Verification code",
    });
    return;
  } else {
    res.status(200).json({
      status: true,
      statusCode: 200,
      changePasswordPermission: true,
      message: "Code Verification is successfull",
    });
    return;
  }
};

const forgetPassword = async (req, res) => {
  const { userId, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    let result;
    if (typeof userId === "string") {
      result = await User.updateOne(
        { email: userId },
        { password: hashedPassword },
        {
          new: true,
        }
      );
    }
    if (typeof userId === "number") {
      result = await User.updateOne(
        { number: userId },
        { password: hashedPassword },
        {
          new: true,
        }
      );
    }
    if (result) {
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "user Password has updated successfully",
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

const follow = async (req, res) => {
  const { myProfileId, myProfileEmail, otherProfileId, otherProfileEmail } =
    req.body;
  let message, length;
  try {
    const allreadyInOtherFollowerList = await User.findOne({
      _id: otherProfileId,
      followers: { $in: [myProfileEmail] },
    });
    const allreadyInMyFollwingList = await User.findOne({
      _id: myProfileId,
      following: { $in: [otherProfileEmail] },
    });

    const otherFollowerListResult =
      !allreadyInOtherFollowerList &&
      (await User.findOneAndUpdate(
        {
          _id: otherProfileId,
          email: otherProfileEmail,
        },
        {
          $push: { followers: myProfileEmail },
        },
        { new: true }
      ));

    const myFollowingListResult =
      !allreadyInMyFollwingList &&
      (await User.findOneAndUpdate(
        {
          _id: myProfileId,
          email: myProfileEmail,
        },
        {
          $push: { following: otherProfileEmail },
        },
        { new: true }
      ));

    otherFollowerListResult && myFollowingListResult
      ? ((message = "new follower/following is added"),
        (length = otherFollowerListResult.length))
      : (message = "follower/following is already exist");
    otherFollowerListResult && myFollowingListResult
      ? resDataFuc(res, true, 200, true, message, length, false)
      : resDataFuc(res, true, 203, false, message, length, false);
  } catch (err) {
    console.log(chalk.redBright(err.message));
    resDataFuc(res, false, 400, false, message, length, false, err.message);
  }
};

const isIN_MY_Following_And_Follower_List = async (req, res) => {
  const { myProfileId, myProfileEmail, otherProfileId, otherProfileEmail } =
    req.body;
  let message, length;
  try {
    const allreadyInOtherFollowerList = await User.findOne({
      _id: otherProfileId,
      followers: { $in: [myProfileEmail] },
    });
    const allreadyInMyFollwingList = await User.findOne({
      _id: myProfileId,

      following: { $in: [otherProfileEmail] },
    });

    allreadyInOtherFollowerList && allreadyInMyFollwingList
      ? (message = "follower/following is exist")
      : (message = "follower/following isn't exist");
    allreadyInOtherFollowerList && allreadyInMyFollwingList
      ? resDataFuc(res, true, 200, true, message, 1, false)
      : resDataFuc(res, true, 203, false, message, length, false);
  } catch (err) {
    console.log(chalk.redBright(err.message));
    resDataFuc(res, false, 400, false, message, length, false, err.message);
  }
};

const unfollow = async (req, res) => {
  const { myProfileId, myProfileEmail, otherProfileId, otherProfileEmail } =
    req.body;
  let message, length;
  try {
    const otherFollowerListResult = await User.findOneAndUpdate(
      {
        _id: otherProfileId,
        email: otherProfileEmail,
      },
      {
        $pullAll: { followers: [myProfileEmail] },
      },
      { new: true }
    );

    const myFollowingListResult = await User.findOneAndUpdate(
      {
        _id: myProfileId,
        email: myProfileEmail,
      },
      {
        $pullAll: { following: [otherProfileEmail] },
      },
      { new: true }
    );

    otherFollowerListResult && myFollowingListResult
      ? ((message = "existing follower/following has leaved"),
        (length = otherFollowerListResult.length))
      : (message = "follower/following has already leaved");
    otherFollowerListResult && myFollowingListResult
      ? resDataFuc(res, true, 200, true, message, length, false)
      : resDataFuc(res, true, 203, false, message, length, false);
  } catch (err) {
    console.log(chalk.redBright(err.message));
    resDataFuc(res, false, 400, false, message, length, false, err.message);
  }
};
export {
  registerUser,
  signInUser,
  updateUser,
  getUserById,
  forgetPassword,
  verify_Verification_Code,
  email_Number_Varification,
  getUserByEmail,
  follow,
  unfollow,
  isIN_MY_Following_And_Follower_List,
};
