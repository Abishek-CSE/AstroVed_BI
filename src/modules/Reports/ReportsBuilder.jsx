import React, { useState } from 'react';
import { Download, Calendar, Mail, CheckCircle2, Loader2, File } from 'lucide-react';

const ReportsBuilder = () => {
  const [reportType, setReportType] = useState('daily');
  const [exportFormat, setExportFormat] = useState('csv');
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState('');
  
  // Scheduler state
  const [scheduleName, setScheduleName] = useState('');
  const [scheduleType, setScheduleType] = useState('weekly');
  const [recipients, setRecipients] = useState('');
  const [scheduleTime, setScheduleTime] = useState('09:00');
  const [schedules, setSchedules] = useState([
    { name: 'Monday Sales Report', type: 'weekly', time: '09:00', format: 'pdf', recipients: 'executives@astroved.com', status: 'Active' },
    { name: 'Monthly Financial Audit', type: 'monthly', time: '00:00', format: 'excel', recipients: 'billing@astroved.com', status: 'Active' }
  ]);

  const handleExport = () => {
    setIsExporting(true);
    setExportStatus('Compiling dataset metrics...');
    
    setTimeout(() => {
      setExportStatus('Formatting into final schemas...');
      setTimeout(() => {
        setIsExporting(false);
        setExportStatus('');
        
        // Mocking file download
        const fileContent = `Astroved BI Report\nGenerated At: ${new Date().toLocaleString()}\nReport Type: ${reportType}\n`;
        const blob = new Blob([fileContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `astroved_${reportType}_report_${new Date().toISOString().split('T')[0]}.${exportFormat}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 1000);
    }, 1200);
  };

  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (!scheduleName || !recipients) return;
    
    setSchedules([
      ...schedules,
      {
        name: scheduleName,
        type: scheduleType,
        time: scheduleTime,
        format: exportFormat,
        recipients,
        status: 'Active'
      }
    ]);
    setScheduleName('');
    setRecipients('');
  };

  return (
    <div className="space-y-6">
      {/* Upper Export & Scheduler Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Export Form */}
        <div className="bg-cosmic-card border border-cosmic-border p-6 rounded-2xl space-y-6">
          <div>
            <h4 className="text-cosmic-text font-bold text-base flex items-center">
              <Download size={18} className="text-indigo-400 mr-2" />
              On-Demand Report Exporter
            </h4>
            <p className="text-xs text-cosmic-muted mt-1">
              Select variables below to assemble and download business intelligence records.
            </p>
          </div>

          <div className="space-y-4">
            {/* Report Type selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-cosmic-text">Report Type</label>
              <div className="grid grid-cols-5 gap-2">
                {['daily', 'weekly', 'monthly', 'quarterly', 'yearly'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setReportType(t)}
                    className={`py-2 px-1 rounded-xl text-[10px] font-semibold uppercase border transition-colors ${
                      reportType === t
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'bg-cosmic-bg border-cosmic-border text-cosmic-muted hover:text-cosmic-text'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Export Format Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-cosmic-text">Export Format</label>
              <div className="grid grid-cols-3 gap-2">
                {['excel', 'pdf', 'csv'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setExportFormat(f)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold uppercase border transition-colors ${
                      exportFormat === f
                        ? 'bg-cyan-600 border-cyan-500 text-white'
                        : 'bg-cosmic-bg border-cosmic-border text-cosmic-muted hover:text-cosmic-text'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Trigger */}
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-sm font-bold flex items-center justify-center space-x-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>{exportStatus}</span>
                </>
              ) : (
                <>
                  <Download size={16} />
                  <span>Generate & Export Report</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Schedule Creator */}
        <div className="bg-cosmic-card border border-cosmic-border p-6 rounded-2xl">
          <h4 className="text-cosmic-text font-bold text-base flex items-center mb-1">
            <Calendar size={18} className="text-cosmic-accent mr-2" />
            Automated Report Scheduler
          </h4>
          <p className="text-xs text-cosmic-muted mb-4">
            Schedule recurring exports directly to email addresses.
          </p>

          <form onSubmit={handleAddSchedule} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-cosmic-text">Schedule Name</label>
                <input
                  type="text"
                  placeholder="e.g. Weekly KPI PDF summary"
                  value={scheduleName}
                  onChange={(e) => setScheduleName(e.target.value)}
                  className="w-full bg-cosmic-bg border border-cosmic-border px-3 py-2 rounded-xl text-xs text-cosmic-text placeholder-cosmic-muted focus:outline-none focus:border-indigo-500/50"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-cosmic-text">Recurrence</label>
                <select
                  value={scheduleType}
                  onChange={(e) => setScheduleType(e.target.value)}
                  className="w-full bg-cosmic-bg border border-cosmic-border px-3 py-2 rounded-xl text-xs text-cosmic-text focus:outline-none focus:border-indigo-500/50"
                >
                  <option value="daily">Every Day</option>
                  <option value="weekly">Every Week</option>
                  <option value="monthly">Every Month</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-cosmic-text">Recipients Email</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={recipients}
                  onChange={(e) => setRecipients(e.target.value)}
                  className="w-full bg-cosmic-bg border border-cosmic-border px-3 py-2 rounded-xl text-xs text-cosmic-text placeholder-cosmic-muted focus:outline-none focus:border-indigo-500/50"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-cosmic-text">Send Hour (UTC)</label>
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full bg-cosmic-bg border border-cosmic-border px-3 py-2 rounded-xl text-xs text-cosmic-text focus:outline-none focus:border-indigo-500/50"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-cosmic-bg hover:bg-cosmic-card-hover border border-cosmic-border text-cosmic-text text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all"
            >
              <Calendar size={14} className="text-cosmic-accent" />
              <span>Register Schedule</span>
            </button>
          </form>
        </div>

      </div>

      {/* Schedules List */}
      <div className="bg-cosmic-card border border-cosmic-border p-6 rounded-2xl">
        <h4 className="text-cosmic-text font-semibold text-sm mb-4 flex items-center">
          <Mail size={16} className="text-indigo-400 mr-1.5" />
          Active Report Deliveries
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-cosmic-border text-cosmic-muted font-medium">
                <th className="py-2.5 pl-4">Schedule Description</th>
                <th className="py-2.5">Interval</th>
                <th className="py-2.5">Time</th>
                <th className="py-2.5 uppercase">Format</th>
                <th className="py-2.5">Recipients List</th>
                <th className="py-2.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cosmic-border/30 text-cosmic-text">
              {schedules.map((sch, idx) => (
                <tr key={idx} className="hover:bg-cosmic-card-hover transition-colors">
                  <td className="py-3 pl-4 font-medium">{sch.name}</td>
                  <td className="py-3 font-semibold text-indigo-400 capitalize">{sch.type}</td>
                  <td className="py-3 font-mono text-cosmic-muted">{sch.time}</td>
                  <td className="py-3 font-bold text-cyan-400 uppercase">{sch.format}</td>
                  <td className="py-3 font-mono text-cosmic-muted">{sch.recipients}</td>
                  <td className="py-3 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-500">
                      <CheckCircle2 size={10} className="mr-1" />
                      {sch.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsBuilder;
