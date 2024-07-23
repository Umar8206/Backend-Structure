import { db } from '../models/index.js'

export const findUserById = async (_id) => {
  return await db.user.findById(_id)
}
export const findUserByEmail = async (email) => {
  return await db.user.findOne({ email: email })
}
export const updateUserById = async (_id, payload) => {
  return await db.user.findOneAndUpdate({ _id: _id }, payload, { new: true })
}
export const addUser = async (payload) => {
  return await db.user.create(payload)
}
export const findUserByEmailOrPhone = async (payload) => {
  return await db.user.findOne({ $or: [{ email: payload?.email }, { phone: payload?.phone }] })
}
export const updateUserByEmail = async (email, payload) => {
  return await db.user.findOneAndUpdate({ email: email }, payload, { new: true })
}
