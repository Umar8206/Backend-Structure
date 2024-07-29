import Message from '../models/message.js'

export const findMessages = async (_id) => {
  return await Message.find({ roomId: _id }).populate('senderId', { _id: 1, userName: 1, profilePic: 1 })
}
export const addMessage = async (payload) => {
  return await Message.create(payload)
}
