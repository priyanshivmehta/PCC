import React, { useState } from 'react';
import { MapPin, Phone, Clock, Star, Filter, Navigation, Guitar as Hospital, Shield, Heart, Search, DollarSign } from 'lucide-react';
import { HealthService } from '../types';

const PRIMARY_COLOR = '#8e3b30'; // Deep reddish brown
const PRIMARY_BG_LIGHT = '#f3e5e1'; // Light tint for backgrounds
const PRIMARY_BG_Lighter = '#f9f5f4'; // Even lighter tint for subtle backgrounds
const PRIMARY_BG_DARK = '#6c2f25'; // Darker shade for hover and emphasis

const LocalServices: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'government' | 'private'>('all');
  const [filterCost, setFilterCost] = useState<'all' | 'free' | 'paid'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const mockServices: HealthService[] = [
    {
      id: '1',
      name: 'Primary Health Center - Sector 12',
      type: 'government',
      services: ['Vaccination', 'Antenatal Care', 'Pediatric Care', 'Emergency'],
      address: 'Sector 12, New Delhi - 110001',
      phone: '011-23456789',
      distance: 0.8,
      cost: 'free',
      availability: '24/7'
    },
    {
      id: '2',
      name: 'Anganwadi Center - Block A',
      type: 'government',
      services: ['Child Health', 'Nutrition', 'Growth Monitoring'],
      address: 'Block A, Community Center, New Delhi - 110001',
      phone: '011-23456790',
      distance: 0.5,
      cost: 'free',
      availability: '9 AM - 5 PM'
    },
    {
      id: '3',
      name: 'Apollo Clinic',
      type: 'private',
      services: ['Pediatric Care', 'Vaccination', 'Specialist Consultation'],
      address: 'Main Market, New Delhi - 110001',
      phone: '011-23456791',
      distance: 1.2,
      cost: 'paid',
      availability: '8 AM - 10 PM'
    },
    {
      id: '4',
      name: 'Government Hospital',
      type: 'government',
      services: ['Emergency', 'Maternity', 'Pediatric ICU', 'Surgery'],
      address: 'Hospital Road, New Delhi - 110001',
      phone: '011-23456792',
      distance: 2.1,
      cost: 'subsidized',
      availability: '24/7'
    },
    {
      id: '5',
      name: 'Community Health Center',
      type: 'government',
      services: ['Vaccination', 'Family Planning', 'Child Care'],
      address: 'Community Block, New Delhi - 110001',
      phone: '011-23456793',
      distance: 1.8,
      cost: 'free',
      availability: '9 AM - 6 PM'
    }
  ];

  const filteredServices = mockServices.filter(service => {
    const matchesType = filterType === 'all' || service.type === filterType;
    const matchesCost = filterCost === 'all' || service.cost === filterCost;
    const matchesSearch = searchQuery === '' || 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesType && matchesCost && matchesSearch;
  });

  const getServiceIcon = (service: HealthService) => {
    if (service.services.includes('Emergency')) return Hospital;
    if (service.services.includes('Vaccination')) return Shield;
    return Heart;
  };

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'free': return 'text-[rgb(142,59,48)] bg-[rgba(142,59,48,0.15)]';
      case 'paid': return 'text-[rgb(142,59,48)] bg-[rgba(142,59,48,0.1)]';
      case 'subsidized': return 'text-[rgb(142,59,48)] bg-[rgba(142,59,48,0.1)]';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCostLabel = (cost: string) => {
    switch (cost) {
      case 'free': return 'Free';
      case 'paid': return 'Paid';
      case 'subsidized': return 'Subsidized';
      default: return 'Unknown';
    }
  };

  return (
    <div className="pt-10 px-4 space-y-6">
      {/* Header */}
      <div
        className="rounded-xl p-6 border"
        style={{ background: 'linear-gradient(to right, #f9f5f4, #f3e5e1)', borderColor: PRIMARY_COLOR }}
      >
        <h2 className="text-xl font-bold mb-2" style={{ color: PRIMARY_COLOR }}>
          Local Health Services
        </h2>
        <p className="text-gray-700">Find nearby healthcare facilities and services</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[rgba(142,59,48,0.5)]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search services, hospitals, vaccination centers..."
          className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[rgba(142,59,48,0.6)] focus:border-transparent border-[rgba(142,59,48,0.3)]"
        />
      </div>

      {/* Filters */}
      <div className="flex space-x-3 overflow-x-auto pb-2">
        <div
          className="flex items-center space-x-2 rounded-lg p-2 border min-w-fit"
          style={{ borderColor: PRIMARY_COLOR, backgroundColor: PRIMARY_BG_Lighter }}
        >
          <Filter className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="text-sm focus:outline-none"
            style={{ color: PRIMARY_COLOR }}
          >
            <option value="all">All Types</option>
            <option value="government">Government</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div
          className="flex items-center space-x-2 rounded-lg p-2 border min-w-fit"
          style={{ borderColor: PRIMARY_COLOR, backgroundColor: PRIMARY_BG_Lighter }}
        >
          <DollarSign className="w-4 h-4" style={{ color: PRIMARY_COLOR }} />
          <select
            value={filterCost}
            onChange={(e) => setFilterCost(e.target.value as any)}
            className="text-sm focus:outline-none"
            style={{ color: PRIMARY_COLOR }}
          >
            <option value="all">All Costs</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div
          className="p-4 rounded-xl border"
          style={{ backgroundColor: '#f6ebe8', borderColor: 'rgba(142,59,48,0.25)' }}
        >
          <div
            className="p-2 rounded-lg w-fit mb-3"
            style={{ backgroundColor: 'rgba(142,59,48,0.15)' }}
          >
            <Shield className="w-6 h-6" style={{ color: PRIMARY_COLOR }} />
          </div>
          <h3 className="font-semibold" style={{ color: PRIMARY_COLOR }}>
            Free Vaccination
          </h3>
          <p className="text-sm text-[rgba(142,59,48,0.7)] mt-1">Government centers nearby</p>
        </div>

        <div
          className="p-4 rounded-xl border"
          style={{ backgroundColor: '#f6ebe8', borderColor: 'rgba(142,59,48,0.25)' }}
        >
          <div
            className="p-2 rounded-lg w-fit mb-3"
            style={{ backgroundColor: 'rgba(142,59,48,0.15)' }}
          >
            <Hospital className="w-6 h-6" style={{ color: PRIMARY_COLOR }} />
          </div>
          <h3 className="font-semibold" style={{ color: PRIMARY_COLOR }}>
            Emergency Care
          </h3>
          <p className="text-sm text-[rgba(142,59,48,0.7)] mt-1">24/7 available</p>
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {filteredServices.map((service) => {
          const ServiceIcon = getServiceIcon(service);
          
          return (
            <div
              key={service.id}
              className="rounded-xl p-4 border shadow-sm"
              style={{ borderColor: 'rgba(142,59,48,0.2)', backgroundColor: PRIMARY_BG_Lighter }}
            >
              <div className="flex items-start space-x-3">
                <div
                  className="p-2 rounded-lg"
                  style={{
                    backgroundColor:
                      service.type === 'government'
                        ? 'rgba(142,59,48,0.15)'
                        : 'rgba(142,59,48,0.10)',
                  }}
                >
                  <ServiceIcon
                    className="w-5 h-5"
                    style={{
                      color:
                        service.type === 'government' ? PRIMARY_COLOR : 'rgba(142,59,48,0.75)',
                    }}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold" style={{ color: PRIMARY_COLOR }}>
                        {service.name}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium`}
                          style={{
                            color: PRIMARY_COLOR,
                            backgroundColor: 'rgba(142,59,48,0.15)',
                          }}
                        >
                          {getCostLabel(service.cost)}
                        </span>
                        <span
                          className="px-2 py-1 rounded-full text-xs font-medium"
                          style={{
                            color: PRIMARY_COLOR,
                            backgroundColor:
                              service.type === 'government'
                                ? 'rgba(142,59,48,0.15)'
                                : 'rgba(142,59,48,0.10)',
                          }}
                        >
                          {service.type === 'government' ? 'Government' : 'Private'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" style={{ color: 'rgba(0,0,0,0.4)' }} />
                      <span className="text-sm text-gray-600">{service.distance} km</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-gray-600 mb-1">Services:</p>
                    <div className="flex flex-wrap gap-1">
                      {service.services.map((serviceItem, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: 'rgba(142,59,48,0.05)',
                            color: 'rgba(142,59,48,0.7)',
                          }}
                        >
                          {serviceItem}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" style={{ color: 'rgba(142,59,48,0.6)' }} />
                      <span>{service.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" style={{ color: 'rgba(142,59,48,0.6)' }} />
                      <span>{service.availability}</span>
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-between mt-4 pt-3 border-t"
                    style={{ borderColor: 'rgba(142,59,48,0.15)' }}
                  >
                    <button
                      className="flex items-center space-x-2 hover:opacity-90 transition"
                      style={{ color: PRIMARY_COLOR }}
                      onClick={() => window.open(`tel:${service.phone}`, '_self')}
                    >
                      <Phone className="w-4 h-4" />
                      <span className="text-sm font-medium">Call</span>
                    </button>
                    <button
                      className="flex items-center space-x-2 hover:opacity-90 transition"
                      style={{ color: PRIMARY_COLOR }}
                      onClick={() =>
                        window.open(
                          `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(service.address)}`,
                          '_blank'
                        )
                      }
                    >
                      <Navigation className="w-4 h-4" />
                      <span className="text-sm font-medium">Directions</span>
                    </button>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4" style={{ color: '#fbbf24' /* gold star */ }} />
                      <span className="text-sm text-gray-600">4.2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredServices.length === 0 && (
        <div className="rounded-xl p-8 text-center" style={{ backgroundColor: PRIMARY_BG_Lighter }}>
          <MapPin className="w-12 h-12 mx-auto mb-4" style={{ color: 'rgba(142,59,48,0.4)' }} />
          <p className="text-[rgba(142,59,48,0.8)]">No services found</p>
          <p className="text-sm text-[rgba(142,59,48,0.5)] mt-1">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
};

export default LocalServices;
