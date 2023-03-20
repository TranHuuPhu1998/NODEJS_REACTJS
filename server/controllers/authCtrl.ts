import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  generateActiveToken,
  generateAccessToken,
  generateRefreshToken,
} from "../config/generateToken";
// import sendMail from '../config/sendMail'
import { validateEmail, validPhone } from "../middleware/vaild";
import { sendSms } from "../config/sendSMS";
import {
  IDecodedToken,
  IUser,
  IGgPayload,
  IUserParams,
} from "../config/interface";
import fetch from "node-fetch";
import { OAuth2Client } from "google-auth-library";
import * as yup from "yup";

const client = new OAuth2Client(`${process.env.MAIL_CLIENT_ID}`);

const CLIENT_URL = `${process.env.BASE_URL}`;

const authCtrl = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, account, password } = req.body;

      const user = await Users.findOne({ account });
      if (user)
        return res
          .status(400)
          .json({ msg: "Email or Phone number already exists." });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = { name, account, password: passwordHash };

      const active_token = generateActiveToken({ newUser });

      const url = `${CLIENT_URL}/active/${active_token}`;

      if (validateEmail(account)) {
        // sendMail(account, url, "Verify your email address")
        // return res.json({ msg: "Success! Please check your email." })
        // -----------
        const _user = new Users(newUser);
        await _user.save();
        return res.json({ msg: "Create account success!" });
      } else if (validPhone(account)) {
        sendSms(account, url, "Verify your phone number");
        return res.json({ msg: "Success! Please check phone." });
      }
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
  activeAccount: async (req: Request, res: Response) => {
    try {
      const { active_token } = req.body;

      const decoded = <IDecodedToken>(
        jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)
      );

      const { newUser } = decoded;

      if (!newUser)
        return res.status(400).json({ msg: "Invalid authentication." });

      const user = await Users.findOne({ account: newUser.account });
      if (user) return res.status(400).json({ msg: "Account already exists." });

      const new_user = new Users(newUser);

      await new_user.save();

      res.json({ msg: "Account has been activated!" });
    } catch (error: any) {
      let errMsg;

      if (error.code === 11000) {
        errMsg = Object.keys(error.keyValue)[0] + " already exists.";
      } else {
        let name = Object.keys(error.errors)[0];
        errMsg = error.errors[`${name}`].message;
      }

      return res.status(500).json({ msg: errMsg });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { account, password } = req.body;

      const user = await Users.findOne({ account });
      if (!user)
        return res.status(400).json({ msg: "This account does not exits." });
      // if user exists
      loginUser(user, password, res);
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie("refreshtoken", { path: `/api/refresh_token` });
      return res.json({ msg: "Logged out!" });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
  refreshToken: async (req: Request, res: Response) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please login now!" });

      const decoded = <IDecodedToken>(
        jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`)
      );
      if (!decoded.id)
        return res.status(400).json({ msg: "Please login now!" });

      const user = await Users.findById(decoded.id).select("-password");
      if (!user)
        return res.status(400).json({ msg: "This account does not exist." });

      const access_token = generateAccessToken({ id: user._id });

      res.json({ access_token, user });
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
  googleLogin: async (req: Request, res: Response) => {
    try {
      const { id_token } = req.body;
      const verify = await client.verifyIdToken({
        idToken: id_token,
        audience: `${process.env.MAIL_CLIENT_ID}`,
      });

      const { email, email_verified, name, picture } = <IGgPayload>(
        verify.getPayload()
      );

      if (!email_verified)
        return res.status(500).json({ msg: "Email verification failed." });

      const password = email + "your google secrect password";
      const passwordHash = await bcrypt.hash(password, 12);

      const user = await Users.findOne({ account: email });

      if (user) {
        loginUser(user, password, res);
      } else {
        const user = {
          name,
          account: email,
          password: passwordHash,
          avatar: picture,
          type: "google",
        };
        registerUser(user, res);
      }
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
  facebookLogin: async (req: Request, res: Response) => {
    try {
      const { accessToken, userID } = req.body;

      const URL = ` https://graph.facebook.com/v3.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken} `;

      const data = await fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          return res;
        });

      const { email, name, picture } = data;

      const password = email + "your facebook secrect password";
      const passwordHash = await bcrypt.hash(password, 12);

      const user = await Users.findOne({ account: email });

      if (user) {
        loginUser(user, password, res);
      } else {
        const user = {
          name,
          account: email,
          password: passwordHash,
          avatar: picture.data.url,
          type: "facebook",
        };
        registerUser(user, res);
      }
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

const loginUser = async (user: IUser, password: string, res: Response) => {
  const isMatch = await bcrypt.compare(password, user.password);

  try {
    if (!isMatch) {
      let msgError =
        user.type === "register"
          ? "Password is inCorrect"
          : `Password is inCorrect . This account login with ${user.type}`;

      return res.status(400).json({ msg: msgError });
    }

    const access_token = generateAccessToken({ id: user._id });
    const refresh_token = generateRefreshToken({ id: user._id });

    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: `/api/refresh_token`,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
    });

    res.json({
      msg: "Login Success!",
      access_token,
      refresh_token,
      user: {
        avatar: user.avatar,
        role: user.role,
        type: user.type,
        _id: user.id,
        name: user.name,
        account: user.account,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
};

enum GenderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}
const DATE_REGEX = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
const PASSWORD_REGEX = /^[a-zA-Z0-9]{8,}$/;
export const registerUserSchema = yup
  .object({
    birthDate: yup
      .string()
      .optional()
      .matches(DATE_REGEX, "birthDate must be in the format YYYY-MM-DD"),
    account: yup.string().required().email(),
    name: yup.string().trim().min(2).max(50),
    gender: yup
      .string()
      .optional()
      .oneOf([GenderEnum.MALE, GenderEnum.OTHER, GenderEnum.FEMALE]),
    password: yup
      .string()
      .matches(
        PASSWORD_REGEX,
        "password must contain only letters and numbers with a minimum of 8 characters"
      ),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), undefined],
        "confirmPassword doesn't match the password"
      ),
  })
  .required();

const registerUser = async (user: IUserParams, res: Response) => {
  try {
    const data = registerUserSchema.validateSync(user, {
      abortEarly: false,
      stripUnknown: true,
    });

    const newUser = new Users(data);
    await newUser.save();

    const access_token = generateAccessToken({ id: newUser._id });
    const refresh_token = generateRefreshToken({ id: newUser._id });

    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: `/api/refresh_token`,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
    });

    res.json({
      msg: "Login Success!",
      access_token,
      user: { ...newUser._doc, password: "" },
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
};

export default authCtrl;
