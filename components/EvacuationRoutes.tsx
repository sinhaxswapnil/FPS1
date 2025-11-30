import React, { useState } from 'react';
import { EvacuationPoint } from '../types';
import { MapPin, Navigation, Users, Home, ShieldCheck, Info, Crosshair } from 'lucide-react';

interface EvacuationRoutesProps {
  points: EvacuationPoint[];
}

export const EvacuationRoutes: React.FC<EvacuationRoutesProps> = ({ points }) => {
  const [selectedPoint, setSelectedPoint] = useState<EvacuationPoint | null>(null);

  const getStatusColor = (status: EvacuationPoint['status']) => {
    switch (status) {
      case 'Safe': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Compromised': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'Full': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      default: return 'text-slate-400';
    }
  };

  const getIcon = (type: EvacuationPoint['type']) => {
    switch (type) {
      case 'Shelter': return Home;
      case 'Assembly Point': return MapPin;
      case 'Medical Outpost': return ShieldCheck;
      default: return MapPin;
    }
  };

  return (
    <div className="h-full flex flex-col lg:flex-row overflow-hidden bg-slate-900">
      {/* Sidebar List */}
      <div className="w-full lg:w-96 bg-slate-900 border-r border-slate-800 flex flex-col h-full z-10">
        <div className="p-5 border-b border-slate-800 bg-slate-900">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Navigation className="w-6 h-6 text-blue-500" />
            Evacuation Routes
          </h2>
          <p className="text-slate-400 text-sm mt-1">Designated safe zones & assembly points.</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {points.map((point) => {
            const Icon = getIcon(point.type);
            return (
              <button
                key={point.id}
                onClick={() => setSelectedPoint(point)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group ${
                  selectedPoint?.id === point.id
                    ? 'bg-slate-800 border-blue-500 ring-1 ring-blue-500'
                    : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${selectedPoint?.id === point.id ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-200 text-sm">{point.name}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded border uppercase font-bold ${getStatusColor(point.status)}`}>
                    {point.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 pl-9 mb-2">{point.address}</p>
                <div className="pl-9 flex items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{point.currentOccupancy} / {point.capacity}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Map View */}
      <div className="flex-1 relative bg-slate-950 overflow-hidden flex flex-col">
        {/* Schematic Map Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.3)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
        
        {/* Radar Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(59,130,246,0.1)_60deg,transparent_120deg)] animate-[spin_8s_linear_infinite] rounded-full opacity-30"></div>
        </div>

        {/* Info Overlay */}
        <div className="absolute top-4 left-4 right-4 z-20 pointer-events-none">
          <div className="flex justify-between items-start">
             <div className="bg-slate-900/80 backdrop-blur border border-slate-700 p-3 rounded-lg text-xs font-mono text-slate-400 pointer-events-auto">
                <p>GRID: SECTOR-7</p>
                <p>STATUS: MONITORING</p>
                <p>LIVE FEEDS: ONLINE</p>
             </div>
          </div>
        </div>

        {/* Map Points */}
        <div className="flex-1 relative w-full h-full">
           {points.map((point) => {
             const Icon = getIcon(point.type);
             const isSelected = selectedPoint?.id === point.id;
             
             return (
               <button
                 key={point.id}
                 onClick={() => setSelectedPoint(point)}
                 style={{ top: point.mapPosition.top, left: point.mapPosition.left }}
                 className={`absolute -translate-x-1/2 -translate-y-1/2 group z-10 transition-all duration-500 ${isSelected ? 'scale-125 z-20' : 'hover:scale-110'}`}
               >
                 <div className="relative flex flex-col items-center">
                   {/* Pulse Effect for Safe/Active Points */}
                   {point.status === 'Safe' && (
                     <div className="absolute w-full h-full rounded-full bg-green-500 animate-ping opacity-30"></div>
                   )}
                   {point.status === 'Compromised' && (
                     <div className="absolute w-full h-full rounded-full bg-red-500 animate-ping opacity-30"></div>
                   )}
                   
                   <div className={`relative w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-lg backdrop-blur-sm transition-colors ${
                     isSelected 
                      ? 'bg-slate-900 border-white text-white'
                      : point.status === 'Safe' 
                        ? 'bg-slate-900/80 border-green-500 text-green-500' 
                        : point.status === 'Compromised'
                          ? 'bg-slate-900/80 border-red-500 text-red-500'
                          : 'bg-slate-900/80 border-yellow-500 text-yellow-500'
                   }`}>
                     <Icon className="w-5 h-5" />
                   </div>
                   
                   {/* Label */}
                   <div className={`mt-2 px-2 py-1 bg-slate-900/90 rounded text-xs font-bold whitespace-nowrap border border-slate-700 transition-all ${isSelected ? 'opacity-100 translate-y-0 text-white' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 text-slate-300'}`}>
                     {point.name}
                   </div>
                 </div>
               </button>
             );
           })}
        </div>

        {/* Selected Point Detail Panel (Bottom Mobile / Floating Desktop) */}
        {selectedPoint && (
          <div className="absolute bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur border-t border-slate-700 p-6 z-30 animate-[slideUp_0.3s_ease-out]">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div className="flex gap-4 items-center">
                 <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                   selectedPoint.status === 'Safe' ? 'border-green-500 text-green-500' : 
                   selectedPoint.status === 'Compromised' ? 'border-red-500 text-red-500' : 'border-yellow-500 text-yellow-500'
                 }`}>
                    <Crosshair className="w-6 h-6" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-white">{selectedPoint.name}</h3>
                   <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <span className="bg-slate-800 px-2 py-0.5 rounded text-xs uppercase tracking-wider">{selectedPoint.type}</span>
                      <span>•</span>
                      <span>{selectedPoint.address}</span>
                   </div>
                 </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto">
                <div className="flex gap-8 border-l border-slate-700 pl-6">
                   <div>
                      <p className="text-slate-500 text-xs uppercase font-bold">Capacity</p>
                      <p className="text-xl font-mono text-white">{selectedPoint.currentOccupancy} <span className="text-slate-500 text-sm">/ {selectedPoint.capacity}</span></p>
                   </div>
                   <div>
                      <p className="text-slate-500 text-xs uppercase font-bold">Status</p>
                      <p className={`text-xl font-bold ${
                        selectedPoint.status === 'Safe' ? 'text-green-500' : 
                        selectedPoint.status === 'Compromised' ? 'text-red-500' : 'text-yellow-500'
                      }`}>{selectedPoint.status}</p>
                   </div>
                </div>
                
                <div className="bg-slate-800/50 p-3 rounded border border-slate-700 max-w-xs">
                   <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-300">{selectedPoint.notes}</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};