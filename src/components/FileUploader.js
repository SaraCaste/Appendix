import React, { useState } from 'react'; // Library for the UI
import { supabase } from '../supabaseClient'; // Library for the database
import * as XLSX from 'xlsx'; // Library for xlsx operations

const FileUploader = () => {
  const [file, setFile] = useState(null); 
  const [fileName, setFileName] = useState(''); // State to hold the file name
  const [uploading, setUploading] = useState(false);
  const [sheetInfo, setSheetInfo] = useState([]); // To store sheet names, row and column counts
  const [selectedSheets, setSelectedSheets] = useState([]); // To track selected sheets
  const [page, setPage] = useState("1"); // To change sheet view
  const [selectAll, setSelectAll] = useState(true); // To track "Select All" state of the checkboxes
  const [uploadStatus, setUploadStatus] = useState(''); // State for showing upload status
  const [error, setError] = useState(''); // State for holding error message
  const [message, setMessage] = useState('');


  // Handle file change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile); // Save the selected file
    setFileName(selectedFile.name); // Update the file name state
    setError(''); // Clear any previous error when a file is selected

    // Read the Excel file
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // Extract sheet names, row and column counts
      const sheets = workbook.SheetNames.map((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        const jsonSheet = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Sheet in JSON format for easier handling

        const rowCount = jsonSheet.length; // Number of rows
        const columnCount = jsonSheet[0] ? jsonSheet[0].length : 0; // Number of columns 

        return { sheetName, rowCount, columnCount };
      });

      // Update sheet info state
      setSheetInfo(sheets);
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  // Sheet's descriptions
  const description = ["of the customer e.g. registration date, birth date, age, gender, city and postal code.",
    "of the purchased products in the supermarket, including name of the filial, city, postal code, name of the product and price. This is the most important information needed to get sustainability and health insights.",
    "of the number of points collected in each shopping trip.",
    "of the coupons that were available.*",
    "of the campaigns that were available.*",
    "about the number of times the coupons site was visited in the App/Web.*",
    "about the number of clicks on publicity.*",
    "about the number of times the App/Web was opened.*",
    "about the number of times the Newsletter was visited.*"]
  
  // Handle checkbox 
  const handleCheckboxChange = (sheetName) => {
    if (selectedSheets.includes(sheetName)) {
      setSelectedSheets(selectedSheets.filter((name) => name !== sheetName));
    } else {
      setSelectedSheets([...selectedSheets, sheetName]);
    }
  };

  // Handle "Select/Unselect All" 
  const handleSelectAllChange = () => {
    if (selectAll) {
      // If currently selecting all, deselect all
      setSelectedSheets([]);
    } else {
      // If currently deselecting all, select all
      setSelectedSheets(sheetInfo.map((sheet) => sheet.sheetName));
    }
    setSelectAll(!selectAll);
  };

  // Handle error message "Continue" button click
  const handleContinue = () => {
    if (!file) {
      setError('Please choose a file before continuing.');
      return;
    }
    setPage("2");
  };

   // Function to create a new workbook with only selected sheets
   const createFilteredWorkbook = (data) => {
    const workbook = XLSX.read(data, { type: 'array' });
    const newWorkbook = XLSX.utils.book_new();

    selectedSheets.forEach((sheetName) => {
      const originalSheet = workbook.Sheets[sheetName];
      XLSX.utils.book_append_sheet(newWorkbook, originalSheet, sheetName);
    });

    // Write the workbook to a binary format
    const wbout = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'array' });
    return new Blob([wbout], { type: 'application/octet-stream' });
  };

  // Upload the filtered file to Supabase
  const uploadFile = async () => {
    // Validate if any sheets have been selected
    if (selectedSheets.length === 0) {
      setError('Please select at least one sheet before uploading.');
      return;
    }

    if (!file) return;

    try {
      setUploading(true);
      setUploadStatus(''); // Reset upload status
      setError(''); // Clear any previous error

      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const filteredBlob = createFilteredWorkbook(data);

        const fileName = `filtered_${Date.now()}_${file.name}`;
        const { data: supabaseData, error } = await supabase.storage
          .from('uploads')
          .upload(fileName, filteredBlob, { cacheControl: '3600', upsert: false });

        if (error) {
          throw error;
        }
        setMessage(`File uploaded successfully: ${supabaseData.Key}`);
        setUploadStatus('success');
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      setMessage(`Error uploading file: ${error.message}`);
      setUploadStatus('error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {page === "1" ? (
        <div>
          {/* Page 1: File Upload */}
          <div className="card w-75 mb-3">
            <div className="card-header">
              <h2>File Upload</h2>
            </div>
            <div className="card-body">
              <p className="card-text">Please select the <strong>Excel</strong> file sent by Deutschland Card. In case this comes in a zip file, please extract it on your computer and make sure the uploaded file is not password protected.</p>
              <label htmlFor="choose_file_btn" className="btn btn-warning">Choose file</label>
              <input id="choose_file_btn" style={{display:"none"}} type="file" onChange={handleFileChange}  accept=".xlsx, .xls"/>
              {/* Display the name of the selected file */}
              {fileName && (
                <p className="mt-3"><strong>Selected file:</strong> {fileName}</p>
              )}
             {/* Display error message if there's one */}
             {error && (
                <p className="text-danger mt-2">{error}</p>
              )}
            </div>
          </div>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <button onClick={handleContinue} className="page-link bg-primary text-light">Continue</button>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}

      {page === "2" && (
        <div class="w-75">
          {/* Page 2: Checkbox logic for selecting sheets */}
          <h3>Select Sheets to Donate</h3>
          <p>Below you will find details about the contents of the file you submitted. Please review the information carefully and <strong>select</strong> the sheets you wish to <strong>share</strong>. After reviewing, click on the 'Yes, share for research' button at the bottom of this page. By sharing this data, you are helping us to understand health and sustainability behaviors in society.</p>
          <form>
            <div className="form-check mb-3">
              <input
                    className="form-check-input"
                    type="checkbox"
                    id="select_all"
                    checked={selectedSheets.length === sheetInfo.length}
                    onChange={handleSelectAllChange}
              />
              <label className="form-check-label" htmlFor="select_all" value="">
                     Select/Unselect All
              </label>
            </div>

            {sheetInfo.map((sheet, index) => (
              <div key={index} className="form-check">
                <input
                  className="form-check-input"
                  name="select-item"
                  type="checkbox"
                  value={sheet.sheetName}
                  id={`sheet_${index}`}
                  checked={selectedSheets.includes(sheet.sheetName)}
                  onChange={() => handleCheckboxChange(sheet.sheetName)}
                />
                <label className="form-check-label" htmlFor={`sheet_${index}`}>
                  <strong>Sheet:</strong>  {sheet.sheetName} <div></div> <strong># Rows: </strong>{sheet.rowCount}, <strong># Columns:</strong> {sheet.columnCount}
                  <div> </div><strong>Details:</strong> This sheet contains information {description[index]}
                
                  <div class="row mb-1"> </div>
                  </label>
              </div>
            ))}
          </form>

            {/* Upload button */}
          <div class="row">
            <div>
                {/* FilePreview processes and displays the file details */}                 
                      <button id="upload_btn" class="btn btn-primary"  onClick={uploadFile}> Yes, share for research </button>

                {/* Show upload status message */}
                  {uploadStatus === 'success' && (
                    <span className="text-success ms-3">Upload successful! Thank you.</span>
                  )}
                  {uploadStatus === 'error' && (
                    <span className="text-danger ms-3">Upload failed. Try again.</span>
                  )}
                  {/* Display the error message if no sheets are selected */}
                  {error && <p className="text-danger mt-2">{error}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
