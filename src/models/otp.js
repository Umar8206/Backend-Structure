import mongoose from 'mongoose'
const otp = mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 1, // The document will be automatically deleted after 1 minutes of its creation time
  },
})

export default mongoose.model('Otp', otp)
