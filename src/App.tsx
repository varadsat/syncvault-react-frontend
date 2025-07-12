import { useState, useEffect } from 'react';
import Header from './components/Header';
import SnippetList from './components/SnippetList';
import CreateSnippetForm from './components/CreateSnippetForm';
import Login from './components/Login';
import Signup from './components/Signup';
import DeviceSelector from './components/DeviceSelector';
import type { Snippet, CreateSnippetRequest, SnippetFilters } from './types/snippet';
import { snippetApi } from './services/api';
import { authService } from './services/auth';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [deviceId, setDeviceId] = useState<string>('');
  const [deviceName, setDeviceName] = useState<string>('');
  const [showDeviceSelector, setShowDeviceSelector] = useState(false);

  // Check authentication status on app load
  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Initialize device ID from localStorage
  useEffect(() => {
    if (isAuthenticated) {
      const storedDeviceId = localStorage.getItem('deviceId');
      const storedDeviceName = localStorage.getItem('deviceName');
      
      if (storedDeviceId && storedDeviceName) {
        setDeviceId(storedDeviceId);
        setDeviceName(storedDeviceName);
      } else {
        // No device selected, show device selector
        setShowDeviceSelector(true);
      }
    }
  }, [isAuthenticated]);

  const handleDeviceSelected = (deviceId: string, deviceName: string) => {
    localStorage.setItem('deviceId', deviceId);
    localStorage.setItem('deviceName', deviceName);
    setDeviceId(deviceId);
    setDeviceName(deviceName);
    setShowDeviceSelector(false);
  };

  const handleCreateSnippet = async (snippetData: CreateSnippetRequest) => {
    try {
      setIsSubmitting(true);
      
      // Always use the selected device ID
      const snippetToCreate = {
        ...snippetData,
        deviceId: deviceId
      };

      await snippetApi.createSnippet(snippetToCreate);
      setShowCreateForm(false);
      
      // The SnippetList will automatically refresh due to the filters dependency
    } catch (error) {
      console.error('Error creating snippet:', error);
      alert('Failed to create snippet. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSnippetCreated = (snippet: Snippet) => {
    // This will be called when a snippet is created via WebSocket
    console.log('New snippet created:', snippet);
  };

  const handleSnippetDeleted = (snippetId: string) => {
    // This will be called when a snippet is deleted via WebSocket
    console.log('Snippet deleted:', snippetId);
  };

  const handlePasteNew = () => {
    setShowCreateForm(true);
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLogin(true);
  };

  const handleSignupSuccess = () => {
    setIsAuthenticated(true);
    setShowLogin(true);
  };

  const handleSwitchToSignup = () => {
    setShowLogin(false);
  };

  const handleSwitchToLogin = () => {
    setShowLogin(true);
  };

  // Build filters for the snippet list
  const filters: SnippetFilters = {
    deviceId: searchTerm.includes('device:') ? searchTerm.split('device:')[1].trim() : undefined,
    tag: searchTerm.includes('tag:') ? searchTerm.split('tag:')[1].trim() : undefined,
    type: searchTerm.includes('type:') ? searchTerm.split('type:')[1].trim() as 'text' | 'code' | 'link' : undefined,
  };

  // Show authentication forms if not authenticated
  if (!isAuthenticated) {
    return showLogin ? (
      <Login 
        onLoginSuccess={handleLoginSuccess}
        onSwitchToSignup={handleSwitchToSignup}
      />
    ) : (
      <Signup 
        onSignupSuccess={handleSignupSuccess}
        onSwitchToLogin={handleSwitchToLogin}
      />
    );
  }

  // Show device selector if no device is selected
  if (showDeviceSelector) {
    return (
      <DeviceSelector 
        onDeviceSelected={(deviceId: string) => handleDeviceSelected(deviceId, '')}
      />
    );
  }

  // Show main app if authenticated and device is selected
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        deviceId={deviceId}
        deviceName={deviceName}
        onPasteNew={handlePasteNew}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <main className="container mx-auto px-6 py-8">
        {showCreateForm ? (
          <div className="max-w-2xl mx-auto">
            <CreateSnippetForm
              onSubmit={handleCreateSnippet}
              onCancel={handleCancelCreate}
              isSubmitting={isSubmitting}
            />
          </div>
        ) : (
          <SnippetList
            filters={filters}
            onSnippetCreated={handleSnippetCreated}
            onSnippetDeleted={handleSnippetDeleted}
          />
        )}
      </main>
    </div>
  );
}

export default App;
