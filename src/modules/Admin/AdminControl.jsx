import React, { useState } from 'react';
import { Shield, Users, Target, Sparkles, Plus, Check, Save } from 'lucide-react';

const AdminControl = ({ initialTab = 'users' }) => {
  // Tab control
  const [activeTab, setActiveTab] = useState(initialTab);

  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);


  // Admin state - Users
  const [usersList, setUsersList] = useState([
    { id: 1, name: 'Abishek R', email: 'abishek@astroved.com', role: 'Administrator', permissions: 'All Access', status: 'Active' },
    { id: 2, name: 'Srinivasan K', email: 'srini@astroved.com', role: 'Marketing Manager', permissions: 'Marketing, SEO', status: 'Active' },
    { id: 3, name: 'Divya M', email: 'divya@astroved.com', role: 'Operations Lead', permissions: 'Operations, Sales', status: 'Active' },
  ]);

  // Admin state - Targets
  const [targets, setTargets] = useState({
    dailyRevenueTarget: 10000,
    mtdRevenueTarget: 300000,
    ytdRevenueTarget: 3600000,
    checkoutConversionTarget: 8.5
  });

  // Admin state - AI Settings
  const [aiSettings, setAiSettings] = useState({
    model: 'gpt-4o',
    anomaliesScanFreq: 'daily',
    autoTaskTrigger: false,
    confidenceThreshold: 85
  });

  const handleTargetChange = (key, val) => {
    setTargets(prev => ({
      ...prev,
      [key]: Number(val)
    }));
  };

  const handleAiChange = (key, val) => {
    setAiSettings(prev => ({
      ...prev,
      [key]: val
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Admin Tab Nav */}
      <div className="flex space-x-2 border-b border-cosmic-border pb-1">
        {[
          { id: 'users', label: 'User Roles & Access', icon: Users },
          { id: 'targets', label: 'KPI Target Management', icon: Target },
          { id: 'ai', label: 'AI Cognitive Engines', icon: Sparkles }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 ${
                isActive 
                  ? 'border-indigo-500 text-cosmic-text bg-cosmic-card-hover' 
                  : 'border-transparent text-cosmic-muted hover:text-cosmic-text'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="space-y-6">
        {/* USERS PANEL */}
        {activeTab === 'users' && (
          <div className="bg-cosmic-card border border-cosmic-border p-6 rounded-2xl space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-cosmic-text font-semibold text-sm flex items-center">
                  <Shield size={16} className="text-indigo-400 mr-1.5" />
                  User Access Management
                </h4>
                <p className="text-xs text-cosmic-muted mt-0.5">Configure system users, control scopes, and restrict panel access.</p>
              </div>
              <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/10 transition-all hover:scale-105 active:scale-95">
                <Plus size={14} />
                <span>Invite User</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-cosmic-border text-cosmic-muted font-medium">
                    <th className="py-2.5 pl-4">Full Name</th>
                    <th className="py-2.5">Email</th>
                    <th className="py-2.5">Assigned Role</th>
                    <th className="py-2.5">Scope Permissions</th>
                    <th className="py-2.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cosmic-border/30 text-cosmic-text">
                  {usersList.map((usr) => (
                    <tr key={usr.id} className="hover:bg-cosmic-card-hover transition-colors">
                      <td className="py-3 pl-4 font-semibold">{usr.name}</td>
                      <td className="py-3 font-mono text-cosmic-muted">{usr.email}</td>
                      <td className="py-3 font-semibold text-indigo-400">{usr.role}</td>
                      <td className="py-3 text-xs text-cosmic-muted font-mono">{usr.permissions}</td>
                      <td className="py-3 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-500">
                          <Check size={10} className="mr-1" />
                          {usr.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TARGETS PANEL */}
        {activeTab === 'targets' && (
          <div className="bg-cosmic-card border border-cosmic-border p-6 rounded-2xl space-y-6">
            <div>
              <h4 className="text-cosmic-text font-semibold text-sm flex items-center">
                <Target size={16} className="text-indigo-400 mr-1.5" />
                Revenue & Conversion KPI Targets
              </h4>
              <p className="text-xs text-cosmic-muted mt-0.5">Define milestones displayed across the dashboards to compute target attainments.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-cosmic-text">Daily Revenue Goal ($)</label>
                  <input
                    type="number"
                    value={targets.dailyRevenueTarget}
                    onChange={(e) => handleTargetChange('dailyRevenueTarget', e.target.value)}
                    className="w-full bg-cosmic-bg border border-cosmic-border px-3 py-2 rounded-xl text-xs text-cosmic-text font-mono focus:outline-none focus:border-indigo-500/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-cosmic-text">Monthly (MTD) Target ($)</label>
                  <input
                    type="number"
                    value={targets.mtdRevenueTarget}
                    onChange={(e) => handleTargetChange('mtdRevenueTarget', e.target.value)}
                    className="w-full bg-cosmic-bg border border-cosmic-border px-3 py-2 rounded-xl text-xs text-cosmic-text font-mono focus:outline-none focus:border-indigo-500/50"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-cosmic-text">Yearly (YTD) Target ($)</label>
                  <input
                    type="number"
                    value={targets.ytdRevenueTarget}
                    onChange={(e) => handleTargetChange('ytdRevenueTarget', e.target.value)}
                    className="w-full bg-cosmic-bg border border-cosmic-border px-3 py-2 rounded-xl text-xs text-cosmic-text font-mono focus:outline-none focus:border-indigo-500/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-cosmic-text">Checkout Conversion Rate Milestone (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={targets.checkoutConversionTarget}
                    onChange={(e) => handleTargetChange('checkoutConversionTarget', e.target.value)}
                    className="w-full bg-cosmic-bg border border-cosmic-border px-3 py-2 rounded-xl text-xs text-cosmic-text font-mono focus:outline-none focus:border-indigo-500/50"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-cosmic-border">
              <button className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/10 transition-all">
                <Save size={14} />
                <span>Save New Goals</span>
              </button>
            </div>
          </div>
        )}

        {/* AI PANEL */}
        {activeTab === 'ai' && (
          <div className="bg-cosmic-card border border-cosmic-border p-6 rounded-2xl space-y-6">
            <div>
              <h4 className="text-cosmic-text font-semibold text-sm flex items-center">
                <Sparkles size={16} className="text-indigo-400 mr-1.5" />
                AI Cognitive & Settings Panel
              </h4>
              <p className="text-xs text-cosmic-muted mt-0.5">Control the integrated LLM configuration powering anomaly root cause analysis and proactive recommendations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {/* Model Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-cosmic-text">LLM Engine Version</label>
                  <select
                    value={aiSettings.model}
                    onChange={(e) => handleAiChange('model', e.target.value)}
                    className="w-full bg-cosmic-bg border border-cosmic-border px-3 py-2 rounded-xl text-xs text-cosmic-text focus:outline-none focus:border-indigo-500/50"
                  >
                    <option value="gpt-4o">gpt-4o-latest (Primary)</option>
                    <option value="gpt-4-turbo">gpt-4-turbo</option>
                    <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                    <option value="claude-3-5">Claude 3.5 Sonnet</option>
                  </select>
                </div>

                {/* Scan frequency */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-cosmic-text">Anomaly Scanning Frequency</label>
                  <select
                    value={aiSettings.anomaliesScanFreq}
                    onChange={(e) => handleAiChange('anomaliesScanFreq', e.target.value)}
                    className="w-full bg-cosmic-bg border border-cosmic-border px-3 py-2 rounded-xl text-xs text-cosmic-text focus:outline-none focus:border-indigo-500/50"
                  >
                    <option value="realtime">Real-time alerts (Webhook)</option>
                    <option value="hourly">Every Hour</option>
                    <option value="daily">Daily Cron Audit</option>
                  </select>
                </div>
              </div>

              <div className="space-y-5">
                {/* confidence thresholds */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-cosmic-text">AI Confidence Trigger Threshold</span>
                    <span className="text-indigo-400 font-mono">{aiSettings.confidenceThreshold}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="99"
                    value={aiSettings.confidenceThreshold}
                    onChange={(e) => handleAiChange('confidenceThreshold', Number(e.target.value))}
                    className="w-full accent-indigo-500 h-1.5 bg-cosmic-bg rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] text-cosmic-muted block">Suppress recommendations scoring lower than the threshold.</span>
                </div>

                {/* Auto triggers switch */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-cosmic-bg border border-cosmic-border">
                  <div>
                    <span className="text-xs font-semibold text-cosmic-text block">Auto-Execute Recommended Actions</span>
                    <span className="text-[10px] text-cosmic-muted">If safe, run recommended optimizations instantly.</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aiSettings.autoTaskTrigger}
                      onChange={(e) => handleAiChange('autoTaskTrigger', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-cosmic-bg border border-cosmic-border rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-cosmic-muted after:border-slate-350 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500 peer-checked:after:bg-white" />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-cosmic-border">
              <button className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/10 transition-all">
                <Save size={14} />
                <span>Save AI Engine Configurations</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminControl;
