import mongoose from "mongoose";

const bloogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "deescription is required"],
    },
    image: {
      type: String,
      required: [true, "image is required"],
    },
    user: {
      type: mongoose.Types.ObjectId,

      ref: "User",
      required: [true, "user id is require"],
    },
  },
  { timestamps: true }
);

const bloogModel = mongoose.model("bloog", bloogSchema);
export default bloogModel;
