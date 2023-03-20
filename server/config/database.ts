import mongoose from 'mongoose'
import log from "../utils/logger";

const URI = process.env.MONGODB_URL

mongoose.connect(`${URI}`, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) throw err;
  log.info('Mongodb connection')
})
