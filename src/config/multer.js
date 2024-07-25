import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import config from './config.js'

cloudinary.config({
    cloud_name: config.cloudinary.name,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
  })
const maxSize = 100 * 1024 * 1024 //10MB

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'demo', // Optional
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mov'], // Allow image and video formats
  },
})

export const upload = multer({ storage, limits: { fileSize: maxSize } })
