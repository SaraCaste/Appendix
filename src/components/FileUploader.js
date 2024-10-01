import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    try {
      setUploading(true);
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage.from('uploads').upload(fileName, file);

      if (error) {
        throw error;
      }

      setMessage(`File uploaded successfully: ${data.Key}`);
    } catch (error) {
      setMessage(`Error uploading file: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1>File Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile} disabled={uploading || !file}>
        {uploading ? 'Uploading...' : 'Upload File'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUploader;
