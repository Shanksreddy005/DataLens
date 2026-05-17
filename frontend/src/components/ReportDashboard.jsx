import React from 'react';
import { Database, LayoutGrid, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const ReportDashboard = ({ report }) => {
  const { summary, columns } = report;

  const getHealthBadge = (missingPercentage) => {
    if (missingPercentage === 0) return <span className="badge badge-green">Excellent</span>;
    if (missingPercentage < 5) return <span className="badge badge-blue">Good</span>;
    if (missingPercentage < 20) return <span className="badge badge-orange">Fair</span>;
    return <span className="badge badge-red">Poor</span>;
  };

  // Prepare data for the Missing Values Chart
  const missingData = columns.map(col => ({
    name: col.name,
    missing: col.missing_percentage
  })).filter(col => col.missing > 0);

  return (
    <div>
      {/* Top Stats */}
      <div className="dashboard-grid">
        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ color: '#3b82f6' }}>
            <LayoutGrid size={32} />
          </div>
          <div>
            <div className="stat-value">{summary.columns}</div>
            <div className="stat-label">Total Columns</div>
          </div>
        </div>
        
        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ color: '#10b981' }}>
            <Database size={32} />
          </div>
          <div>
            <div className="stat-value">{summary.rows.toLocaleString()}</div>
            <div className="stat-label">Total Rows</div>
          </div>
        </div>
        
        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ color: '#f59e0b' }}>
            <AlertCircle size={32} />
          </div>
          <div>
            <div className="stat-value">
              {columns.reduce((acc, col) => acc + (col.missing > 0 ? 1 : 0), 0)}
            </div>
            <div className="stat-label">Columns with Missing Data</div>
          </div>
        </div>
      </div>

      <div className="charts-grid mb-8">
        {missingData.length > 0 && (
          <div className="glass-card chart-card">
            <h3>Missing Data Percentage</h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={missingData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Bar dataKey="missing" fill="#f59e0b" radius={[4, 4, 0, 0]} name="% Missing" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Columns Detail Table */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h3 className="section-title">Column Analysis</h3>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Column Name</th>
                <th>Data Type</th>
                <th>Unique Values</th>
                <th>Missing Values</th>
                <th>Health</th>
              </tr>
            </thead>
            <tbody>
              {columns.map((col, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: 500 }}>{col.name}</td>
                  <td><span className="badge badge-blue" style={{ fontFamily: 'monospace' }}>{col.type}</span></td>
                  <td>{col.unique.toLocaleString()}</td>
                  <td>
                    {col.missing > 0 
                      ? `${col.missing.toLocaleString()} (${col.missing_percentage}%)` 
                      : 'None'}
                  </td>
                  <td>{getHealthBadge(col.missing_percentage)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportDashboard;
