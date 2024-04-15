import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  module: { type: Number, required: true }
});

const moduleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Modules' },
  lessons: [lessonSchema]
}, {
  collection: "modules"
});

export default moduleSchema;
