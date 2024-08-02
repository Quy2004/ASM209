import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const emailOrPhoneExists = await UserModel.findOne({
      $or: [{ email }, { phone }],
    }).exec();

    if (emailOrPhoneExists) {
      return res.status(400).json({
        message: "Email or phone exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await new UserModel({
      name,
      email,
      phone,
      password: hashedPassword,
    }).save();

    res.json({
      status: true,
      message: "Register successfully",
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error, please try again", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check email registered
    const findUser = await UserModel.findOne({ email }).exec();

    if (!findUser) {
      return res.status(404).json({ message: "Unregistered account!" });
    }

    // check password
    const isPasswordValid = await bcrypt.compare(password, findUser.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Wrong password!" });
    }

    const token = jwt.sign(
      {
        id: findUser._id,
        email: findUser.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({
      user: findUser,
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error, please try again",
      error: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;

    const user = await UserModel.findOne({ email }).exec();

    if (!user) {
      return res
        .status(400)
        .json({ message: "Unregistered account!", status: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 5 * 60,
    });

    user.passwordResetToken = token;
    await user.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: "587",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: user.email,
      subject: "Reset Password",
      text: `To reset your password, click on the following link: http://localhost:5173/reset-password?token=${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to send reset email!", status: false });
      }
      res.status(200).json({ message: "Reset email sent!", status: true });
    });
  } catch (err) {
    res.status(400).json({
      message: "Error, please try again",
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (password !== confirmPassword) {
      return res
        .status(404)
        .json({ message: "Mật khẩu và mật khẩu xác nhận không trùng khớp" });
    }

    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (data && data.id) {
      // reset password
      const user = await UserModel.findOne({ passwordResetToken: token });
      if (user) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        user.passwordResetToken = null;
        await user.save();

        return res.json({
          status: true,
        });
      }

      return res.json({
        status: false,
      });
    }

    res.json({
      status: false,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error, please try again",
      error: error.message,
    });
  }
};
