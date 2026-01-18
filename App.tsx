
import React, { useState, useCallback } from 'react';
import { View, UserSession, RecommendedDestination, UserRole } from './types';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import OnboardingFlow from './components/Onboarding/OnboardingFlow';
import RecommendationsView from './components/RecommendationsView';
import DestinationDetail from './components/DestinationDetail';
import ExploreDestinations from './components/ExploreDestinations';
import PackagesView from './components/PackagesView';
import LoginPage from './components/LoginPage';
import GuideDashboard from './components/GuideDashboard';
import DistributorDashboard from './components/DistributorDashboard';
import HotelDashboard from './components/HotelDashboard';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [history, setHistory] = useState<View[]>([View.HOME]);
  const [selectedDestination, setSelectedDestination] = useState<RecommendedDestination | null>(null);
  const [session, setSession] = useState<UserSession>({
    fullName: '',
    role: undefined,
    travelers: { adults: 1, children: 0 },
    preferences: [],
    startingCity: '',
    budget: '',
    startDate: '',
    endDate: '',
    isLoggedIn: false,
  });

  const navigateTo = useCallback((view: View) => {
    setHistory(prev => {
      if (prev[prev.length - 1] === view) return prev;
      return [...prev, view];
    });
    setCurrentView(view);
    window.scrollTo(0, 0);
  }, []);

  const handleBack = useCallback(() => {
    setHistory(prev => {
      if (prev.length <= 1) {
        setCurrentView(View.HOME);
        return [View.HOME];
      }
      const newHistory = prev.slice(0, -1);
      const prevView = newHistory[newHistory.length - 1];
      setCurrentView(prevView);
      window.scrollTo(0, 0);
      return newHistory;
    });
  }, []);

  const handleUpdateSession = useCallback((updates: Partial<UserSession>) => {
    setSession(prev => ({ ...prev, ...updates }));
  }, []);

  const handleLogout = useCallback(() => {
    setSession({
      fullName: '',
      role: undefined,
      travelers: { adults: 1, children: 0 },
      preferences: [],
      startingCity: '',
      budget: '',
      startDate: '',
      endDate: '',
      isLoggedIn: false,
    });
    setCurrentView(View.HOME);
    setHistory([View.HOME]);
  }, []);

  const handleLoginSuccess = useCallback((userName: string, role: UserRole) => {
    setSession(prev => ({ 
      ...prev,
      isLoggedIn: true,
      fullName: userName,
      role: role
    }));

    // Route based on role
    const roleMap: Record<UserRole, View> = {
      'Customer': View.HOME,
      'Guide': View.DASHBOARD_GUIDE,
      'Package Distributor': View.DASHBOARD_DISTRIBUTOR,
      'Hotel Partner': View.DASHBOARD_HOTEL,
      'Super Admin': View.DASHBOARD_ADMIN
    };
    const targetView = roleMap[role];
    setCurrentView(targetView);
    setHistory([targetView]);
  }, []);

  const handleStartPlanning = useCallback((data?: Partial<UserSession>) => {
    if (data) {
      handleUpdateSession(data);
      navigateTo(View.RECOMMENDATIONS);
    } else {
      navigateTo(View.ONBOARDING);
    }
  }, [handleUpdateSession, navigateTo]);

  const handleDestinationSelect = useCallback((dest: RecommendedDestination) => {
    setSelectedDestination(dest);
    navigateTo(View.DETAILS);
  }, [navigateTo]);

  // Guard: If not logged in, show the Multi-Role Login Page
  if (!session.isLoggedIn) {
    return (
      <LoginPage 
        onBack={() => {}} 
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  const renderView = () => {
    switch (currentView) {
      case View.HOME:
        return (
          <LandingPage 
            onStartPlanning={handleStartPlanning}
            onExplore={() => navigateTo(View.EXPLORE)}
            onPackagesClick={() => navigateTo(View.PACKAGES)}
            onDestinationSelect={handleDestinationSelect}
            onAboutClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
          />
        );
      case View.ONBOARDING:
        return (
          <div className="pt-20">
            <OnboardingFlow 
              session={session}
              onUpdate={handleUpdateSession}
              onComplete={() => navigateTo(View.RECOMMENDATIONS)}
            />
          </div>
        );
      case View.RECOMMENDATIONS:
        return (
          <div className="pt-24">
            <RecommendationsView session={session} onSelect={handleDestinationSelect} />
          </div>
        );
      case View.DETAILS:
        return selectedDestination ? (
          <DestinationDetail destination={selectedDestination} session={session} onBack={handleBack} />
        ) : null;
      case View.EXPLORE:
        return (
          <div className="pt-24">
            <ExploreDestinations onBack={handleBack} onDestinationSelect={handleDestinationSelect} />
          </div>
        );
      case View.PACKAGES:
        return (
          <div className="pt-24">
            <PackagesView onBack={handleBack} onRequestCustom={() => navigateTo(View.ONBOARDING)} />
          </div>
        );
      case View.DASHBOARD_GUIDE:
        return <GuideDashboard userName={session.fullName} onLogout={handleLogout} />;
      case View.DASHBOARD_DISTRIBUTOR:
        return <DistributorDashboard userName={session.fullName} onLogout={handleLogout} />;
      case View.DASHBOARD_HOTEL:
        return <HotelDashboard userName={session.fullName} onLogout={handleLogout} />;
      case View.DASHBOARD_ADMIN:
        return <AdminDashboard userName={session.fullName} onLogout={handleLogout} />;
      case View.DASHBOARD_CUSTOMER:
        return (
          <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
            <div className="bg-white p-16 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100">
              <h1 className="text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight">{session.role} Dashboard</h1>
              <p className="text-xl text-slate-500 font-medium mb-10">Welcome back, {session.fullName}. This space is being optimized for your role.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-48 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 font-bold italic">
                    Feature {i} coming soon...
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return <LandingPage onStartPlanning={handleStartPlanning} onExplore={() => navigateTo(View.EXPLORE)} onPackagesClick={() => navigateTo(View.PACKAGES)} onDestinationSelect={handleDestinationSelect} onAboutClick={() => {}} />;
    }
  };

  // Hide Navbar for Dashboards that have their own sidebar
  const hasCustomLayout = [View.DASHBOARD_GUIDE, View.DASHBOARD_DISTRIBUTOR, View.DASHBOARD_HOTEL, View.DASHBOARD_ADMIN].includes(currentView);
  const forceLightNav = [View.ONBOARDING, View.RECOMMENDATIONS, View.EXPLORE, View.PACKAGES].includes(currentView);

  return (
    <div className="min-h-screen bg-white flex flex-col selection:bg-orange-100 selection:text-orange-900">
      {!hasCustomLayout && (
        <Navbar 
          onHomeClick={() => navigateTo(View.HOME)}
          onDestinationsClick={() => navigateTo(View.EXPLORE)}
          onPackagesClick={() => navigateTo(View.PACKAGES)}
          onAboutClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
          onStartPlanningClick={() => navigateTo(View.ONBOARDING)}
          onLoginClick={() => {}}
          onLogoutClick={handleLogout}
          onDashboardClick={() => {
            if (session.role === 'Customer') navigateTo(View.DASHBOARD_CUSTOMER);
            else if (session.role === 'Guide') navigateTo(View.DASHBOARD_GUIDE);
            else if (session.role === 'Package Distributor') navigateTo(View.DASHBOARD_DISTRIBUTOR);
            else if (session.role === 'Hotel Partner') navigateTo(View.DASHBOARD_HOTEL);
            else if (session.role === 'Super Admin') navigateTo(View.DASHBOARD_ADMIN);
          }}
          isLoggedIn={session.isLoggedIn}
          userName={session.fullName}
          userRole={session.role}
          forceLight={forceLightNav}
        />
      )}
      
      <main className="flex-grow">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
