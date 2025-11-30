import React, { useState, useMemo } from 'react';
import { ServiceEntity, ServiceCategory } from '../types';
import { Search, MapPin, Phone, Info, Filter, X, Database } from 'lucide-react';
import { CATEGORY_COLORS } from '../constants';

interface DirectoryProps {
  services: ServiceEntity[];
}

export const Directory: React.FC<DirectoryProps> = ({ services }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'All'>('All');
  const [selectedService, setSelectedService] = useState<ServiceEntity | null>(null);

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            service.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [services, searchTerm, selectedCategory]);

  return (
    <div className="h-full flex flex-col md:flex-row overflow-hidden relative">
      {/* List Panel */}
      <div className={`flex-1 flex flex-col h-full bg-slate-900 overflow-hidden ${selectedService ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-slate-800 bg-slate-900/95 backdrop-blur z-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-white">Service Database</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search services, addresses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-500"
              />
            </div>
            
            {/* Horizontal Scroll Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'All' 
                    ? 'bg-slate-100 text-slate-900' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                All Services
              </button>
              {Object.values(ServiceCategory).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? CATEGORY_COLORS[cat]
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredServices.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Filter className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No services found matching your criteria.</p>
            </div>
          ) : (
            filteredServices.map((service) => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedService?.id === service.id
                    ? 'bg-slate-800 border-blue-500 shadow-blue-900/20 ring-1 ring-blue-500'
                    : 'bg-slate-800 border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-white text-lg">{service.name}</h3>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${CATEGORY_COLORS[service.category]}`}>
                    {service.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span className="truncate">{service.address}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>{service.phone}</span>
                </div>
                <div className="mt-3 flex gap-2">
                   <div className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-md ${
                     service.status === 'Operational' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                   }`}>
                     <div className={`w-1.5 h-1.5 rounded-full ${service.status === 'Operational' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                     {service.status}
                   </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Detail Panel */}
      <div className={`md:w-[450px] bg-slate-800 border-l border-slate-700 flex-col h-full absolute md:static inset-0 z-20 transition-transform duration-300 ${selectedService ? 'translate-x-0' : 'translate-x-full md:translate-x-0 md:hidden flex'}`}>
        {selectedService ? (
          <div className="h-full flex flex-col overflow-y-auto">
             <div className="p-4 flex items-center justify-between border-b border-slate-700">
               <span className="text-slate-400 text-sm font-mono">ID: {selectedService.id}</span>
               <button onClick={() => setSelectedService(null)} className="p-2 hover:bg-slate-700 rounded-full md:hidden text-white">
                 <X className="w-5 h-5" />
               </button>
             </div>
             
             <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-lg border ${CATEGORY_COLORS[selectedService.category]}`}>
                     <Info className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white leading-tight">{selectedService.name}</h2>
                    <p className="text-slate-400">{selectedService.category}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                    <h4 className="text-xs uppercase text-slate-500 font-bold mb-3">Contact & Location</h4>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
                        <div>
                          <p className="text-slate-200 text-sm">{selectedService.address}</p>
                          <p className="text-slate-500 text-xs mt-0.5">
                            Lat: {selectedService.coordinates.lat}, Lng: {selectedService.coordinates.lng}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 items-center">
                        <Phone className="w-5 h-5 text-slate-400 shrink-0" />
                         <p className="text-blue-400 text-sm font-mono">{selectedService.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                    <h4 className="text-xs uppercase text-slate-500 font-bold mb-3">Operational Details</h4>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-slate-500 text-xs">Capacity</p>
                        <p className="text-slate-200 font-medium">{selectedService.capacity || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs">Personnel</p>
                        <p className="text-slate-200 font-medium">{selectedService.personnelCount || 0} Active</p>
                      </div>
                    </div>
                    {selectedService.specialEquipment && selectedService.specialEquipment.length > 0 && (
                      <div>
                        <p className="text-slate-500 text-xs mb-2">Specialized Equipment</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedService.specialEquipment.map((eq, i) => (
                            <span key={i} className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs">
                              {eq}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
                      Dispatch Unit
                    </button>
                    <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-semibold transition-colors">
                      Edit Info
                    </button>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs text-slate-600">Last Updated: {new Date(selectedService.lastUpdated).toLocaleString()}</p>
                  </div>
                </div>
             </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-col items-center justify-center h-full text-slate-500 p-8 text-center">
            <Database className="w-16 h-16 mb-4 opacity-30" />
            <h3 className="text-lg font-medium text-slate-400">Select a Service</h3>
            <p className="text-sm">Click on a card from the list to view detailed operational information.</p>
          </div>
        )}
      </div>
    </div>
  );
};