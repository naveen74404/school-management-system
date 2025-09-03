import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImageToCloudinary(
  file: Buffer,
  fileName: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        folder: 'schoolImages', // folder name in Cloudinary
        public_id: `school_${Date.now()}_${fileName.split('.')[0]}`,
        // format removed to keep original file format
        transformation: [
          { quality: 'auto:good' } // just optimize quality
        ]
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error)
          reject(error)
        } else if (!result) {
          reject(new Error('Upload failed, no result received'))
        } else {
          console.log("✅ Cloudinary Upload Successful:", result.secure_url)
          resolve(result.secure_url)
        }
      }
    )

    uploadStream.end(file)
  })
}

export default cloudinary
