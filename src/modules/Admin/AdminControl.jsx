import React, { useState, useEffect } from 'react';
import { 
  Users, Shield, Sliders, Target, Calendar, Bell, Sparkles, 
  Cpu, FileText, Settings, Plus, Trash2, Edit3, Key, Lock, Unlock, 
  UserCheck, UserX, Save, Play, Check, Database, RefreshCw, Download, Info
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminControl = ({ initialTab = 'users' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const showToast = (message, type = 'success') => {
    if (type === 'success') {
      toast.success(message);
    } else {
      toast(message);
    }
  };

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Tab definitions
  const tabs = [
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'roles', name: 'Roles & Permissions', icon: Shield },
    { id: 'kpis', name: 'KPI Management', icon: Sliders },
    { id: 'targets', name: 'Target Management', icon: Target },
    { id: 'scheduler', name: 'Report Scheduler', icon: Calendar },
    { id: 'notifications', name: 'Notification Management', icon: Bell },
    { id: 'ai', name: 'AI Settings', icon: Sparkles },
    { id: 'integrations', name: 'Integration Settings', icon: Cpu },
    { id: 'audit', name: 'Audit Logs', icon: FileText },
    { id: 'system', name: 'System Settings', icon: Settings },
  ];

  // ----------------------------------------------------
  // 1. STATE - USER MANAGEMENT
  // ----------------------------------------------------
  const [users, setUsers] = useState([
    { empId: 'EMP001', name: 'Abishek R', email: 'abishek@astroved.com', phone: '+91 98765 43210', department: 'Analytics', designation: 'Super Admin', role: 'Super Admin', status: 'Active', createdDate: '2025-01-10', lastLogin: '2026-07-14 16:30' },
    { empId: 'EMP002', name: 'Srinivasan K', email: 'srini@astroved.com', phone: '+91 98765 43211', department: 'Marketing', designation: 'Marketing Head', role: 'Marketing Manager', status: 'Active', createdDate: '2025-02-15', lastLogin: '2026-07-14 15:45' },
    { empId: 'EMP003', name: 'Divya M', email: 'divya@astroved.com', phone: '+91 98765 43212', department: 'Operations', designation: 'Operations Manager', role: 'Operations Manager', status: 'Inactive', createdDate: '2025-03-20', lastLogin: '2026-07-10 11:20' }
  ]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({ empId: '', name: '', email: '', phone: '', department: 'Analytics', designation: '', role: 'Analyst' });

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    const added = {
      ...newUser,
      empId: newUser.empId || `EMP${String(users.length + 1).padStart(3, '0')}`,
      status: 'Active',
      createdDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Never'
    };
    setUsers([...users, added]);
    setNewUser({ empId: '', name: '', email: '', phone: '', department: 'Analytics', designation: '', role: 'Analyst' });
    setShowAddUserModal(false);
  };

  const toggleUserStatus = (empId) => {
    setUsers(users.map(u => u.empId === empId ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u));
  };

  // ----------------------------------------------------
  // 2. STATE - ROLES & PERMISSIONS
  // ----------------------------------------------------
  const availableRoles = ['Super Admin', 'Admin', 'CEO', 'CFO', 'CTO', 'COO', 'Product Manager', 'Sales Manager', 'Marketing Manager', 'SEO Manager', 'Operations Manager', 'Finance Manager', 'Data Engineer', 'Developer', 'Support Lead', 'HR Manager', 'Analyst', 'Viewer', 'Guest'];
  const [selectedRole, setSelectedRole] = useState('Analyst');
  const [permissions, setPermissions] = useState({
    dashboard: { executive: true, sales: true, marketing: false, seo: false, customer: true, funnel: false, operations: false, ai: true },
    data: { view: true, export: false, download: true, drillDown: true, viewCost: false, viewRevenue: true, viewProfit: false, viewCustomer: false },
    management: { users: false, roles: false, kpis: false, targets: false, reports: true, ai: false, notifications: false, integrations: false, apis: false },
    crud: { view: true, create: false, edit: false, delete: false, approve: false, publish: false }
  });

  const togglePermission = (category, key) => {
    setPermissions({
      ...permissions,
      [category]: {
        ...permissions[category],
        [key]: !permissions[category][key]
      }
    });
  };

  // ----------------------------------------------------
  // 3. STATE - KPI MANAGEMENT
  // ----------------------------------------------------
  const [kpis, setKpis] = useState([
    { id: 1, name: 'Daily Revenue', category: 'Executive', formula: 'SUM(daily_sales)', order: 1, color: '#6366f1', target: '₹10,00,000', warning: '₹8,00,000', critical: '₹5,00,000' },
    { id: 2, name: 'Conversion Rate', category: 'Sales', formula: 'completed_orders / total_visitors * 100', order: 2, color: '#06b6d4', target: '3.5%', warning: '3.0%', critical: '2.0%' },
    { id: 3, name: 'Google Ads ROAS', category: 'Marketing', formula: 'google_ads_revenue / google_ads_spend', order: 3, color: '#10b981', target: '4.5x', warning: '4.0x', critical: '3.0x' }
  ]);
  const [showAddKPIModal, setShowAddKPIModal] = useState(false);
  const [newKpi, setNewKpi] = useState({ name: '', category: 'Executive', formula: '', order: 1, color: '#6366f1', target: '', warning: '', critical: '' });

  const handleAddKPI = (e) => {
    e.preventDefault();
    if (!newKpi.name) return;
    setKpis([...kpis, { ...newKpi, id: kpis.length + 1 }]);
    setNewKpi({ name: '', category: 'Executive', formula: '', order: 1, color: '#6366f1', target: '', warning: '', critical: '' });
    setShowAddKPIModal(false);
  };

  // ----------------------------------------------------
  // 4. STATE - TARGET MANAGEMENT
  // ----------------------------------------------------
  const [targetMetrics, setTargetMetrics] = useState([
    { id: 1, name: 'Revenue Target', type: 'Monthly', value: '₹5,00,00,000', dept: 'All', country: 'All', product: 'All' },
    { id: 2, name: 'Sales Conversion', type: 'Quarterly', value: '4.2%', dept: 'Sales', country: 'India', product: 'Puja Services' },
    { id: 3, name: 'Marketing ROI', type: 'Annual', value: '5.0x', dept: 'Marketing', country: 'USA', product: 'All' }
  ]);

  // ----------------------------------------------------
  // 5. STATE - REPORT SCHEDULER
  // ----------------------------------------------------
  const [schedules, setSchedules] = useState([
    { id: 1, name: 'Daily Executive Digest', frequency: 'Daily', format: 'PDF', recipients: 'exec-list@astroved.com', timeZone: 'GMT+5:30' },
    { id: 2, name: 'Weekly Marketing Analytics', frequency: 'Weekly', format: 'Excel', recipients: 'marketing-team@astroved.com', timeZone: 'GMT+5:30' }
  ]);
  const [newSchedule, setNewSchedule] = useState({ name: '', frequency: 'Daily', format: 'PDF', recipients: '', ccBcc: '', timeZone: 'GMT+5:30' });

  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (!newSchedule.name || !newSchedule.recipients) return;
    setSchedules([...schedules, { ...newSchedule, id: schedules.length + 1 }]);
    setNewSchedule({ name: '', frequency: 'Daily', format: 'PDF', recipients: '', ccBcc: '', timeZone: 'GMT+5:30' });
  };

  // ----------------------------------------------------
  // 6. STATE - NOTIFICATIONS
  // ----------------------------------------------------
  const [notifSettings, setNotifSettings] = useState({
    emailNotif: true,
    dashboardAlerts: true,
    slackWebhook: 'https://hooks.slack.com/services/...',
    teamsWebhook: '',
    rules: { revenueAlerts: true, kpiAlerts: true, failedPaymentAlerts: true, aiInsightAlerts: false }
  });

  // ----------------------------------------------------
  // 7. STATE - AI SETTINGS
  // ----------------------------------------------------
  const [aiSettings, setAiSettings] = useState({
    apiKey: 'sk-proj-••••••••••••••••••••••••',
    model: 'gpt-4o',
    refreshInterval: '6 Hours',
    maxTokens: 2048,
    temperature: 0.7,
    enabled: true,
    prompts: 'Analyze AstroVed dashboard anomalies and draft immediate strategic interventions.'
  });

  // ----------------------------------------------------
  // 8. STATE - INTEGRATIONS
  // ----------------------------------------------------
  const [integrations, setIntegrations] = useState([
    { id: 'google-analytics', name: 'Google Analytics (GA4)', connected: true, lastSync: '10 min ago' },
    { id: 'google-search-console', name: 'Google Search Console', connected: true, lastSync: '1 hour ago' },
    { id: 'meta-ads', name: 'Meta Ads Manager', connected: false, lastSync: 'Never' },
    { id: 'google-ads', name: 'Google Ads', connected: true, lastSync: '30 min ago' },
    { id: 'crm', name: 'Salesforce CRM', connected: false, lastSync: 'Never' },
    { id: 'payment-gateway', name: 'Razorpay / Stripe', connected: true, lastSync: 'Real-time' },
    { id: 'sql-database', name: 'BigQuery / PostgreSQL', connected: true, lastSync: '15 min ago' }
  ]);

  const toggleIntegration = (id) => {
    setIntegrations(integrations.map(i => i.id === id ? { ...i, connected: !i.connected, lastSync: !i.connected ? 'Just now' : 'Never' } : i));
  };

  // ----------------------------------------------------
  // 9. STATE - AUDIT LOGS
  // ----------------------------------------------------
  const auditLogs = [
    { user: 'Abishek R', action: 'User Login', module: 'Auth', ip: '192.168.1.15', browser: 'Chrome / Windows', date: '2026-07-14', time: '16:30:15' },
    { user: 'Abishek R', action: 'Update KPI target', module: 'KPI Settings', ip: '192.168.1.15', browser: 'Chrome / Windows', date: '2026-07-14', time: '16:10:45' },
    { user: 'Srinivasan K', action: 'Report Download', module: 'Reports Scheduler', ip: '192.168.10.84', browser: 'Safari / macOS', date: '2026-07-14', time: '15:48:22' },
    { user: 'System', action: 'AI Anomalies Generated', module: 'AI Engine', ip: 'Localhost', browser: 'Daemon Process', date: '2026-07-14', time: '12:00:00' }
  ];

  // ----------------------------------------------------
  // 10. STATE - SYSTEM SETTINGS
  // ----------------------------------------------------
  const [systemConfig, setSystemConfig] = useState({
    companyName: 'AstroVed Business Solutions',
    logoUrl: 'https://cdn.astroved.com/images/images-av/AstroVed-Logo.svg',
    themeMode: 'light',
    currency: '₹ (INR)',
    timeZone: 'GMT+5:30 (IST)',
    fiscalYear: 'April - March',
    dateFormat: 'DD-MM-YYYY',
    language: 'English (US)',
    autoBackup: true,
    backupInterval: 'Daily'
  });

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-180px)] select-none">
      
      {/* Tab Navigation Sidebar inside Admin Panel */}
      <div className="w-full lg:w-64 shrink-0 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible border-b lg:border-b-0 lg:border-r border-cosmic-border pb-4 lg:pb-0 lg:pr-4 gap-1.5 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-indigo-600 text-white border-black dark:border-indigo-400 shadow-md shadow-indigo-600/10'
                  : 'border-transparent text-cosmic-muted hover:bg-cosmic-card-hover hover:text-cosmic-text'
              }`}
            >
              <Icon size={14} className={isSelected ? 'text-white' : 'text-cosmic-muted'} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tab Content Panel */}
      <div className="flex-1 min-w-0">
        
        {/* TABS CONTAINER */}
        <div className="bg-cosmic-card border border-cosmic-border rounded-2xl p-5 shadow-sm min-h-[450px]">
          
          {/* TAB 1: USER MANAGEMENT */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-cosmic-border/50">
                <div>
                  <h3 className="text-sm font-extrabold text-cosmic-text">User Directory Management</h3>
                  <p className="text-[10px] text-cosmic-muted mt-0.5">Control employee access permissions, accounts states, and logins audits.</p>
                </div>
                <button 
                  onClick={() => setShowAddUserModal(true)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[10px] font-bold flex items-center space-x-1 shadow-md shadow-indigo-600/10 active:scale-95 transition-transform"
                >
                  <Plus size={12} />
                  <span>Add User</span>
                </button>
              </div>

              {/* Users table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-cosmic-border text-cosmic-muted font-bold text-[10px] uppercase">
                      <th className="py-2.5 px-2">Emp ID</th>
                      <th className="py-2.5 px-2">Name / Email</th>
                      <th className="py-2.5 px-2">Department</th>
                      <th className="py-2.5 px-2">Role</th>
                      <th className="py-2.5 px-2">Last Login</th>
                      <th className="py-2.5 px-2">Status</th>
                      <th className="py-2.5 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cosmic-border/30 text-[11px] text-cosmic-text font-medium">
                    {users.map((u) => (
                      <tr key={u.empId} className="hover:bg-cosmic-card-hover/40 transition-colors">
                        <td className="py-2.5 px-2 font-mono text-cosmic-muted">{u.empId}</td>
                        <td className="py-2.5 px-2">
                          <div className="font-bold">{u.name}</div>
                          <div className="text-[10px] text-cosmic-muted">{u.email}</div>
                        </td>
                        <td className="py-2.5 px-2">{u.department}</td>
                        <td className="py-2.5 px-2 font-semibold text-indigo-500">{u.role}</td>
                        <td className="py-2.5 px-2 font-mono text-cosmic-muted">{u.lastLogin}</td>
                        <td className="py-2.5 px-2">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${u.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-2 text-right">
                          <div className="flex justify-end space-x-1">
                            <button 
                              onClick={() => toggleUserStatus(u.empId)} 
                              title={u.status === 'Active' ? 'Deactivate User' : 'Activate User'}
                              className={`p-1 rounded bg-cosmic-bg hover:bg-cosmic-card-hover border border-cosmic-border ${u.status === 'Active' ? 'text-rose-500' : 'text-emerald-500'}`}
                            >
                              {u.status === 'Active' ? <UserX size={12} /> : <UserCheck size={12} />}
                            </button>
                            <button 
                              onClick={() => showToast(`Reset link dispatched to ${u.email}`)}
                              title="Reset Password"
                              className="p-1 rounded bg-cosmic-bg hover:bg-cosmic-card-hover border border-cosmic-border text-amber-500"
                            >
                              <Key size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: ROLES & PERMISSIONS */}
          {activeTab === 'roles' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-cosmic-border/50">
                <h3 className="text-sm font-extrabold text-cosmic-text">Roles & Permissions Configurator</h3>
                <p className="text-[10px] text-cosmic-muted mt-0.5">Map corporate authorization configurations to specific dashboard metrics and actions.</p>
              </div>

              {/* Role selection dropdown */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="w-full sm:w-64">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-cosmic-muted block mb-1">Select Role Profile</label>
                  <select 
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full bg-cosmic-bg border border-cosmic-border text-xs text-cosmic-text px-3 py-2 rounded-xl focus:outline-none"
                  >
                    {availableRoles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                <div className="text-[10px] text-indigo-400 bg-indigo-500/5 border border-indigo-500/10 p-3 rounded-xl flex items-start space-x-2">
                  <Info size={14} className="shrink-0 mt-0.5" />
                  <p>Changes apply globally to all users mapped as <strong>{selectedRole}</strong>.</p>
                </div>
              </div>

              {/* Permissions Checklist Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                
                {/* Panel A: Dashboard & Data Access */}
                <div className="space-y-4">
                  <div className="p-3 bg-cosmic-bg border border-cosmic-border rounded-xl space-y-3">
                    <h4 className="text-[10px] font-bold text-cosmic-muted uppercase tracking-wider">Dashboard View Access</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.keys(permissions.dashboard).map(key => (
                        <label key={key} className="flex items-center space-x-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={permissions.dashboard[key]} 
                            onChange={() => togglePermission('dashboard', key)}
                            className="w-3.5 h-3.5 rounded accent-indigo-600 cursor-pointer"
                          />
                          <span className="capitalize">{key} Dashboard</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-cosmic-bg border border-cosmic-border rounded-xl space-y-3">
                    <h4 className="text-[10px] font-bold text-cosmic-muted uppercase tracking-wider">Data Actions Permissions</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.keys(permissions.data).map(key => (
                        <label key={key} className="flex items-center space-x-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={permissions.data[key]} 
                            onChange={() => togglePermission('data', key)}
                            className="w-3.5 h-3.5 rounded accent-indigo-600 cursor-pointer"
                          />
                          <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Panel B: Management & CRUD Permissions */}
                <div className="space-y-4">
                  <div className="p-3 bg-cosmic-bg border border-cosmic-border rounded-xl space-y-3">
                    <h4 className="text-[10px] font-bold text-cosmic-muted uppercase tracking-wider">Management Scope Permissions</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.keys(permissions.management).map(key => (
                        <label key={key} className="flex items-center space-x-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={permissions.management[key]} 
                            onChange={() => togglePermission('management', key)}
                            className="w-3.5 h-3.5 rounded accent-indigo-600 cursor-pointer"
                          />
                          <span className="capitalize">Manage {key}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-cosmic-bg border border-cosmic-border rounded-xl space-y-3">
                    <h4 className="text-[10px] font-bold text-cosmic-muted uppercase tracking-wider">General CRUD Settings</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.keys(permissions.crud).map(key => (
                        <label key={key} className="flex items-center space-x-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={permissions.crud[key]} 
                            onChange={() => togglePermission('crud', key)}
                            className="w-3.5 h-3.5 rounded accent-indigo-600 cursor-pointer"
                          />
                          <span className="capitalize">{key}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              <div className="flex justify-end pt-2 border-t border-cosmic-border/30">
                <button 
                  onClick={() => showToast(`Saved permissions for ${selectedRole}!`)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 shadow-lg shadow-indigo-600/10 active:scale-95 transition-transform"
                >
                  <Save size={14} />
                  <span>Save Role Permissions</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: KPI MANAGEMENT */}
          {activeTab === 'kpis' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-cosmic-border/50">
                <div>
                  <h3 className="text-sm font-extrabold text-cosmic-text">KPI & Formula Library Management</h3>
                  <p className="text-[10px] text-cosmic-muted mt-0.5">Define core business metric formulas, display ordering configurations, and warning thresholds.</p>
                </div>
                <button 
                  onClick={() => setShowAddKPIModal(true)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[10px] font-bold flex items-center space-x-1"
                >
                  <Plus size={12} />
                  <span>Add KPI</span>
                </button>
              </div>

              {/* KPI List */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {kpis.map(k => (
                  <div key={k.id} className="p-4 bg-cosmic-bg border border-cosmic-border rounded-xl space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded" style={{ backgroundColor: `${k.color}20`, color: k.color }}>
                          {k.category}
                        </span>
                        <span className="text-[9px] font-mono text-cosmic-muted">Order: {k.order}</span>
                      </div>
                      <h4 className="text-xs font-extrabold text-cosmic-text mt-2">{k.name}</h4>
                      <div className="bg-cosmic-card-hover/30 border border-cosmic-border/30 rounded p-1.5 font-mono text-[9px] text-indigo-400 mt-1 truncate">
                        {k.formula}
                      </div>
                    </div>
                    
                    <div className="pt-2.5 border-t border-cosmic-border/50 grid grid-cols-3 gap-1 text-[9px] text-center">
                      <div>
                        <span className="text-cosmic-muted block">Target</span>
                        <strong className="text-emerald-500">{k.target}</strong>
                      </div>
                      <div>
                        <span className="text-cosmic-muted block">Warning</span>
                        <strong className="text-amber-500">{k.warning}</strong>
                      </div>
                      <div>
                        <span className="text-cosmic-muted block">Critical</span>
                        <strong className="text-rose-500">{k.critical}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TARGET MANAGEMENT */}
          {activeTab === 'targets' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-cosmic-border/50">
                <h3 className="text-sm font-extrabold text-cosmic-text">Target Settings Matrix</h3>
                <p className="text-[10px] text-cosmic-muted mt-0.5">Configure targets for Revenue, Sales, Marketing, SEO, and Customers across custom segments.</p>
              </div>

              {/* Targets List */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-cosmic-border text-cosmic-muted font-bold text-[10px] uppercase">
                      <th className="py-2 px-2">Target Metric</th>
                      <th className="py-2 px-2">Frequency</th>
                      <th className="py-2 px-2 text-right">Target Value</th>
                      <th className="py-2 px-2">Department</th>
                      <th className="py-2 px-2">Country Scope</th>
                      <th className="py-2 px-2">Product Target</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cosmic-border/30 text-[11px] text-cosmic-text font-medium">
                    {targetMetrics.map((t) => (
                      <tr key={t.id} className="hover:bg-cosmic-card-hover/40 transition-colors">
                        <td className="py-2.5 px-2 font-bold text-cosmic-text">{t.name}</td>
                        <td className="py-2.5 px-2">{t.type}</td>
                        <td className="py-2.5 px-2 text-right font-bold text-emerald-500">{t.value}</td>
                        <td className="py-2.5 px-2 font-mono text-cosmic-muted">{t.dept}</td>
                        <td className="py-2.5 px-2 font-semibold text-indigo-400">{t.country}</td>
                        <td className="py-2.5 px-2 text-cosmic-muted">{t.product}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: REPORT SCHEDULER */}
          {activeTab === 'scheduler' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-cosmic-border/50">
                <h3 className="text-sm font-extrabold text-cosmic-text">Automated Reports Scheduler</h3>
                <p className="text-[10px] text-cosmic-muted mt-0.5">Configure report generation intervals, CC/BCC recipients, and trigger email test dispatches.</p>
              </div>

              {/* Add schedule form */}
              <form onSubmit={handleAddSchedule} className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-cosmic-bg border border-cosmic-border rounded-xl">
                <div className="col-span-1">
                  <label className="text-[9px] font-bold text-cosmic-muted uppercase block mb-1">Schedule Name</label>
                  <input 
                    type="text" 
                    placeholder="Weekly Sales Digest"
                    value={newSchedule.name}
                    onChange={(e) => setNewSchedule({ ...newSchedule, name: e.target.value })}
                    className="w-full bg-cosmic-card border border-cosmic-border text-xs text-cosmic-text px-3 py-1.5 rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-cosmic-muted uppercase block mb-1">Frequency</label>
                  <select 
                    value={newSchedule.frequency}
                    onChange={(e) => setNewSchedule({ ...newSchedule, frequency: e.target.value })}
                    className="w-full bg-cosmic-card border border-cosmic-border text-xs text-cosmic-text px-3 py-1.5 rounded-lg focus:outline-none"
                  >
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Quarterly</option>
                    <option>Yearly</option>
                  </select>
                </div>
                <div>
                  <label className="text-[9px] font-bold text-cosmic-muted uppercase block mb-1">Format</label>
                  <select 
                    value={newSchedule.format}
                    onChange={(e) => setNewSchedule({ ...newSchedule, format: e.target.value })}
                    className="w-full bg-cosmic-card border border-cosmic-border text-xs text-cosmic-text px-3 py-1.5 rounded-lg focus:outline-none"
                  >
                    <option>PDF</option>
                    <option>Excel</option>
                    <option>CSV</option>
                  </select>
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label className="text-[9px] font-bold text-cosmic-muted uppercase block mb-1">Recipients (Comma separated)</label>
                  <input 
                    type="text" 
                    placeholder="analytics-leads@astroved.com"
                    value={newSchedule.recipients}
                    onChange={(e) => setNewSchedule({ ...newSchedule, recipients: e.target.value })}
                    className="w-full bg-cosmic-card border border-cosmic-border text-xs text-cosmic-text px-3 py-1.5 rounded-lg focus:outline-none"
                  />
                </div>
                <div className="flex items-end">
                  <button 
                    type="submit"
                    className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-transform active:scale-95"
                  >
                    Create Schedule
                  </button>
                </div>
              </form>

              {/* Active schedules */}
              <div className="space-y-2.5">
                <h4 className="text-[10px] font-bold text-cosmic-muted uppercase tracking-wider">Active Schedules</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {schedules.map(s => (
                    <div key={s.id} className="p-3 bg-cosmic-bg border border-cosmic-border rounded-xl flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <h5 className="text-xs font-bold text-cosmic-text truncate">{s.name}</h5>
                        <p className="text-[9px] text-cosmic-muted mt-0.5">{s.frequency} ({s.format}) • {s.recipients}</p>
                      </div>
                      <button 
                        onClick={() => showToast(`Test report triggered for ${s.name}!`)}
                        className="ml-3 px-2 py-1 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 text-[9px] font-bold rounded-lg shrink-0"
                      >
                        Send Test
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-cosmic-border/50">
                <h3 className="text-sm font-extrabold text-cosmic-text">Notification Channels & Webhooks</h3>
                <p className="text-[10px] text-cosmic-muted mt-0.5">Toggle notification rules for revenue milestones, KPI alerts, and payment gateways failures.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Webhooks configuration */}
                <div className="space-y-3 p-3 bg-cosmic-bg border border-cosmic-border rounded-xl">
                  <h4 className="text-[10px] font-bold text-cosmic-muted uppercase tracking-wider">Chat Ops Integrations</h4>
                  <div>
                    <label className="text-[9px] font-bold text-cosmic-muted uppercase block mb-1">Slack Webhook URL</label>
                    <input 
                      type="text" 
                      value={notifSettings.slackWebhook}
                      onChange={(e) => setNotifSettings({ ...notifSettings, slackWebhook: e.target.value })}
                      className="w-full bg-cosmic-card border border-cosmic-border text-xs text-cosmic-text px-3 py-1.5 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-cosmic-muted uppercase block mb-1">Microsoft Teams Webhook URL</label>
                    <input 
                      type="text" 
                      placeholder="https://outlook.office.com/webhook/..."
                      value={notifSettings.teamsWebhook}
                      onChange={(e) => setNotifSettings({ ...notifSettings, teamsWebhook: e.target.value })}
                      className="w-full bg-cosmic-card border border-cosmic-border text-xs text-cosmic-text px-3 py-1.5 rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                {/* Notification Rules */}
                <div className="space-y-3 p-3 bg-cosmic-bg border border-cosmic-border rounded-xl justify-between flex flex-col">
                  <div>
                    <h4 className="text-[10px] font-bold text-cosmic-muted uppercase tracking-wider mb-2.5">Alert Triggering Rules</h4>
                    <div className="space-y-2 text-xs">
                      {Object.keys(notifSettings.rules).map(key => (
                        <label key={key} className="flex items-center space-x-2.5 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={notifSettings.rules[key]} 
                            onChange={() => setNotifSettings({
                              ...notifSettings,
                              rules: { ...notifSettings.rules, [key]: !notifSettings.rules[key] }
                            })}
                            className="w-3.5 h-3.5 rounded accent-indigo-600 cursor-pointer"
                          />
                          <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => showToast('Saved Notification Settings!')}
                    className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold mt-2"
                  >
                    Save Rules
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: AI SETTINGS */}
          {activeTab === 'ai' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-cosmic-border/50">
                <h3 className="text-sm font-extrabold text-cosmic-text">AI Cognitive & Engine Settings</h3>
                <p className="text-[10px] text-cosmic-muted mt-0.5">Configure target models, max tokens budgets, API keys, and prompt templates.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-[9px] font-bold text-cosmic-muted uppercase block mb-1">OpenAI API Key</label>
                    <input 
                      type="password" 
                      value={aiSettings.apiKey}
                      onChange={(e) => setAiSettings({ ...aiSettings, apiKey: e.target.value })}
                      className="w-full bg-cosmic-bg border border-cosmic-border text-xs text-cosmic-text px-3 py-1.5 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] font-bold text-cosmic-muted uppercase block mb-1">AI Model Selection</label>
                      <select 
                        value={aiSettings.model}
                        onChange={(e) => setAiSettings({ ...aiSettings, model: e.target.value })}
                        className="w-full bg-cosmic-bg border border-cosmic-border text-xs text-cosmic-text px-3 py-1.5 rounded-lg focus:outline-none"
                      >
                        <option>gpt-4o</option>
                        <option>gpt-4-turbo</option>
                        <option>gpt-3.5-turbo</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-cosmic-muted uppercase block mb-1">AI Refresh Interval</label>
                      <select 
                        value={aiSettings.refreshInterval}
                        onChange={(e) => setAiSettings({ ...aiSettings, refreshInterval: e.target.value })}
                        className="w-full bg-cosmic-bg border border-cosmic-border text-xs text-cosmic-text px-3 py-1.5 rounded-lg focus:outline-none"
                      >
                        <option>1 Hour</option>
                        <option>6 Hours</option>
                        <option>Daily</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[9px] font-bold text-cosmic-muted uppercase block mb-1">Prompt Template Context</label>
                    <textarea 
                      rows={3}
                      value={aiSettings.prompts}
                      onChange={(e) => setAiSettings({ ...aiSettings, prompts: e.target.value })}
                      className="w-full bg-cosmic-bg border border-cosmic-border text-xs text-cosmic-text px-3 py-1.5 rounded-lg focus:outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3.5 border-t border-cosmic-border/50">
                <span className="text-[10px] text-cosmic-muted font-bold">Max Tokens: {aiSettings.maxTokens} | Temp: {aiSettings.temperature}</span>
                <button 
                  onClick={() => showToast('Saved Cognitive AI Configurations!')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/10"
                >
                  Save Cognitive Configurations
                </button>
              </div>
            </div>
          )}

          {/* TAB 8: INTEGRATION SETTINGS */}
          {activeTab === 'integrations' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-cosmic-border/50">
                <h3 className="text-sm font-extrabold text-cosmic-text">Integration Connectors</h3>
                <p className="text-[10px] text-cosmic-muted mt-0.5">Toggle and configure integration keys for external advertisement managers, databases, and CRMs.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map(int => (
                  <div key={int.id} className="p-3 bg-cosmic-bg border border-cosmic-border rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-cosmic-text">{int.name}</h4>
                      <span className="text-[9px] text-cosmic-muted block mt-0.5">Last Sync: {int.lastSync}</span>
                    </div>
                    <button 
                      onClick={() => toggleIntegration(int.id)}
                      className={`px-3 py-1 rounded-lg text-[9px] font-bold border transition-colors ${
                        int.connected 
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                          : 'bg-cosmic-card border-cosmic-border text-cosmic-muted hover:text-cosmic-text'
                      }`}
                    >
                      {int.connected ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: AUDIT LOGS */}
          {activeTab === 'audit' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-cosmic-border/50">
                <div>
                  <h3 className="text-sm font-extrabold text-cosmic-text">Global Audit Log Trail</h3>
                  <p className="text-[10px] text-cosmic-muted mt-0.5">Immutable audit trails tracking settings actions, login events, and report triggers.</p>
                </div>
                <button 
                  onClick={() => showToast('Exporting Audit Trail to CSV!')}
                  className="px-2.5 py-1.5 bg-cosmic-bg border border-cosmic-border hover:bg-cosmic-card-hover rounded-lg text-[9px] font-bold flex items-center space-x-1 text-cosmic-text"
                >
                  <Download size={11} />
                  <span>Download Logs</span>
                </button>
              </div>

              {/* Logs table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-cosmic-border text-cosmic-muted font-bold text-[10px] uppercase">
                      <th className="py-2 px-2">User</th>
                      <th className="py-2 px-2">Action Event</th>
                      <th className="py-2 px-2">Module</th>
                      <th className="py-2 px-2">IP Address</th>
                      <th className="py-2 px-2">Browser / OS</th>
                      <th className="py-2 px-2 text-right">Date & Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cosmic-border/30 text-[11px] text-cosmic-text font-medium">
                    {auditLogs.map((l, idx) => (
                      <tr key={idx} className="hover:bg-cosmic-card-hover/40 transition-colors">
                        <td className="py-2.5 px-2 font-bold text-cosmic-text">{l.user}</td>
                        <td className="py-2.5 px-2 text-indigo-400 font-semibold">{l.action}</td>
                        <td className="py-2.5 px-2 font-mono text-[10px] text-cosmic-muted">{l.module}</td>
                        <td className="py-2.5 px-2 font-mono text-[10px] text-cosmic-muted">{l.ip}</td>
                        <td className="py-2.5 px-2 text-cosmic-muted truncate max-w-[130px]">{l.browser}</td>
                        <td className="py-2.5 px-2 text-right font-mono text-cosmic-muted">{l.date} {l.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 10: SYSTEM SETTINGS */}
          {activeTab === 'system' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-cosmic-border/50">
                <h3 className="text-sm font-extrabold text-cosmic-text">BI System Configuration</h3>
                <p className="text-[10px] text-cosmic-muted mt-0.5">Control company profile, currency units, formats, backups options, and locale rules.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3 p-3 bg-cosmic-bg border border-cosmic-border rounded-xl">
                  <h4 className="text-[10px] font-bold text-cosmic-muted uppercase tracking-wider">Company Profile</h4>
                  <div>
                    <label className="text-[9px] font-bold text-cosmic-muted uppercase block mb-1">Company Name</label>
                    <input 
                      type="text" 
                      value={systemConfig.companyName}
                      onChange={(e) => setSystemConfig({ ...systemConfig, companyName: e.target.value })}
                      className="w-full bg-cosmic-card border border-cosmic-border text-xs text-cosmic-text px-3 py-1.5 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] font-bold text-cosmic-muted uppercase block mb-1">Theme Mode</label>
                      <select 
                        value={systemConfig.themeMode}
                        onChange={(e) => setSystemConfig({ ...systemConfig, themeMode: e.target.value })}
                        className="w-full bg-cosmic-card border border-cosmic-border text-xs text-cosmic-text px-3 py-1.5 rounded-lg focus:outline-none"
                      >
                        <option value="light">Light Mode</option>
                        <option value="dark">Dark Mode</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-cosmic-muted uppercase block mb-1">System Currency</label>
                      <select 
                        value={systemConfig.currency}
                        onChange={(e) => setSystemConfig({ ...systemConfig, currency: e.target.value })}
                        className="w-full bg-cosmic-card border border-cosmic-border text-xs text-cosmic-text px-3 py-1.5 rounded-lg focus:outline-none"
                      >
                        <option>৳ (BDT)</option>
                        <option>₹ (INR)</option>
                        <option>$ (USD)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 p-3 bg-cosmic-bg border border-cosmic-border rounded-xl justify-between flex flex-col">
                  <div>
                    <h4 className="text-[10px] font-bold text-cosmic-muted uppercase tracking-wider mb-2.5">Backup Settings</h4>
                    <div className="space-y-2 text-xs">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={systemConfig.autoBackup}
                          onChange={(e) => setSystemConfig({ ...systemConfig, autoBackup: e.target.checked })}
                          className="w-3.5 h-3.5 rounded accent-indigo-600 cursor-pointer"
                        />
                        <span>Enable Auto Database Backup</span>
                      </label>
                      <div className="mt-2.5">
                        <label className="text-[9px] font-bold text-cosmic-muted uppercase block mb-1">Backup Frequency</label>
                        <select 
                          value={systemConfig.backupInterval}
                          onChange={(e) => setSystemConfig({ ...systemConfig, backupInterval: e.target.value })}
                          className="w-full bg-cosmic-card border border-cosmic-border text-xs text-cosmic-text px-3 py-1.5 rounded-lg focus:outline-none"
                        >
                          <option>Hourly</option>
                          <option>Daily</option>
                          <option>Weekly</option>
                          <option>Monthly</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => showToast('Auto backup triggered successfully!')}
                    className="w-full py-1.5 bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 rounded-lg text-xs font-bold mt-2 flex items-center justify-center space-x-1"
                  >
                    <Database size={13} />
                    <span>Backup Database Now</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* ----------------------------------------------------
      // MODAL - ADD USER MODAL
      // ---------------------------------------------------- */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cosmic-card border border-cosmic-border rounded-2xl w-full max-w-md p-5 shadow-2xl relative">
            <h4 className="text-sm font-extrabold text-cosmic-text mb-1">Add New Portal User</h4>
            <p className="text-[10px] text-cosmic-muted mb-4">Input the details of the employee to initiate portal access.</p>
            
            <form onSubmit={handleAddUser} className="space-y-3 text-xs">
              <div>
                <label className="text-[9px] font-bold uppercase tracking-wider text-cosmic-muted block mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full bg-cosmic-bg border border-cosmic-border px-3 py-2 rounded-xl text-cosmic-text focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[9px] font-bold uppercase tracking-wider text-cosmic-muted block mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="name@astroved.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full bg-cosmic-bg border border-cosmic-border px-3 py-2 rounded-xl text-cosmic-text focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] font-bold uppercase tracking-wider text-cosmic-muted block mb-1">Designation</label>
                  <input 
                    type="text" 
                    placeholder="Analyst Lead"
                    value={newUser.designation}
                    onChange={(e) => setNewUser({ ...newUser, designation: e.target.value })}
                    className="w-full bg-cosmic-bg border border-cosmic-border px-3 py-2 rounded-xl text-cosmic-text focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase tracking-wider text-cosmic-muted block mb-1">Department</label>
                  <select 
                    value={newUser.department}
                    onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                    className="w-full bg-cosmic-bg border border-cosmic-border px-3 py-2 rounded-xl text-cosmic-text focus:outline-none"
                  >
                    <option>Analytics</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                    <option>SEO</option>
                    <option>Operations</option>
                    <option>Developer</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-cosmic-border/30">
                <button 
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-3.5 py-2 bg-cosmic-bg hover:bg-cosmic-card-hover border border-cosmic-border rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-md shadow-indigo-600/10"
                >
                  Save User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
      // MODAL - ADD KPI MODAL
      // ---------------------------------------------------- */}
      {showAddKPIModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cosmic-card border border-cosmic-border rounded-2xl w-full max-w-md p-5 shadow-2xl relative">
            <h4 className="text-sm font-extrabold text-cosmic-text mb-1">Add New KPI Metric</h4>
            <p className="text-[10px] text-cosmic-muted mb-4">Draft customized metrics formulas and target thresholds parameters.</p>
            
            <form onSubmit={handleAddKPI} className="space-y-3 text-xs">
              <div>
                <label className="text-[9px] font-bold uppercase tracking-wider text-cosmic-muted block mb-1">KPI Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Marketing ROI"
                  value={newKpi.name}
                  onChange={(e) => setNewKpi({ ...newKpi, name: e.target.value })}
                  className="w-full bg-cosmic-bg border border-cosmic-border px-3 py-2 rounded-xl text-cosmic-text focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[9px] font-bold uppercase tracking-wider text-cosmic-muted block mb-1">Formula String</label>
                <input 
                  type="text" 
                  placeholder="e.g. ad_revenue / ad_spend"
                  value={newKpi.formula}
                  onChange={(e) => setNewKpi({ ...newKpi, formula: e.target.value })}
                  className="w-full bg-cosmic-bg border border-cosmic-border px-3 py-2 rounded-xl text-cosmic-text focus:outline-none font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] font-bold uppercase tracking-wider text-cosmic-muted block mb-1">Category</label>
                  <select 
                    value={newKpi.category}
                    onChange={(e) => setNewKpi({ ...newKpi, category: e.target.value })}
                    className="w-full bg-cosmic-bg border border-cosmic-border px-3 py-2 rounded-xl text-cosmic-text focus:outline-none"
                  >
                    <option>Executive</option>
                    <option>Sales</option>
                    <option>Marketing</option>
                    <option>SEO</option>
                    <option>Operations</option>
                  </select>
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase tracking-wider text-cosmic-muted block mb-1">Target</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 5.5%"
                    value={newKpi.target}
                    onChange={(e) => setNewKpi({ ...newKpi, target: e.target.value })}
                    className="w-full bg-cosmic-bg border border-cosmic-border px-3 py-2 rounded-xl text-cosmic-text focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-cosmic-border/30">
                <button 
                  type="button"
                  onClick={() => setShowAddKPIModal(false)}
                  className="px-3.5 py-2 bg-cosmic-bg hover:bg-cosmic-card-hover border border-cosmic-border rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-md shadow-indigo-600/10"
                >
                  Save KPI
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminControl;
