import React from 'react';
import { authService } from '../services/auth';

interface HeaderProps {
  deviceId: string;
  deviceName: string;
  onPasteNew: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  deviceId, 
  deviceName,
  onPasteNew, 
  searchTerm, 
  onSearchChange 
}) => {
  const handleLogout = () => {
    // Clear device information on logout
    localStorage.removeItem('deviceId');
    localStorage.removeItem('deviceName');
    authService.logout();
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold text-gray-900">SyncVault</h1>
          
          {deviceName && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Device:</span>
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                {deviceName}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search snippets..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={onPasteNew}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Paste New
          </button>
          
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 