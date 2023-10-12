import mongoose, { InferSchemaType, Mongoose, mongo } from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  coAuthor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    default: null,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

type Blog = InferSchemaType<typeof BlogSchema>;
const Blog = mongoose.model("Blog", BlogSchema);

export default Blog;
