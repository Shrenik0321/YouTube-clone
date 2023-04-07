import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.String,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    subscribedChannels: {
      type: [String],
    },
    fromGoogle: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
