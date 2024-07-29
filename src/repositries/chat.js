import chatRoom from "../models/chatRoom.js"

export const createChatRoom=async(payload)=>{
    return await chatRoom.create(payload)
}
export const findRoomById=async(_id)=>{
    return await chatRoom.findById(_id)?.populate("users",{_id:1,userName:1,profilePic:1})
}