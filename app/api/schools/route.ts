// /app/api/schools/route.ts (for Next.js 13+ with App Router)
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const schools = await prisma.school.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ success: true, data: schools })
  } catch (error) {
    console.error('GET /api/schools error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch schools' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body.name || !body.address || !body.city || !body.state || !body.contact || !body.email_id) {
      return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 })
    }

    const newSchool = await prisma.school.create({
      data: {
        name: body.name,
        address: body.address,
        city: body.city,
        state: body.state,
        contact: body.contact,
        email_id: body.email_id,
        image: body.imageBase64 || '',
      },
    })

    return NextResponse.json({ success: true, data: newSchool })
  } catch (error) {
    console.error('POST /api/schools error:', error)
    return NextResponse.json({ success: false, error: 'Failed to add school' }, { status: 500 })
  }
}
