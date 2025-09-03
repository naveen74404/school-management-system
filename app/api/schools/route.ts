import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const file = formData.get("image") as File;

    // Convert File to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    const imageUrl = await uploadImageToCloudinary(buffer, file.name);

    const school = await prisma.school.create({
      data: {
        name,
        image: imageUrl,
        address: formData.get("address") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        contact: formData.get("contact") as string,
        email_id: formData.get("email_id") as string,
      },
    });

    return NextResponse.json(school);
  } catch (error) {
    console.error("Error creating school:", error);
    return NextResponse.json({ error: "Failed to create school" }, { status: 500 });
  }
}
