import { db } from "../models/index.js"

export const findUserByEmail = async (email) => {
    return await db.user.findOne({ email: email })
}

export const updateUserById = async (_id, payload) => {
    return await db.user.findOneAndUpdate({ _id: _id }, payload, { new: true })
}
export const addUser = async (payload) => {
    console.log("create payload is ->",payload);
    return await db.user.create(payload)
}
