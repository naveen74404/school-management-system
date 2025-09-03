'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { MapPin, Phone, Mail, Search, Grid, List as ListIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import Loading from '@/components/Loading'

interface School {
  id: number
  name: string
  address: string
  city: string
  state: string
  contact: string
  email_id: string
  image: string
  createdAt: string
}

type ViewMode = 'grid' | 'list'

export default function ShowSchoolsPage() {
  const [schools, setSchools] = useState<School[]>([])
  const [filteredSchools, setFilteredSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  // Fetch schools
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch('/api/schools')
        const result = await res.json()

        if (result.success) {
          setSchools(result.data)
          setFilteredSchools(result.data)
        } else {
          throw new Error(result.error || 'Failed to fetch schools')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchSchools()
  }, [])

  // Filter schools
  useEffect(() => {
    let filtered = schools

    if (searchTerm) {
      filtered = filtered.filter(school =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.address.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCity) filtered = filtered.filter(s => s.city === selectedCity)
    if (selectedState) filtered = filtered.filter(s => s.state === selectedState)

    setFilteredSchools(filtered)
  }, [schools, searchTerm, selectedCity, selectedState])

  const uniqueCities = [...new Set(schools.map(s => s.city))].sort()
  const uniqueStates = [...new Set(schools.map(s => s.state))].sort()

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCity('')
    setSelectedState('')
  }

  if (loading) return <><Navbar /><Loading message="Loading schools..." /></>
  if (error) return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 p-6 rounded-lg text-center">
          <p className="text-red-800">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    </>
  )

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Schools</h1>
            <p className="text-gray-600">{filteredSchools.length} school{filteredSchools.length !== 1 ? 's' : ''} found</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search schools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Cities</option>
                  {uniqueCities.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All States</option>
                  {uniqueStates.map(state => <option key={state} value={state}>{state}</option>)}
                </select>
                {(searchTerm || selectedCity || selectedState) && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* View Toggle */}
              <div className="flex border border-gray-300 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn("p-2 rounded transition-colors", viewMode === 'grid' ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-800")}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn("p-2 rounded transition-colors", viewMode === 'list' ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-800")}
                >
                  <ListIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Schools */}
          {filteredSchools.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-50 rounded-xl p-8">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No schools found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || selectedCity || selectedState
                    ? 'Try adjusting your search criteria'
                    : 'No schools have been added yet'}
                </p>
                {(searchTerm || selectedCity || selectedState) && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className={cn(viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4")}>
              {filteredSchools.map((school, index) => (
                <SchoolCard key={school.id} school={school} viewMode={viewMode} index={index} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}

interface SchoolCardProps {
  school: School
  viewMode: ViewMode
  index: number
}

function SchoolCard({ school, viewMode, index }: SchoolCardProps) {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  const ImageComponent = () => {
    if (imageError) return <div className="w-full h-full bg-gray-200 flex items-center justify-center"><span className="text-gray-400">No Image</span></div>
    if (school.image.startsWith('data:')) return <img src={school.image} alt={school.name} className="w-full h-full object-cover rounded-lg" onLoad={() => setImageLoading(false)} onError={() => { setImageError(true); setImageLoading(false) }} />
    return <Image src={school.image} alt={school.name} fill className={cn("object-cover transition-all duration-300", imageLoading ? "opacity-0" : "opacity-100")} onLoad={() => setImageLoading(false)} onError={() => { setImageError(true); setImageLoading(false) }} />
  }

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative w-full md:w-48 h-48 flex-shrink-0">{ImageComponent()}</div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">{school.name}</h3>
            <div className="space-y-2 mb-4">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-gray-600">{school.address}</p>
                  <p className="text-sm text-gray-500">{school.city}, {school.state}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2"><Phone className="h-4 w-4 text-gray-500" /><p className="text-sm text-gray-600">{school.contact}</p></div>
              <div className="flex items-center space-x-2"><Mail className="h-4 w-4 text-gray-500" /><p className="text-sm text-gray-600 truncate">{school.email_id}</p></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid view
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden school-card animate-fade-in group" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="relative h-48 overflow-hidden">{ImageComponent()}</div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{school.name}</h3>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm text-gray-600 line-clamp-2">{school.address}</p>
              <p className="text-sm text-gray-500 font-medium">{school.city}, {school.state}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex items-center space-x-2"><Phone className="h-3 w-3 text-gray-400" /><p className="text-xs text-gray-500">{school.contact}</p></div>
          <div className="flex items-center space-x-2"><Mail className="h-3 w-3 text-gray-400" /><p className="text-xs text-gray-500 truncate">{school.email_id}</p></div>
        </div>
      </div>
    </div>
  )
}
