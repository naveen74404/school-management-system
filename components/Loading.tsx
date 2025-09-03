import { Loader2 } from 'lucide-react'

interface LoadingProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function Loading({ message = 'Loading...', size = 'md' }: LoadingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600 mb-2`} />
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  )
}