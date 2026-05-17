import React, { useCallback, useState } from 'react';
import { UploadCloud } from 'lucide-react';

const UploadZone = ({ onUpload }) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.csv')) {
        onUpload(file);
      } else {
        alert("Please upload a CSV file.");
      }
    }
  }, [onUpload]);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div 
      className={`glass-card upload-zone ${isDragActive ? 'drag-active' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-upload').click()}
    >
      <input 
        type="file" 
        id="file-upload" 
        style={{ display: 'none' }} 
        accept=".csv"
        onChange={handleChange}
      />
      
      <div className="upload-icon">
        <UploadCloud size={48} />
      </div>
      <h3 className="upload-title">Upload your dataset</h3>
      <p className="upload-subtitle">Drag and drop your CSV file here, or click to browse</p>
      
      <button className="btn-primary" style={{ marginTop: '1rem' }}>
        Select File
      </button>
    </div>
  );
};

export default UploadZone;
