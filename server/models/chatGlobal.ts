import mongoose from 'mongoose';

const chatGlobalSchema = new mongoose.Schema({
  idUser: { type: mongoose.Types.ObjectId, ref: 'user' },
  time : {
    type : Date,
  },
  content : {
    type : String,
    required : [true, "Please add your content"],
  },
  user : {
    type : String,
  }
  }, {
    timestamps: true
})

export default mongoose.model('chatGlobal', chatGlobalSchema)