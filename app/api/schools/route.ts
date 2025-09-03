import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { schoolSchema } from '@/lib/validations'
import { v2 as cloudinary } from 'cloudinary'

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET() {
  try {
    const schools = await prisma.school.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ success: true, data: schools })
  } catch (error) {
    console.error('Error fetching schools:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch schools' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const validatedData = schoolSchema.parse({
      name: body.name,
      address: body.address,
      city: body.city,
      state: body.state,
      contact: body.contact,
      email_id: body.email_id,
    })

    if (!body.imageBase64) {
      return NextResponse.json({ success: false, error: 'Image is required' }, { status: 400 })
    }

    // Upload Base64 image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(body.imageBase64, {
      folder: 'schools',
    })

    const school = await prisma.school.create({
      data: { ...validatedData, image: uploadResult.secure_url },
    })

    return NextResponse.json({ success: true, message: 'School added successfully', data: school }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating school:', error)
    if (error.name === 'ZodError') {
      return NextResponse.json({ success: false, error: 'Validation failed', details: error.message }, { status: 400 })
    }
    return NextResponse.json({ success: false, error: 'Failed to create school' }, { status: 500 })
  }
}
