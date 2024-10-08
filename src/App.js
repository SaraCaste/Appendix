import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [setSelectedFile] = useState(null);

  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-1"></div>
        <h1 class="col-11">Data Donation Platform</h1>
      </div>

      <div class="row mb-4">
        <div class="col"> </div>
      </div>

      <div class="row mb-3">
        {/* FileUploader handles file selection and upload */}
        <div class="col-1"></div>
        <div class="col-11">
          <FileUploader onFileSelect={setSelectedFile} />
        </div>
        <div class="col-11"></div>
        </div>
    </div>
  );
}

export default App;