import { Request, Response } from "express";
import chatGlobal from "../models/chatGlobal";
import { IReqAuth } from "../config/interface";

const Pagination = (req: IReqAuth) => {
  let page = Number(req.query.page) * 1 || 1;
  let limit = Number(req.query.limit) * 1 || 4;
  let skip = (page - 1) * limit;

  return { page, limit, skip };
};

const chatGlobalCtrl = {
  getChatGlobals: async (req: Request, res: Response) => {
    const { limit, page } = Pagination(req);
    const options = {
      page: page,
      limit: limit,
      sort: { _id: 1, createdAt: -1 },
    };
    try {
      const condition = chatGlobal.aggregate([]);
      const rows = await chatGlobal.aggregatePaginate(condition, options);
      res.json({ rows });
    } catch (err: any) {
      res.status(500).json({ msg: err.message });
    }
  },
};

export default chatGlobalCtrl;
