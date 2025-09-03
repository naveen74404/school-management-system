'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Search, Grid, List as ListIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Loading from '@/components/Loading';
import { cn } from '@/lib/utils';

interface School {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image: string;
  createdAt: string;
}

type ViewMode = 'grid' | 'list';

export default function ShowSchoolsPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Fetch schools from API
  useEffect(() => {
    async function fetchSchools() {
      try {
        const res = await fetch('/api/schools', { cache: 'no-store' });
        if (!res.ok) throw new Error(`Failed to fetch schools: ${res.status}`);

        const result = await res.json();
        if (!result || !Array.isArray(result.data)) {
          throw new Error('Invalid API response format');
        }

        setSchools(result.data);
        setFilteredSchools(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }
    fetchSchools();
  }, []);

  // Apply filters & search
  useEffect(() => {
    let filtered = schools;
    if (searchTerm) {
      filtered = filtered.filter((s) =>
        [s.name, s.city, s.state, s.address].some((field) =>
          field.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    if (selectedCity) filtered = filtered.filter((s) => s.city === selectedCity);
    if (selectedState) filtered = filtered.filter((s) => s.state === selectedState);
    setFilteredSchools(filtered);
  }, [schools, searchTerm, selectedCity, selectedState]);

  const uniqueCities = [...new Set(schools.map((s) => s.city))].sort();
  const uniqueStates = [...new Set(schools.map((s) => s.state))].sort();

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCity('');
    setSelectedState('');
  };

  if (loading) return <><Navbar /><Loading message="Loading schools..." /></>;
  if (error)
    return (
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
    );

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Schools</h1>
            <p className="text-gray-600">
              {filteredSchools.length} school{filteredSchools.length !== 1 ? 's' : ''} found
            </p>
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

              {/* Dropdown Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Cities</option>
                  {uniqueCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All States</option>
                  {uniqueStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {(searchTerm || selectedCity || selectedState) && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* View Toggle */}
              <div className="flex border border-gray-300 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2 rounded',
                    viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-800'
                  )}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2 rounded',
                    viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-800'
                  )}
                >
                  <ListIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
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
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div
              className={cn(
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
              )}
            >
              {filteredSchools.map((school, index) => (
                <SchoolCard key={school.id} school={school} viewMode={viewMode} index={index} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

interface SchoolCardProps {
  school: School;
  viewMode: ViewMode;
  index: number;
}

function SchoolCard({ school, viewMode, index }: SchoolCardProps) {
  const [imageError, setImageError] = useState(false);

  const imageSrc = !imageError && school.image ? school.image : '/placeholder.png';

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-6">
        <div className="relative w-full md:w-48 h-48 flex-shrink-0">
          <Image
            src={imageSrc}
            alt={school.name}
            fill
            className="object-cover rounded-lg"
            onError={() => setImageError(true)}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{school.name}</h3>
          <p className="text-gray-600">{school.address}</p>
          <p className="text-gray-500">{school.city}, {school.state}</p>
          <p className="text-gray-600">📞 {school.contact}</p>
          <p className="text-gray-600">✉️ {school.email_id}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={imageSrc}
          alt={school.name}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{school.name}</h3>
        <p className="text-gray-600 line-clamp-2">{school.address}</p>
        <p className="text-gray-500 text-sm">{school.city}, {school.state}</p>
      </div>
    </div>
  );
}
