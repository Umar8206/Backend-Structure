import mongoose from 'mongoose'
import { Messages } from '../constants/messages.js'
import { chatTypes } from '../constants/chat.js'
const chatRoom = mongoose.Schema(
  {
    users: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref: 'User',
      validate: {
        validator: function (value) {
          return value.length >= 2
        },
        message: Messages.chatMinUsers,
      },
    },
    type: {
      type: String,
      required: true,
      enum: [chatTypes.group, chatTypes.private],
    },
    name: {
      type: String,
    },
  },
  { timestamps: true }
)

export default mongoose.model('ChatRoom', chatRoom)
