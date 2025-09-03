import Link from 'next/link'
import { GraduationCap, Plus, List, Users, MapPin } from 'lucide-react'
import Navbar from '@/components/Navbar'

export default function HomePage() {
  const features = [
    {
      icon: Plus,
      title: 'Add Schools',
      description: 'Easily add new schools with complete details and images',
      href: '/addSchool',
      color: 'bg-blue-500',
    },
    {
      icon: List,
      title: 'View Schools',
      description: 'Browse and discover schools in an intuitive grid layout',
      href: '/showSchools',
      color: 'bg-green-500',
    },
    {
      icon: Users,
      title: 'School Management',
      description: 'Complete school information management system',
      href: '#',
      color: 'bg-purple-500',
    },
    {
      icon: MapPin,
      title: 'Location Based',
      description: 'Find schools by city and state with detailed addresses',
      href: '#',
      color: 'bg-orange-500',
    },
  ]

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <GraduationCap className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              School Management
              <span className="text-blue-600 block">System</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-slide-up">
              A modern, responsive platform to manage school information with ease. 
              Add schools, upload images, and browse through a beautiful interface.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link
                href="/addSchool"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add New School
              </Link>
              <Link
                href="/showSchools"
                className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <List className="h-5 w-5 mr-2" />
                View Schools
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Everything You Need
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Powerful features designed to make school management simple and efficient
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Link
                    key={feature.title}
                    href={feature.href}
                    className="group relative p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`inline-flex p-3 rounded-lg ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 lg:p-12 text-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold mb-2">100+</div>
                  <div className="text-blue-100">Schools Managed</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">24/7</div>
                  <div className="text-blue-100">System Availability</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">Fast</div>
                  <div className="text-blue-100">Data Processing</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <GraduationCap className="h-6 w-6" />
              <span className="text-lg font-semibold">School Management System</span>
            </div>
            <div className="text-sm text-gray-400">
              Built with Next.js, Prisma, and Cloudinary
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}