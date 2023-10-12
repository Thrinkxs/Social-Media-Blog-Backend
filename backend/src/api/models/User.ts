import mongoose, { InferSchemaType } from "mongoose";
const UserSchema = new mongoose.Schema({
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
    default: "user",
  },
});

type User = InferSchemaType<typeof UserSchema>;
const User = mongoose.model("User", UserSchema);

export default User;
