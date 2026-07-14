import React, { useState } from 'react';
import { DateFilterProvider } from './contexts/DateFilterContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Executive from './modules/Executive/Executive';
import Sales from './modules/Sales/Sales';
import Marketing from './modules/Marketing/Marketing';
import SEO from './modules/SEO/SEO';
import Customer from './modules/Customer/Customer';
import Funnel from './modules/Funnel/Funnel';
import Operations from './modules/Operations/Operations';
import AIInsights from './modules/AIInsights/AIInsights';
import ReportsBuilder from './modules/Reports/ReportsBuilder';
import AdminControl from './modules/Admin/AdminControl';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';


function MainAppContent() {
  const [currentModule, setCurrentModule] = useState('executive');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Render correct dashboard module
  const renderModule = () => {
    switch (currentModule) {
      case 'executive':
        return <Executive />;
      case 'sales':
        return <Sales />;
      case 'marketing':
        return <Marketing />;
      case 'seo':
        return <SEO />;
      case 'customer':
        return <Customer />;
      case 'funnel':
        return <Funnel />;
      case 'operations':
        return <Operations />;
      case 'ai-insights':
      case 'alerts':
      case 'notifications':
        return <AIInsights />;
      case 'reports':
      case 'report-scheduler':
      case 'data-management':
      case 'daily-report':
      case 'weekly-report':
      case 'monthly-report':
      case 'quarterly-report':
      case 'yearly-report':
      case 'export-excel':
      case 'export-pdf':
      case 'export-csv':
        return <ReportsBuilder />;
      case 'user-management':
        return <AdminControl initialTab="users" />;
      case 'kpi-management':
        return <AdminControl initialTab="targets" />;
      case 'system-settings':
      case 'integrations':
        return <AdminControl initialTab="ai" />;
      default:
        return <Executive />;
    }
  };

  const getModuleTitle = () => {
    const titles = {
      executive: 'Executive Performance Summary',
      sales: 'Sales & Product Performance',
      marketing: 'Marketing Performance & ROI',
      seo: 'Search Engine Optimization (SEO)',
      customer: 'Customer Cohorts & Retention',
      funnel: 'Conversion Funnel Analysis',
      operations: 'Operational Diagnostics',
      'ai-insights': 'AI Anomalies & Insights',
      reports: 'BI Reports Exporter',
      'report-scheduler': 'BI Report Scheduler',
      alerts: 'Strategic Anomaly Alerts',
      notifications: 'System Notifications',
      'data-management': 'Data Management Audit',
      'user-management': 'User Management Settings',
      'kpi-management': 'KPI Target & Milestone Config',
      'system-settings': 'BI System Settings',
      integrations: 'Third Party Integrations',
      'daily-report': 'Daily BI Report Scheduler',
      'weekly-report': 'Weekly BI Report Scheduler',
      'monthly-report': 'Monthly BI Report Scheduler',
      'quarterly-report': 'Quarterly BI Report Scheduler',
      'yearly-report': 'Yearly BI Report Scheduler',
      'export-excel': 'Export Data to Excel',
      'export-pdf': 'Export Data to PDF',
      'export-csv': 'Export Data to CSV'
    };
    return titles[currentModule] || 'Dashboard';
  };


  return (
    <div className="flex bg-cosmic-bg h-screen text-cosmic-text font-sans relative overflow-hidden">


      {/* Mobile Sidebar Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden transition-all duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        currentModule={currentModule}
        setCurrentModule={(mod) => {
          setCurrentModule(mod);
          setMobileMenuOpen(false); // Close mobile drawer on selection
        }}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Header
          title={getModuleTitle()}
          onSearch={(val) => console.log('Searching for:', val)}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        <main className="p-4 md:p-6 overflow-y-auto flex-1">
          {renderModule()}
        </main>
      </div>
    </div>
  );
}


function App() {
  return (
    <ThemeProvider>
      <DateFilterProvider>
        <MainAppContent />
      </DateFilterProvider>
    </ThemeProvider>
  );
}


export default App;
