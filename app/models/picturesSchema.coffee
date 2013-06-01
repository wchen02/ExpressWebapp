mongoose = require 'mongoose'
Schema = mongoose.Schema
ObjectId = Schema.Types.ObjectId

schema = new Schema
  _id: {type: ObjectId, select: false}
  src: {type: String, required: true, index: true}
  caption: String

module.exports = schema