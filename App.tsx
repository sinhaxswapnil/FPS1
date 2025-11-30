import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Directory } from './components/Directory';
import { AiAssistant } from './components/AiAssistant';
import { EvacuationRoutes } from './components/EvacuationRoutes';
import { ServiceEntity, EvacuationPoint } from './types';
import { db } from './services/database';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Data State
  const [services, setServices] = useState<ServiceEntity[]>([]);
  const [evacuationPoints, setEvacuationPoints] = useState<EvacuationPoint[]>([]);
  
  // Connection State
  const [dbStatus, setDbStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');
  const [isLoading, setIsLoading] = useState(true);

  // Initialize DB Connection
  useEffect(() => {
    const initSystem = async () => {
      try {
        setDbStatus('connecting');
        
        // 1. Establish DB Connection
        await db.connect();
        
        // 2. Fetch Data
        const [fetchedServices, fetchedPoints] = await Promise.all([
          db.getServices(),
          db.getEvacuationPoints()
        ]);

        setServices(fetchedServices);
        setEvacuationPoints(fetchedPoints);
        setDbStatus('connected');
      } catch (error) {
        console.error("System Initialization Failed:", error);
        setDbStatus('error');
      } finally {
        setIsLoading(false);
      }
    };

    initSystem();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="h-full flex flex-col items-center justify-center bg-slate-900">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
          <h2 className="text-xl font-bold text-white">Initializing Sentinel Grid...</h2>
          <p className="text-slate-400 mt-2">Connecting to Secure Database Cluster</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard services={services} />;
      case 'directory':
        return <Directory services={services} />;
      case 'evacuation':
        return <EvacuationRoutes points={evacuationPoints} />;
      case 'assistant':
        return <AiAssistant />;
      default:
        return <Dashboard services={services} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        dbStatus={dbStatus} 
      />
      
      <main className="flex-1 ml-20 md:ml-64 h-full relative overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;