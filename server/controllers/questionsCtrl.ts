import { Request, Response } from "express";
import Question from "../models/questionsModal";
import Category from "../models/categoryModal";
import Course from "../models/courseModal";
import { IReqAuth } from "../config/interface";
import mongoose from 'mongoose'

const Pagination = (req: IReqAuth) => {
  let page = Number(req.query.page) * 1 || 1;
  let limit = Number(req.query.limit) * 1 || 4;
  let skip = (page - 1) * limit;

  return { page, limit, skip };
};

const QuestionCtrl = {
  createQuestion: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication User." });

    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Invalid Authentication Admin." });

    try {
      const { name, categoryId, answers, courseId} = req.body;
      const user = req.user._id;
      const category = await Category.findById(categoryId);
      const course = await Course.findById(courseId);
      const categoryItem = {id : category?._id , name : category?.name};

      const rows = new Question({
        name,
        category : categoryItem,
        courseId : courseId,
        answers,
        user,
      });

      await rows.save();

      const response = {
        name,
        category : categoryItem,
        courseName : course?.name,
        answers,
        user,
      }

      res.json({ rows : response });
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
  getQuestion: async (req: IReqAuth, res: Response) => {
    if (!req.user)
    return res.status(400).json({ msg: "Invalid Authentication User." });

    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Invalid Authentication Admin." });

    const { limit, page } = Pagination(req);
    const options = {
      page: page,
      limit: limit,
      sort: { _id: 1, createdAt: 1 },
    };
    try {
      let query = [];
      if (req.query.name) {
        query.push({ name: { $regex: `.*${req.query.name}.*` , $options : 'i'} });
      } else {
        query = [{ _id: { $exists: true } }];
      }

      const condition = Question.aggregate([
        { $match: { $and: query } },
        { $lookup: { from: "courses", localField: "courseId", foreignField: "_id", as: "courseName" } },
        { $addFields: { courseName: { $arrayElemAt: ["$courseName.name", 0] } } },
      ]);

      const questions = await Question.aggregatePaginate(condition, options);
      return res.json({ rows : questions });
      
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getQuestionsByCategory: async (req: Request, res: Response) => {
    try {
      const _id = req.params.id;
      const rows = await Question.aggregate([
        { $match : { "category.id" : mongoose.Types.ObjectId(_id) } }
      ]);

      res.json({ rows });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getQuestionByCourse : async (req: Request, res: Response) => {
    try {
      const _id = req.params.id;
      const rows = await Question.aggregate([
        { $match : { "courseId" : mongoose.Types.ObjectId(_id) } }
      ]);

      res.json({ rows });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getDetailQuestion: async (req: Request, res: Response) => {
    try {
      const _id = req.params.id;
      const rows = await Question.findById(_id);
      res.json({ rows });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateQuestion: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication User." });

    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Invalid Authentication Admin." });
    try {
      const id = req.params.id;
      const user = req.user._id;
      const { name, categoryId, answers , courseId } = req.body;
      const category = await Category.findById(categoryId);
      const course = await Course.findById(courseId);
      const categoryItem = {id : category._id , name : category.name};

      await Question.findByIdAndUpdate(
        id,
        {
          name,
          category : categoryItem,
          answers,
          courseId : courseId,
          user,
        },
        {new : true}
      )

      const response = {
        _id:id,
        name,
        category : categoryItem,
        answers,
        courseName : course?.name,
        user,
      }
    
      res.json({ rows: response });
    } catch (err : any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteQuestion: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: "Invalid Authentication." });

    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Invalid Authentication." });

    try {
      await Question.findByIdAndDelete(req.params.id);

      res.json({ msg: "Delete Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default QuestionCtrl;
