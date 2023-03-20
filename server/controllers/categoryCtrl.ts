import { Request, Response } from "express";
import Category from "../models/categoryModal";
import { IReqAuth } from "../config/interface";
import log from "../utils/logger";

const Pagination = (req: IReqAuth) => {
  let page = Number(req.query.page) * 1 || 1;
  let limit = Number(req.query.limit) * 1 || 4;
  let skip = (page - 1) * limit;

  return { page, limit, skip };
};

const categoryCtrl = {
  createCategory: async (req: IReqAuth, res: Response) => {
    console.time('START createCategory');

    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication User." });

    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Invalid Authentication Admin." });

    try {
      console.time('START createCategory');
      const name = req.body.name.toLowerCase();
      const user = req.user._id;
      const rows = new Category({ name, user });

      await rows.save();

      console.timeEnd('START createCategory');

      return res.json({ rows });

    } catch (err: any) {
      let errMsg;

      if (err.code === 11000) {
        errMsg = Object.values(err.keyValue)[0] + " already exists.";
      } else {
        const name = Object.keys(err.errors)[0];
        errMsg = err.errors[`${name}`].message;
      }
      return res.status(500).json({ msg: errMsg });
    }

  },
  getCategories: async (req: Request | any, res: Response) => {
    const { limit, page } = Pagination(req);
    const options = {
      page: page,
      limit: limit,
      sort: { _id: 1, createdAt: -1 },
    };
    try {
      let query = [];
      if (req.query.name) {
        query.push({ name: { $regex: `.*${req.query.name}.*`, $options: 'i' } });
      } else {
        query = [{ _id: { $exists: true } }];
      }

      const condition = Category.aggregate([
        { $match: { $and: query } },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "userName",
          },
        },
        {
          $addFields: {
            userName: { $arrayElemAt: ["$userName.name", 0] }
          }
        },
      ]);
      const categories = await Category.aggregatePaginate(condition, options);
      return res.json({
        rows: categories,
      });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCategory: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      const _id = req.params.id;
      const category = await Category.findByIdAndUpdate(
        _id,
        { name: req.body.name.toLowerCase() },
        { new: true }
      );

      res.json({ rows: category });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCategory: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      await Category.findByIdAndDelete(req.params.id);

      res.json({ msg: "Delete Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default categoryCtrl;
