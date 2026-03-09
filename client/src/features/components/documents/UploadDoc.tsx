import {useState} from 'react'
import axios from 'axios';

// List of document issuance types used to populate the dropdown menu
const items = [
    '--SELECT--',
    'Administrative Order',
    'Memorandum Circular',
    'Office Circular',
    'Office Memorandum',
    'Office Order',
    'Resolution',
    'CSC Issuance',
    'OLA Opinion',
    'MOA / MOU',
    'Project Contract',
    'Memorandum Order'
];

const UploadDoc = () => {
   
    // React state hooks to store form input values
    const [documentNo, setDocumentNo] = useState("");
    const [issuanceType, setIssuanceType] = useState("");
    const [series, setSeries] = useState("");
    const [date, setDate] = useState("");
    const [subject, setSubject] = useState("");
    const [keyword, setKeyword] = useState("");
    const [file, setFile] = useState<File | null>(null);

    // Handles the upload button click and sends the form data to the backend  
    const handlebtnUpload= async (e: { preventDefault: () => void; }) => {
        
        // Prevents the page from refreshing when submitting the form  
        e.preventDefault();
        try{
            
            // Ensure that a file is selected before attempting to upload
            if (!file) {
                alert("Please select a file.");
                return;
            }

            // FormData is required for sending files via HTTP request 
            const fileData = new FormData();

            // Append the uploaded file and metadata fields to the request body   
            fileData.append('myFile', file);
            fileData.append('documentNo', documentNo);
            fileData.append('issuanceType', issuanceType);
            fileData.append('series', series);
            fileData.append('date', date);
            fileData.append('subject', subject);
            fileData.append('keyword', keyword);

        // Send POST request to backend API endpoint for document upload
        const response = await axios.post("http://localhost:8080/aims/documents/uploadDocument", fileData,{
            // Required header for file uploads
            headers: {'Content-Type': 'multipart/form-data'}
        });

        // Display success message if backend confirms upload
        if(response.data.success){
            alert(response.data.message);
        }
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }catch(error: any){
            alert(error.response?.data?.message || "Failed to Add New Document!");
        }
  }


  return (
    <div>
      <h2 className="text-center">Upload Document Component</h2>

      <form className="d-flex flex-column align-items-center g-3">
        <div className="row justify-content-center w-100">
        <div className="mb-3 col-md-6">
          <label htmlFor="formFile" className="form-label">Upload Document</label>
          <input 
            className="form-control" 
            type="file" 
            id="formFile"
            autoComplete='off'
            onChange={(e) => {

                // Capture the selected file from the file input 
                if (e.target.files && e.target.files[0]) {
                    setFile(e.target.files[0]);
                }
        }}/>
        </div>
        </div>

            <div className="row w-100 justify-content-center">
                <div className="col-md-6 mb-3">
                <label htmlFor="inputState" className="form-label">Issuance Type</label>
                <select 
                    id="inputState" 
                    className="form-select text-center"
                    autoComplete='off'
                    value={issuanceType}

                    // Update issuance type state when user selects a value  
                    onChange={(e) => setIssuanceType(e.target.value)}>
                    {items.map((item, index) => (

                    // Dynamically generate dropdown options from items array    
                    <option key={index} value={item}>{item}</option>
                    ))}
                </select>
                </div>
            </div>

            <div className="row w-100 justify-content-center">
                <div className="col-md-3 mb-3">
                <label htmlFor="inssuaceNo" className="form-label">Issuance No.</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="inssuaceNo" 
                    autoComplete='off'
                    value={documentNo}
                    
                    // Store the issuance number entered by the user  
                    onChange={(e) => setDocumentNo(e.target.value)}/>
                </div>

                <div className="col-md-3 mb-3">
                <label htmlFor="series" className="form-label">Series</label>
                <input 
                    type="number" 
                    className="form-control" 
                    id="series" 
                    autoComplete='off'
                    value={series}
                    
                    // Update the series value in state
                    onChange={(e) => setSeries(e.target.value)}/>
                </div>
            </div>

            <div className="row justify-content-center w-100">
                <div className="col-md-6 mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        id="date" 
                        autoComplete='off'
                        value={date}

                        // Save the selected date to component state
                        onChange={(e) => setDate(e.target.value)}/>
                </div>
            </div>


            <div className="row w-100 justify-content-center">
                <div className="col-md-6 mb-3">
                    <label htmlFor="inputSubject" className="form-label">Subject</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="inputSubject"
                        autoComplete='off'
                        value={subject}

                        // Update subject field in state
                        onChange={(e) => setSubject(e.target.value)} />
                </div>
            </div>

            <div className="row w-100 justify-content-center">
                <div className="col-md-6 mb-3 ">
                    <label htmlFor="inputKeyWords" className="form-label">Key Words</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="inputKeyWords"
                        autoComplete='off'
                        value={keyword}

                        // Update keyword field in state
                        onChange={(e) => setKeyword(e.target.value)}/>
                </div>
            </div>
            <div className="row w-100 justify-content-center align-items-center">
              <div className="col-md-2 mb-3">
              <button type="submit" className="btn btn-primary" onClick={handlebtnUpload}>Upload</button>
              </div>
              <div className="col-md-2 mb-3">
              <button type="submit" className="btn btn-primary color-red">Cancel</button>
              </div>   
            </div>

        </form>
    </div>
  )
}

export default UploadDoc