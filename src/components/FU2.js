import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import * as XLSX from 'xlsx';  // Import xlsx to handle Excel file reading


const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [sheetInfo, setSheetInfo] = useState([]);  // To store sheet names and row counts
  const [selectedSheets, setSelectedSheets] = useState([]); // To track selected sheets
  const [page, setPage] = useState("1");

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
      // Initialize selected sheets to all sheets by default
      setSelectedSheets(sheets.map((sheet) => sheet.sheetName));
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  // Handle checkbox toggle
  const handleCheckboxChange = (sheetName) => {
    if (selectedSheets.includes(sheetName)) {
      setSelectedSheets(selectedSheets.filter((name) => name !== sheetName));
    } else {
      setSelectedSheets([...selectedSheets, sheetName]);
    }
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
  //var [page, setPage] = useState("1");

  return (
    /* First page: File Upload */
    <div>
      {page === "1" ? (<div>
        <div class="card w-75 mb-3">
          <div class="card">
            <div class="card-header">
              <h2>File Upload</h2>
            </div>
            <div class="card-body">
              <p class="card-text">Please select the Excel file sent by Edeka/Deutschland Card. Click “Skip” at the right bottom if you do not have a file.</p>
              <label for="choose_file_btn" class="btn btn-warning">Choose file</label>
              <input id="choose_file_btn" onClick={() => setShow(true)} style={{display:"none"}} type="file" onChange={handleFileChange} />
            </div>
          </div>
        </div>

        <div class="mb-4"></div>

        {/* Pagination */}
        <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item"><button onClick={() => setPage("2")} class="page-link bg-primary text-light">Continue</button></li>
          </ul>
        </nav>

          {/* Message display */}
          {message && <p>{message}</p>}
        </div>) : null}
        {page === "2" ? 
        <div>
          {/* Display sheet names, row and column counts. Also allows to select sheets to share */}
          {sheetInfo.length > 0 && (
            <div>
              <h3>Sheet Information:</h3>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Page</th>
                    <th scope="col">Sheet Name</th>
                    <th scope="col"># of Rows</th>
                    <th scope="col"># of Columns</th>
                  </tr>
                </thead>
                <tbody>
              {sheetInfo.map((sheet, index) => (
                  <tr>
                    <th scope="row">{index+1}</th>
                    <td>{sheet.sheetName}</td>
                    <td>{sheet.rowCount} rows</td>
                    <td>{sheet.columnCount} columns</td>
                  </tr>
              ))}
              </tbody>
              </table>
            </div>
          )}

          <button onClick={() => setPage("3")} className="btn btn-primary">Continue</button>
          
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

        </div>   
        : null}
        {page === "3" && (
        <div>
          {/* Page 3: Checkbox logic for selecting sheets */}
          <h3>Select Sheets to Donate</h3>
          <form>
            {sheetInfo.map((sheet, index) => (
              <div key={index} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={sheet.sheetName}
                  id={`sheet_${index}`}
                  checked={selectedSheets.includes(sheet.sheetName)}
                  onChange={() => handleCheckboxChange(sheet.sheetName)}
                />
                <label className="form-check-label" htmlFor={`sheet_${index}`}>
                  {sheet.sheetName}
                </label>
              </div>
            ))}
          </form>
          <button
            className="btn btn-success mt-3"
            onClick={() => console.log('Selected sheets:', selectedSheets)}
          >
            Confirm Selection
          </button>
        </div>
      )}
    
    
    </div>
  );
};

export default FileUploader;
