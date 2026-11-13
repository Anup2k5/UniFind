import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrowseView } from './components/BrowseView';
import { SmartMatchesView } from './components/SmartMatchesView';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminPanel } from './components/AdminPanel';
import { CampusMapSafeZones } from './components/CampusMapSafeZones';
import { ReportItemModal } from './components/ReportItemModal';
import { ItemDetailsModal } from './components/ItemDetailsModal';
import { ClaimModal } from './components/ClaimModal';
import { PrintFlyerModal } from './components/PrintFlyerModal';
import { AuthModal } from './components/AuthModal';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

function MainContent() {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="flex-1">
        {activeTab === 'browse' && (
          <>
            <Hero />
            <BrowseView />
          </>
        )}

        {activeTab === 'matches' && <SmartMatchesView />}
        {activeTab === 'dashboard' && <StudentDashboard />}
        {activeTab === 'admin' && <AdminPanel />}
        {activeTab === 'safe-zones' && <CampusMapSafeZones />}
      </main>

      <Footer />

      {/* Global Modals & Overlays */}
      <ReportItemModal />
      <ItemDetailsModal />
      <ClaimModal />
      <PrintFlyerModal />
      <AuthModal />
      <ToastContainer />
    </div>
  );
}

export function App() {
  return <MainContent />;
}

export default App;
