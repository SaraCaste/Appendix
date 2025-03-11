import React, { useState } from 'react'; // Library for the UI
import { supabase } from '../supabaseClient'; // Library for the database
import * as XLSX from 'xlsx'; // Library for xlsx operations

const FileUploader = () => {
  // State constants for managing UI and file data 
  const [file, setFile] = useState(null); // Stores selected file
  const [fileName, setFileName] = useState(''); // Stores the file name
  const [upload, setUploading] = useState(false); // Upload process status
  const [sheetInfo, setSheetInfo] = useState([]); // Stores sheet names, row and column counts
  const [selectedSheets, setSelectedSheets] = useState([]); // Stores selected sheets
  const [page, setPage] = useState("1"); // Tracks sheet view for navigation
  const [selectAll, setSelectAll] = useState(true); // Tracks "Select All" state of the checkboxes
  const [uploadStatus, setUploadStatus] = useState(''); // Tracks upload success/error status
  const [error, setError] = useState(''); // Holds error message
  const [message, setMessage] = useState(''); // Stores user messages

  /**
   * Handles file selection and validation.
   * Reads the file and extracts sheet details.
   * @param {Event} event - The file input change event
   */
  const uploadFile = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    // Allowed file extensions
    const extensions = [".xlsx", ".xls"];
    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

    // Validate file format
    if (!extensions.includes(`.${fileExtension}`)) {
      setError("Invalid file format. Please select an Excel file (.xlsx, .xls).");
      setFile(null);
      setFileName("");
      setSheetInfo([]);
      return;
    }
  
      setFile(selectedFile); 
      setFileName(selectedFile.name); 
      setError(""); 

      // Read the Excel file
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });

          // Extract sheet names, row and column counts
          const sheets = workbook.SheetNames.map((sheetName) => {
            const sheet = workbook.Sheets[sheetName];
            const jsonSheet = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Sheet in JSON format for easier handling

            return {
              sheetName,
              rowCount: jsonSheet.length,
              columnCount: jsonSheet[0] ? jsonSheet[0].length : 0
            };
        });

        // Update sheet info state
        setSheetInfo(sheets);
      } catch (err) {
        setError("Error processing file. Please try again.");
      }
  };
  reader.readAsArrayBuffer(selectedFile);
};

  // Description of the sheets
  const description = ["of the customer e.g. registration date, birth date, age, gender, city and postal code.",
    "of the purchased products in the supermarket, including name of the filial, city, postal code, name of the product and price. This is the most important information needed to get sustainability and health insights.",
    "of the number of points collected in each shopping trip.",
    "of the coupons that were available.*",
    "of the campaigns that were available.*",
    "about the number of times the coupons site was visited in the App/Web.*",
    "about the number of clicks on publicity.*",
    "about the number of times the App/Web was opened.*",
    "about the number of times the Newsletter was visited.*"]
  
    /**
   * Handles selection of sheets.
   * @param {string} sheetName - The name of the sheet to toggle selection
   */ 
    // Handle checkbox 
    const selectOneCheckbox = (sheetName) => {
      if (selectedSheets.includes(sheetName)) {
        setSelectedSheets(selectedSheets.filter((name) => name !== sheetName));
      } else {
        setSelectedSheets([...selectedSheets, sheetName]);
      }
    };

  const selectAllCheckbox  = () => {
    setSelectedSheets(selectAll ? [] : sheetInfo.map((sheet) => sheet.sheetName));
    setSelectAll(!selectAll);
  }; 

  // Handle error message "Continue" button click
  const continueButton = () => {
    if (!file) {
      setError('Please choose a file before continuing.');
      return;
    }
    setPage("2");
  };

  /**
   * Creates a new Excel workbook containing only selected sheets.
   * @param {Uint8Array} data - Original Excel file data
   * @returns {Blob} - New Excel file with selected sheets
   */
   const newWorkbook = (data) => {
    const workbook = XLSX.read(data, { type: 'array' });
    const newWorkbook = XLSX.utils.book_new();

    selectedSheets.forEach((sheetName) => {
      const originalSheets = workbook.Sheets[sheetName];
      XLSX.utils.book_append_sheet(newWorkbook, originalSheets, sheetName);
    });

    // Write the workbook to a binary format
    const binWorkbook = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'array' });
    return new Blob([binWorkbook], { type: 'application/octet-stream' });
  };

  /**
   * Uploads selected sheets to Supabase storage.
   */
  const uploadFileSupabase = async () => {
    if (selectedSheets.length === 0) {
      setError('Please select at least one sheet before uploading.');
      return;
    }
    if (!file) return;
    setUploading(true);
    setUploadStatus("");
    setError(''); 

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const filteredWorkbook = newWorkbook(data);
 
        const { data: supabaseData, error } = await supabase.storage
          .from("Data Donation Platform")
          .upload(`filtered_${Date.now()}_${file.name}`, filteredWorkbook, { cacheControl: "3600", upsert: false });

        if (error) throw error;

        setMessage(`File uploaded successfully: ${supabaseData.Key}`);
        setUploadStatus("success");
        setPage("3");
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
              <p className="card-text">Please select the <strong>Excel </strong> 
              file sent by Deutschland Card. In case this comes in a zip file, 
              please extract it on your computer and upload one file. Make sure the uploaded file is not password protected.</p>
              <label htmlFor="choose_file_btn" className="btn btn-success text-light">Select file</label>
              <input id="choose_file_btn" style={{display:"none"}} type="file" onChange={uploadFile}  accept=".xlsx, .xls"/>
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
                <button onClick={continueButton} className="page-link bg-warning text-dark">Next</button>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}

      {page === "2" && (
        <div className="w-75">
          {/* Page 2: Checkbox logic for selecting sheets */}
          <h3>Select Sheets to Donate</h3>
          <p>Below you will find details about the contents of the file you submitted. The <strong>Transaktionen</strong> sheet contains the most important information for research.
             Please review the information carefully and <strong>select </strong> 
             the sheets you wish to <strong>share</strong>. 
             After reviewing, click on the <strong>'Yes, share for research'</strong> button at the bottom of this page. 
             By sharing this data, you are helping us to understand health and sustainability behaviors in society.</p>
          <form>
            <div className="form-check mb-3">
              <input
                    className="form-check-input"
                    type="checkbox"
                    id="select_all"
                    checked={selectedSheets.length === sheetInfo.length}
                    onChange={selectAllCheckbox}
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
                  onChange={() => selectOneCheckbox(sheet.sheetName)}
                />
                <label className="form-check-label" htmlFor={`sheet_${index}`}>
                  <strong>Sheet:</strong>  {sheet.sheetName} <div></div> <strong># Rows: </strong>{sheet.rowCount}, <strong># Columns:</strong> {sheet.columnCount}
                  <div> </div><strong>Details:</strong> This sheet contains information {description[index]}
                
                  <div className="row mb-1"> </div>
                  </label>
              </div>
            ))}
          </form>

            {/* Upload button */}
          <div className="row">
            <div>
                {/* FilePreview processes and displays the file details */}                 
                      <button id="upload_btn" class="btn btn-warning"  onClick={uploadFileSupabase}> Yes, share for research </button>

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

      {page === "3" && (
        <div className="text-left mt-5">
          <h2>Thank you for your contribution!</h2>
          <p>Your data has been successfully shared for research purposes. You can close this page now</p>
        </div>
      )}

    </div>
  );
};

export default FileUploader;
