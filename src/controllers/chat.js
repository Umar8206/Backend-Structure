import { createRoomService } from '../services/chatRoom.js'

export const createRoom = async (req, res, next) => {
  try {
    const payload = {
      userId: req.context.userId,
      users: req.body.users,
      name: req.body.name,
    }
    res.body.data = await createRoomService(payload)
    return res.json(res.body)
  } catch (error) {
    next(error)
  }
}
