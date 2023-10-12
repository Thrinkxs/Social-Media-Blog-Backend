import mongoose, { InferSchemaType } from "mongoose";

const CommentSchema = new mongoose.Schema({
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
  },
});

type Comment = InferSchemaType<typeof CommentSchema>;
const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
