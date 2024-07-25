import { v2 as cloudinary } from 'cloudinary'

export const uploadToCloudinary = async (file) => {
  const result = await cloudinary.uploader.upload(file?.path)
  return result?.secure_url
}
