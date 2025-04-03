import React, { useState } from "react"; // React framework
import Enricher from './Enricher'; // Main code
import 'bootstrap/dist/css/bootstrap.css'; // CSS Framework for design 

function App() {
  const [setSelectedFile] = useState(null);

  return (
    <div className="container-fluid">
      <div className="col-12">
        <Enricher onFileSelect={setSelectedFile} />
      </div>
    </div>
  );
}

export default App;
