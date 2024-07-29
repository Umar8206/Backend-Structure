import mongoose from 'mongoose'
import { messageTypes } from '../constants/chat.js'
import { attachmentType } from '../constants/attachment.js'
const attachmentObject = mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: Object.values(attachmentType),
  },
  path: {
    type: String,
    required: true,
  },
})
const Message = mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'ChatRoom',
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(messageTypes),
    },
    text: {
      type: String,
    },
    attachments: [attachmentObject],
  },
  { timestamps: true }
)

export default mongoose.model('Message', Message)
