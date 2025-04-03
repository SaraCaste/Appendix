import React, { useState } from 'react'; // Library for the UI
import './App.css'; // CSS file design
import FileUploader from './components/FileUploader'; // Main Data Donation Platform code
import 'bootstrap/dist/css/bootstrap.css'; // CSS Framework for design 

function App() {
  const [setSelectedFile] = useState(null);

  return (
    <div className="container-fluid">
      
      <div className="row">
        <div className="col-1"></div>
        <h1 className="col-11">Data Donation Platform</h1>
      </div>

      <div className="row mb-4">
        <div className="col"> </div>
      </div>

      <div className="row mb-3">
        {/* FileUploader logic with file selection and upload */}
        <div className="col-1"></div>
        <div className="col-11">
          <FileUploader onFileSelect={setSelectedFile} />
        </div>
        <div className="col-11"></div>
        </div>
    </div>
  );
}

export default App;