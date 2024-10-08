import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import * as XLSX from 'xlsx';  // Import xlsx to handle Excel file reading


const SheetContents = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [sheetInfo, setSheetInfo] = useState([]);  // To store sheet names and row counts

  // Handle file change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Read the Excel file
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // Extract sheet names and row counts
      const sheets = workbook.SheetNames.map((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        const jsonSheet = XLSX.utils.sheet_to_json(sheet, { header: 1 });  // Sheet in JSON format

        const rowCount = jsonSheet.length;  // Number of rows
        const columnCount = jsonSheet[0] ? jsonSheet[0].length : 0;  // Number of columns in the first row

        return { sheetName, rowCount, columnCount };
      });
      
      // Update sheet info state
      setSheetInfo(sheets);
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  // Upload the file to Supabase
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

  //----------------------------
  const [show, setShow] = useState(false);

  return (
    /* Second page: File Contents*/
    <div>
      <div class="card w-75 mb-3">
        <div class="card">
          <div class="card-header">
            <h2>File Contents</h2>
          </div>
          <div class="card-body">
            
          </div>
        </div>
      </div>

      <div class="mb-4"></div>

      {/* Pagination */}
      <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item"><a class="page-link bg-primary text-light" href="SheetContents.js">Continue</a></li>
        </ul>
      </nav>


        {/* Display sheet names and row counts */}
        {sheetInfo.length > 0 && (
          <div>
            <h3>Sheet Information:</h3>
            <ul>
              {sheetInfo.map((sheet, index) => (
                <li key={index}>
                  {sheet.sheetName}: {sheet.rowCount} rows, {sheet.columnCount} columns
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Upload button */}
        <div class="row">
          <div>
              {/* FilePreview processes and displays the file details */}
              {
                  !show ? null : (
                      <button id="upload_btn" class="btn btn-warning col-1"  onClick={uploadFile} disabled={uploading || !file}>
                      {uploading ? 'Uploading...' : 'Upload File'}
                      </button>
                  )
              }
          </div>
        </div>

        {/* Message display */}
        {message && <p>{message}</p>}
    </div>
  );
};

export default SheetContents;