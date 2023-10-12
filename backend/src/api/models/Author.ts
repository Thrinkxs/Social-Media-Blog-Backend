import mongoose, { InferSchemaType } from "mongoose";

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "author",
  },
});

type Author = InferSchemaType<typeof AuthorSchema>;

const Author = mongoose.model("Author", AuthorSchema);

export default Author;
