import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'School Management System',
  description: 'A modern school management system built with Next.js',
  keywords: ['school', 'management', 'education', 'next.js', 'react'],
  authors: [{ name: 'School Management Team' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50')}>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}