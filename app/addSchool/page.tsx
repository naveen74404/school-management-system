'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schoolSchema, type SchoolFormData } from '@/lib/validations'
import { Upload, CheckCircle, AlertCircle, School, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'

interface FormState {
  isSubmitting: boolean
  isSuccess: boolean
  error: string | null
  imagePreview: string | null
}

export default function AddSchoolPage() {
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
    imagePreview: null
  })
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SchoolFormData>({
    resolver: zodResolver(schoolSchema)
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormState(prev => ({
          ...prev,
          imagePreview: e.target?.result as string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: SchoolFormData) => {
    if (!selectedFile) {
      setFormState(prev => ({ ...prev, error: 'Please select an image' }))
      return
    }

    setFormState(prev => ({ 
      ...prev, 
      isSubmitting: true, 
      error: null, 
      isSuccess: false 
    }))

    try {
      // Convert image to Base64
      const toBase64 = (file: File): Promise<string> => 
        new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = error => reject(error)
        })

      const imageBase64 = await toBase64(selectedFile)

      const payload = {
        ...data,
        imageBase64,
      }

      const response = await fetch('/api/schools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (result.success) {
        setFormState(prev => ({ 
          ...prev, 
          isSubmitting: false, 
          isSuccess: true, 
          error: null,
          imagePreview: null
        }))
        reset()
        setSelectedFile(null)
        
        setTimeout(() => {
          setFormState(prev => ({ ...prev, isSuccess: false }))
        }, 3000)
      } else {
        throw new Error(result.error || 'Something went wrong')
      }
    } catch (error) {
      setFormState(prev => ({ 
        ...prev, 
        isSubmitting: false, 
        error: error instanceof Error ? error.message : 'Something went wrong' 
      }))
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <School className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New School</h1>
            <p className="text-gray-600">Fill in the details to add a new school to the system</p>
          </div>

          {/* Success Message */}
          {formState.isSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3 animate-slide-up">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-800 font-medium">School added successfully!</span>
            </div>
          )}

          {/* Error Message */}
          {formState.error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="text-red-800">{formState.error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
              {/* School Name */}
              <div className="form-group">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">School Name *</label>
                <input {...register('name')} type="text" className={cn("w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200", errors.name ? "border-red-300" : "border-gray-300")} placeholder="Enter school name" />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>

              {/* Address */}
              <div className="form-group">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                <textarea {...register('address')} rows={3} className={cn("w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none", errors.address ? "border-red-300" : "border-gray-300")} placeholder="Enter complete address" />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
              </div>

              {/* City & State */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <input {...register('city')} type="text" className={cn("w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200", errors.city ? "border-red-300" : "border-gray-300")} placeholder="Enter city" />
                  {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                  <input {...register('state')} type="text" className={cn("w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200", errors.state ? "border-red-300" : "border-gray-300")} placeholder="Enter state" />
                  {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>}
                </div>
              </div>

              {/* Contact & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">Contact Number *</label>
                  <input {...register('contact')} type="tel" className={cn("w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200", errors.contact ? "border-red-300" : "border-gray-300")} placeholder="Enter contact number" />
                  {errors.contact && <p className="mt-1 text-sm text-red-600">{errors.contact.message}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="email_id" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input {...register('email_id')} type="email" className={cn("w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200", errors.email_id ? "border-red-300" : "border-gray-300")} placeholder="Enter email address" />
                  {errors.email_id && <p className="mt-1 text-sm text-red-600">{errors.email_id.message}</p>}
                </div>
              </div>

              {/* Image Upload */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">School Image *</label>
                <div className="relative">
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload" />
                  <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">{selectedFile ? selectedFile.name : 'Click to upload image'}</span>
                    <span className="text-xs text-gray-400 mt-1">JPEG, PNG, WebP (max 5MB)</span>
                  </label>
                </div>
                {formState.imagePreview && (
                  <div className="mt-4">
                    <img src={formState.imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg shadow-sm" />
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={formState.isSubmitting} className={cn("w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white transition-all duration-200 shadow-lg hover:shadow-xl", formState.isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700")}>
              {formState.isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Adding School...
                </>
              ) : (
                <>
                  <School className="h-5 w-5 mr-2" />
                  Add School
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </>
  )
}
