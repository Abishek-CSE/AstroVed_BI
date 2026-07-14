import React from 'react';
import { Search, Bell, Moon, Sun, Calendar, Menu } from 'lucide-react';
import { useDateFilter } from '../contexts/DateFilterContext';
import { useTheme } from '../contexts/ThemeContext';

const Header = ({ title, onToggleMobileMenu }) => {
  const { startDate, endDate } = useDateFilter();
  const { theme, toggleTheme } = useTheme();

  const formatDateString = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <header className="sticky top-0 z-30 bg-cosmic-bg border-b border-cosmic-border px-4 py-3 lg:px-6 lg:py-4 flex flex-col space-y-2.5 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between shrink-0">

      {/* ---------------- MOBILE ROW 1 / DESKTOP LEFT SIDE ---------------- */}
      <div className="flex items-center justify-between w-full lg:w-auto min-w-0">
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
          <button onClick={onToggleMobileMenu} className="text-cosmic-muted hover:text-cosmic-text transition-colors lg:hidden">
            <Menu size={20} />
          </button>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm sm:text-base lg:text-lg font-bold text-cosmic-text tracking-tight flex items-center gap-2 select-none cursor-default truncate">
              <Menu size={18} className="hidden lg:block text-cosmic-muted cursor-pointer hover:text-white transition-colors" />
              {title}
            </h2>
            <p className="text-[10px] lg:text-[11px] text-cosmic-muted hidden sm:block">
              Welcome back, Admin! Here's what's happening with your business today.
            </p>
          </div>
        </div>

        {/* Profile Avatar on mobile far right of row 1 */}
        <div className="lg:hidden shrink-0 ml-2">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&auto=format&q=80"
            alt="Profile"
            className="w-7 h-7 rounded-full object-cover border border-cosmic-border"
          />
        </div>
      </div>

      {/* ---------------- MOBILE ROW 2 & 3 / DESKTOP RIGHT SIDE ---------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center lg:flex-row lg:items-center justify-between lg:justify-end gap-2.5 w-full lg:w-auto">

        {/* Search bar - full width on mobile, inline on desktop */}
        <div className="relative w-full sm:w-52 lg:w-52">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-cosmic-muted">
            <Search size={14} />
          </span>
          <input
            type="text"
            placeholder="Global Search..."
            className="bg-cosmic-card border border-cosmic-border pl-9 pr-4 py-1.5 rounded-lg text-xs text-cosmic-text placeholder-cosmic-muted focus:outline-none focus:border-indigo-500/50 w-full transition-colors"
          />
        </div>

        {/* Bottom controls row (mobile) / right tools row (desktop) */}
        <div className="flex items-center justify-between sm:justify-end gap-2.5 w-full sm:w-auto">
          {/* Calendar Selector Pill */}
          <button className="flex items-center justify-center space-x-2 bg-cosmic-card hover:bg-cosmic-card-hover border border-cosmic-border px-3 py-1.5 rounded-lg text-xs font-semibold text-cosmic-text transition-colors flex-1 sm:flex-none">
            <Calendar size={13} className="text-cosmic-muted" />
            <span>{formatDateString(startDate)} - {formatDateString(endDate)}</span>
          </button>

          {/* Action buttons (Bell, Theme) - aligned next to calendar */}
          <div className="flex items-center space-x-2.5">
            {/* Notifications */}
            <button className="relative p-1.5 rounded-lg text-cosmic-muted hover:text-cosmic-text bg-cosmic-card border border-cosmic-border">
              <Bell size={14} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
            </button>

            {/* Theme mode */}
            <button onClick={toggleTheme} className="p-1.5 rounded-lg text-cosmic-muted hover:text-cosmic-text bg-cosmic-card border border-cosmic-border">
              {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
            </button>
          </div>

          {/* Desktop Profile Info Card (hidden on mobile) */}
          <div className="hidden lg:flex items-center space-x-2.5 border-l border-cosmic-border pl-3">
            <div className="flex items-center space-x-2.5">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&auto=format&q=80"
                alt="Profile"
                className="w-7 h-7 rounded-full object-cover border border-cosmic-border shrink-0"
              />
              <div className="leading-tight hidden xl:block text-left">
                <span className="text-xs font-bold text-cosmic-text block">Admin</span>
                <span className="text-[9px] text-cosmic-muted block">Super Admin</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </header>
  );
};

export default Header;
