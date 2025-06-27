import React, { useState } from 'react';
import { MapPin, Phone, Clock, Star, Filter, Navigation, Guitar as Hospital, Shield, Heart, Search, DollarSign } from 'lucide-react';
import { HealthService } from '../types';

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
      case 'free': return 'text-green-600 bg-green-100';
      case 'paid': return 'text-blue-600 bg-blue-100';
      case 'subsidized': return 'text-orange-600 bg-orange-100';
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
    <div className="pb-20 px-4 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-100">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Local Health Services</h2>
        <p className="text-gray-600">Find nearby healthcare facilities and services</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search services, hospitals, vaccination centers..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      {/* Filters */}
      <div className="flex space-x-3 overflow-x-auto pb-2">
        <div className="flex items-center space-x-2 bg-white rounded-lg p-2 border border-gray-200 min-w-fit">
          <Filter className="w-4 h-4 text-gray-600" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="text-sm focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="government">Government</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div className="flex items-center space-x-2 bg-white rounded-lg p-2 border border-gray-200 min-w-fit">
          <DollarSign className="w-4 h-4 text-gray-600" />
          <select
            value={filterCost}
            onChange={(e) => setFilterCost(e.target.value as any)}
            className="text-sm focus:outline-none"
          >
            <option value="all">All Costs</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
          <div className="bg-green-100 p-2 rounded-lg w-fit mb-3">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-800">Free Vaccination</h3>
          <p className="text-sm text-gray-600 mt-1">Government centers nearby</p>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-xl border border-red-100">
          <div className="bg-red-100 p-2 rounded-lg w-fit mb-3">
            <Hospital className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="font-semibold text-gray-800">Emergency Care</h3>
          <p className="text-sm text-gray-600 mt-1">24/7 available</p>
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {filteredServices.map((service) => {
          const ServiceIcon = getServiceIcon(service);
          
          return (
            <div key={service.id} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${service.type === 'government' ? 'bg-blue-100' : 'bg-purple-100'}`}>
                  <ServiceIcon className={`w-5 h-5 ${service.type === 'government' ? 'text-blue-600' : 'text-purple-600'}`} />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">{service.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCostColor(service.cost)}`}>
                          {getCostLabel(service.cost)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          service.type === 'government' ? 'text-blue-600 bg-blue-100' : 'text-purple-600 bg-purple-100'
                        }`}>
                          {service.type === 'government' ? 'Government' : 'Private'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{service.distance} km</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-gray-600 mb-1">Services:</p>
                    <div className="flex flex-wrap gap-1">
                      {service.services.map((serviceItem, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                          {serviceItem}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{service.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{service.availability}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm font-medium">Call</span>
                    </button>
                    <button className="flex items-center space-x-2 text-green-600 hover:text-green-700">
                      <Navigation className="w-4 h-4" />
                      <span className="text-sm font-medium">Directions</span>
                    </button>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
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
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No services found</p>
          <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
};

export default LocalServices;