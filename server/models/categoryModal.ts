import mongoose from "mongoose";
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const categorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "Please add user"],
    },
    name: {
      type : String,
      required: [true, "Please add your name"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
categorySchema.plugin(aggregatePaginate)

export default mongoose.model("category", categorySchema);
