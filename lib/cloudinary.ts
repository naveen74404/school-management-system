import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImageToCloudinary(file: Buffer, fileName: string) {
  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "schoolImages",
        public_id: `school_${Date.now()}_${fileName.split(".")[0]}`,
        resource_type: "image",
      },
      (error, result) => {
        if (error) reject(error);
        else if (!result) reject(new Error("Upload failed"));
        else resolve(result.secure_url);
      }
    );

    stream.end(file);
  });
}

export default cloudinary;
