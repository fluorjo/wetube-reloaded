import mongoose from "mongoose";

const memeSchema = new mongoose.Schema({
  text: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Video" },
  comment: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" },
  createdAt: { type: Date, required: true, default: Date.now },
});

// const Meme = mongoose.model("Meme", memeSchema);

export default Meme;