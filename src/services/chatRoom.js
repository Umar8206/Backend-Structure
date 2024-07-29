import { chatTypes, messageTypes } from '../constants/chat.js'
import { Messages } from '../constants/messages.js'
import { createChatRoom, findRoomById } from '../repositries/chat.js'
import { addMessage, findMessages } from '../repositries/message.js'
import { findUserById } from '../repositries/user.js'
import validate from '../validations/joi.js'
import { chatRoomValidation } from '../validations/schema/chatRoom.js'

export const createRoomService = async (payload) => {
  validate(payload, chatRoomValidation)
  const user = await findUserById(payload?.userId)
  if (!user?._id) throw new Error(Messages.userNotFound)

  const createPayload = {
    userId: payload.userId,
    users: [...payload.users, payload?.userId],
    name: payload.name,
  }
  if (createPayload?.users?.length > 2) {
    createPayload.type = chatTypes.group
  } else {
    createPayload.type = chatTypes.private
  }
  if (payload?.name?.trim() == '') {
    createPayload.name = `${createPayload?.type}-${JSON.stringify(payload?.users)}~${Date.now()}`
  }

  let room = await createChatRoom(createPayload)
  await addMessage({
    roomId: room?._id,
    type: messageTypes.info,
    text: Messages.roomCreated,
    senderId: createPayload?.userId,
  })
  room = await findRoomById(room?._id)
  return room
}

export const getAllMessages = async (payload) => {
  const room = await findRoomById(payload?.roomId)
  if (!room?._id) throw new Error(Messages.roomNotFound)
  const messages = await findMessages({ roomId: payload?.roomId })
  return messages
}
