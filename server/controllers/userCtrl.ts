import { Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import Users from "../models/userModel";
import bcrypt from "bcrypt";

const userCtrl = {
  getListUser: async (req: Request, res: Response) => {
    try {
      const user = await Users.find().select("-password");
      res.json({ rows: user });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUser: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(500).json({ msg: "Invalid Authentication." });
    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Invalid Authentication Admin." });

    try {
      const { name, old_password, new_password, account } = req.body;

      const user = await Users.findOne({ account });

      if (!user)
        return res.status(400).json({ msg: "This account does not exits." });

      const isMatch = await bcrypt.compare(old_password, user.password);

      if (!isMatch) {
        let msgError = "Password is wrong";
        return res.status(400).json({ msg: msgError });
      }

      const passwordHash = await bcrypt.hash(new_password, 12);

      const userUpdate = await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          name,
          password: passwordHash,
          account,
        }
      );

      res.json({ userUpdate });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUserAvatar: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(500).json({ msg: "Invalid Authentication." });

    try {
      const { avatar } = req.body;

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          avatar,
        }
      );

      res.json({ msg: "Update Success" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword: async (req: IReqAuth, res: Response) => {
    try {
      const {  old_password , new_password , account} = req.body;

      const user = await Users.findOne({ account });

      if (!user)
        return res.status(400).json({ msg: "This account does not exits." });

      const isMatch = await bcrypt.compare(old_password, user.password);

      if (!isMatch) {
        let msgError = "Password is wrong";
        return res.status(400).json({ msg: msgError });
      }

      const passwordHash = await bcrypt.hash(new_password, 12);

      await Users.findOneAndUpdate(
        { _id: user._id },
        {
          password: passwordHash,
        }
      );

      res.json({ msg: "Reset Password Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req: IReqAuth, res: Response) => {
    if (!req.user)
        return res.status(400).json({ msg: "Invalid Authentication." });

    // if (req.user.role)
    //     return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      const user = await Users.findById(req.user._id).select("-password");
      res.json({rows: user});
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default userCtrl;
