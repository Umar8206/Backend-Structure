import mongoose from "mongoose";
const otp = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    expireAt: {
      type: Date,
      required: true,
    },
    isExpired: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Otp", otp);