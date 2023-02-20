import { Request, Response } from "express";
import Course from "../models/courseModal";
import Category from "../models/categoryModal";
import { IReqAuth } from "../config/interface";

const courseCtrl = {
  createCourse: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      const name = req.body.name.toLowerCase();
      const {categoryId,released,descriptions,imageBanner} = req.body;
      const category = await Category.findById(categoryId);
      const categoryItem = {id : category?._id , name : category?.name};

      const rows = new Course({ 
        user: req.user._id,
        createBy: req.user.name,
        name: name,
        category : categoryItem,
        released : released,
        descriptions : descriptions,
        imageBanner : imageBanner,
      });

      await rows.save();

      res.json({ rows });
      
    } catch (err: any) {
      let errMsg;

      if (err.code === 11000) {
        errMsg = Object.values(err.keyValue)[0] + " already exists.";
      } else {
        let name = Object.keys(err.errors)[0];
        errMsg = err.errors[`${name}`].message;
      }

      return res.status(500).json({ msg: errMsg });
    }
  },
  getCourses: async (req: Request, res: Response) => {
    try {
      const rows = await Course.find().sort("-createdAt");
      res.json({ rows });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getDetailCourses : async (req: Request, res: Response) => {
    try {
      const _id = req.params.id;

      const rows = await Course.findById(_id)
      res.json({ rows });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCourse: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      let _id = req.params.id;

      const name = req.body.name.toLowerCase();
      const {categoryId,released,descriptions,imageBanner} = req.body;

      await Course.findByIdAndUpdate(
        _id,
        {  
          user: req.user._id,
          name: name,
          categoryId : categoryId,
          released : released,
          descriptions : descriptions,
          imageBanner : imageBanner
        },
        { new: true }
      );

      res.json({ msg: "Update Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCourse: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      await Course.findByIdAndDelete(req.params.id);

      res.json({ msg: "Delete Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default courseCtrl;
