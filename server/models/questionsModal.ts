import mongoose from 'mongoose'
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const questionSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
    name : {
        type : String,
        required : [true, "Please add your name"],
        trim: true
    },
    category : {
        required : true,
        type : Object
    },
    courseId : {
        type: mongoose.Types.ObjectId,
        ref: 'course',
    },
    answers : {
        type : Array,
        required : [true, "Please add your Answers"],
        ref : 'answer'
    }
}, {
  timestamps: true
})

questionSchema.plugin(aggregatePaginate)

export default mongoose.model('question', questionSchema)