import React, { useState } from 'react';
import UploadZone from './components/UploadZone';
import ReportDashboard from './components/ReportDashboard';
import './index.css';
import { Activity } from 'lucide-react';

function App() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (file) => {
    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await response.json();
      if (data.status === 'error') {
        throw new Error(data.message);
      }
      
      setReport(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setReport(null);
    setError(null);
  };

  return (
    <div className="container">
      <header className="header">
        <div className="logo-container">
          <Activity size={32} color="var(--accent)" />
          <h1 className="logo-text">DataLens</h1>
        </div>
        <p className="subtitle">Automated Data Quality & Profiling Platform</p>
      </header>

      <main>
        {error && (
          <div className="glass-card error-card">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="btn-text">Dismiss</button>
          </div>
        )}

        {!report && !loading && (
          <UploadZone onUpload={handleFileUpload} />
        )}

        {loading && (
          <div className="glass-card loading-card">
            <div className="spinner"></div>
            <h3>Profiling Dataset...</h3>
            <p>Analyzing schema, calculating statistics, and checking data quality.</p>
          </div>
        )}

        {report && !loading && (
          <div className="fade-in">
            <div className="report-header">
              <h2>Report for {report.filename}</h2>
              <button onClick={handleReset} className="btn-secondary">
                Analyze Another File
              </button>
            </div>
            <ReportDashboard report={report} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
