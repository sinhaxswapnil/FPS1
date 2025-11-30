import React from 'react';
import { LayoutDashboard, Database, Siren, ShieldAlert, Activity, Map, Server, RefreshCw } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  dbStatus: 'connecting' | 'connected' | 'error';
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, dbStatus }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'directory', label: 'Service Database', icon: Database },
    { id: 'evacuation', label: 'Evacuation Routes', icon: Map },
    { id: 'assistant', label: 'AI Assistant', icon: Siren },
  ];

  return (
    <div className="w-20 md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0 z-50 transition-all duration-300">
      <div className="p-4 flex items-center justify-center md:justify-start gap-3 border-b border-slate-800 h-16">
        <ShieldAlert className="w-8 h-8 text-red-500 shrink-0" />
        <span className="hidden md:block font-bold text-lg text-slate-100 tracking-tight">
          SENTINEL<span className="text-red-500">SYS</span>
        </span>
      </div>

      <nav className="flex-1 py-6 flex flex-col gap-2 px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
              activeTab === item.id
                ? 'bg-red-500/10 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <item.icon className={`w-6 h-6 ${activeTab === item.id ? 'text-red-500' : 'text-slate-400 group-hover:text-slate-200'}`} />
            <span className="hidden md:block font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-3">
        {/* System Status */}
        <div className="bg-slate-800/50 rounded-lg p-3 flex items-center gap-3">
          <div className="relative">
            <Activity className="w-5 h-5 text-green-500 animate-pulse" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75"></span>
          </div>
          <div className="hidden md:block">
            <p className="text-xs text-slate-400 uppercase font-semibold">System Status</p>
            <p className="text-sm text-green-400 font-bold">ONLINE</p>
          </div>
        </div>

        {/* Database Status */}
        <div className={`bg-slate-800/50 rounded-lg p-3 flex items-center gap-3 border ${
          dbStatus === 'connected' ? 'border-blue-500/30' : dbStatus === 'error' ? 'border-red-500/30' : 'border-slate-700'
        }`}>
          <div className="relative">
            {dbStatus === 'connecting' ? (
              <RefreshCw className="w-5 h-5 text-yellow-500 animate-spin" />
            ) : dbStatus === 'connected' ? (
              <Server className="w-5 h-5 text-blue-500" />
            ) : (
              <Server className="w-5 h-5 text-red-500" />
            )}
          </div>
          <div className="hidden md:block">
            <p className="text-xs text-slate-400 uppercase font-semibold">MongoDB Status</p>
            <p className={`text-sm font-bold ${
              dbStatus === 'connected' ? 'text-blue-400' : dbStatus === 'connecting' ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {dbStatus === 'connected' ? 'CONNECTED' : dbStatus === 'connecting' ? 'SYNCING...' : 'ERROR'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};