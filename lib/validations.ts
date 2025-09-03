import { z } from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export const schoolSchema = z.object({
  name: z.string()
    .min(2, 'School name must be at least 2 characters')
    .max(100, 'School name must be less than 100 characters')
    .trim(),
  
  address: z.string()
    .min(10, 'Address must be at least 10 characters')
    .max(500, 'Address must be less than 500 characters')
    .trim(),
  
  city: z.string()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must be less than 50 characters')
    .trim(),
  
  state: z.string()
    .min(2, 'State must be at least 2 characters')
    .max(50, 'State must be less than 50 characters')
    .trim(),
  
  contact: z.string()
    .regex(/^[\+]?[0-9\s\-\(\)]{10,15}$/, 'Please enter a valid phone number')
    .min(10, 'Contact number must be at least 10 digits')
    .max(15, 'Contact number must be less than 15 digits'),
  
  email_id: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase()
    .trim(),
})

export const imageSchema = z.object({
  image: z.any()
    .refine((file) => file instanceof File, 'Please select an image file')
    .refine((file) => file?.size <= MAX_FILE_SIZE, 'Image size must be less than 5MB')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported'
    )
})

export type SchoolFormData = z.infer<typeof schoolSchema>
export type ImageFormData = z.infer<typeof imageSchema>