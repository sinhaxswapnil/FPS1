import React, { useMemo } from 'react';
import { ServiceEntity, ServiceCategory } from '../types';
import { Users, Truck, AlertTriangle, CheckCircle, Droplets, HeartPulse, Activity } from 'lucide-react';
import { CATEGORY_COLORS } from '../constants';

interface DashboardProps {
  services: ServiceEntity[];
}

export const Dashboard: React.FC<DashboardProps> = ({ services }) => {
  const stats = useMemo(() => {
    const total = services.length;
    const operational = services.filter(s => s.status === 'Operational').length;
    const offline = services.filter(s => s.status === 'Offline').length;
    const fireUnits = services.filter(s => s.category === ServiceCategory.FIRE_BRIGADE).length;
    const medicalUnits = services.filter(s => s.category === ServiceCategory.HOSPITAL || s.category === ServiceCategory.AMBULANCE).length;
    const waterUnits = services.filter(s => s.category === ServiceCategory.WATER_SUPPLY).length;

    return { total, operational, offline, fireUnits, medicalUnits, waterUnits };
  }, [services]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Command Center Overview</h2>
        <p className="text-slate-400">Real-time status monitoring of emergency infrastructure.</p>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <CheckCircle className="w-24 h-24 text-green-500" />
          </div>
          <p className="text-slate-400 text-sm font-medium uppercase">Operational Rate</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white">{Math.round((stats.operational / stats.total) * 100)}%</span>
            <span className="text-sm text-green-500 font-medium">({stats.operational}/{stats.total})</span>
          </div>
          <div className="mt-4 w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-green-500 h-full rounded-full transition-all duration-1000" 
              style={{ width: `${(stats.operational / stats.total) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Truck className="w-24 h-24 text-orange-500" />
          </div>
          <p className="text-slate-400 text-sm font-medium uppercase">Fire & Rescue Units</p>
          <div className="mt-2">
            <span className="text-4xl font-bold text-white">{stats.fireUnits}</span>
          </div>
          <p className="mt-1 text-sm text-orange-400">Active Stations</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <HeartPulse className="w-24 h-24 text-red-500" />
          </div>
          <p className="text-slate-400 text-sm font-medium uppercase">Medical Infrastructure</p>
          <div className="mt-2">
            <span className="text-4xl font-bold text-white">{stats.medicalUnits}</span>
          </div>
          <p className="mt-1 text-sm text-red-400">Hospitals & Ambos</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <AlertTriangle className="w-24 h-24 text-yellow-500" />
          </div>
          <p className="text-slate-400 text-sm font-medium uppercase">Critical Alerts</p>
          <div className="mt-2">
            <span className="text-4xl font-bold text-white">{stats.offline}</span>
          </div>
          <p className="mt-1 text-sm text-yellow-400">Units Offline</p>
        </div>
      </div>

      {/* Recent Alerts / Quick Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" />
            Live Resource Feed
          </h3>
          <div className="space-y-3">
            {services.slice(0, 5).map(service => (
              <div key={service.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${service.status === 'Operational' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'}`}></div>
                  <div>
                    <p className="font-semibold text-slate-200">{service.name}</p>
                    <p className="text-xs text-slate-400">{service.category} • {service.phone}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded border ${CATEGORY_COLORS[service.category]}`}>
                  {service.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-900/20 to-slate-800 border border-red-900/30 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-4">Water Supply Status</h3>
          <div className="flex items-center justify-center py-8">
             <div className="relative">
               <Droplets className="w-32 h-32 text-cyan-600 opacity-20" />
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-4xl font-bold text-cyan-400">{stats.waterUnits}</span>
                 <span className="text-xs text-cyan-200 uppercase tracking-widest mt-1">Active Sources</span>
               </div>
             </div>
          </div>
          <p className="text-sm text-slate-400 text-center">
            Monitor fire hydrants and main water supply lines for pressure drops.
          </p>
        </div>
      </div>
    </div>
  );
};