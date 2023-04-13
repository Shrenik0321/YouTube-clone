import mongoose from "mongoose";

const GoogleUserSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.String,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    googleId: {
      type: String,
      required: false,
      default: "Hello",
      unique: true,
    },
    username: {
      type: String,
    },
    subscribedChannels: {
      type: [String],
    },
    accessToken: {
      type: String,
    },
    fromGoogle: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("GoogleUsers", GoogleUserSchema);
