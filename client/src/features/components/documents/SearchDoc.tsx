/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState, useEffect} from 'react';
import axios from 'axios';
import Table, { type columnConfig } from '../../../shared/components/ui/Table';
import "../../../assets/styles/Table.css";
import EditDocumentModal from './EditDocumentModal';
import "../../../assets/styles/SearchDoc.css";
import ShareDocumentModal from './ShareDocumentModal';

// Static list of document types used for filtering/search dropdown
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

const SearchDoc = () => {

    // Holds all documents returned from the backend and displayed in the table
    const [dataTable, setDataTable] = useState([]);

    // Stores the document currently selected for editing
    const [selectedDoc, setSelectedDoc] = useState<any>(null);

    // Controls visibility of the edit document modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // Search filter states
    const [issuanceType, setIssuanceType] = useState("");
    const [documentNo, setDocumentNo] = useState("");
    const [series, setSeries] = useState("");
    const [date, setDate] = useState("");
    const [subject, setSubject] = useState("");
    const [keyword, setKeyword] = useState("");

    // Handles opening and closing of the edit modal
    const toggleModal = (item: any = null) => {
      setSelectedDoc(item);
      setIsModalOpen(!isModalOpen);

    // When the modal closes, refresh the document list
    // to reflect any edits made to the document
      if(isModalOpen){ // modal is being closed
        fetchDocuments(); // refresh table
      }
    }

    // Structure used by the table component to represent a document
    interface documentData{
      selectedData: any;
      documentNo: string;
      issuanceType: string;
      file: string;
      series: string;
      date: string;
      subject: string;
      keyword: string;
}

    // Controls visibility of the share modal
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const toggleShareModal = () => setIsShareModalOpen(!isShareModalOpen);

    // Table column configuration used by the reusable Table component
    const columns: columnConfig<documentData>[] = [
        {header: "No.", key: "documentNo"},
        {header: "Type", key: "issuanceType"},
        {header: "Series", key: "series"},
        {header: "Date", key: "date",

        // Converts stored date to Philippine locale display format
         render: (item) => new Date(item.date).toLocaleDateString('en-PH')
        },
        {header: "Subject", key: "subject"},
        {header: "Keyword", key: "keyword"},
        {header: "Action", key: "actions",

        // Action icons allow users to share, edit, delete, or download documents
         render: (item) => (
        <>
            <img src="../public/forward.png" className='tbl-Icon' onClick={toggleShareModal}  />
            <img src="../public/pen.png" className='tbl-Icon' onClick={() => toggleModal(item)} />
            <img src="../public/delete.png" className='tbl-Icon' onClick={() => handleDelete(item.documentNo, item.file)}/>
            <img src="../public/download.png" className='tbl-Icon' onClick={() => handleViewFile(item.file)}/>
        </>
      )
    }
    ];

    // To delete specific document
    const handleDelete = async (documentNo: string, file: string) => {
        const response = await axios.delete(`http://localhost:8080/aims/documents/deleteDocument/${documentNo}`, {
          data: {file}
        });

        // Display backend confirmation message
        alert(response.data.message);

        // Refresh table after deletion
        fetchDocuments();
    }

    // Opens the stored document file in a new browser tab
    const handleViewFile = async (file: string) => {
        window.open(file, "_blank");
    }

    // Retrieves all documents from the backend API
    const fetchDocuments = async () => {
      const response = await axios.get("http://localhost:8080/aims/documents/allDocuments");
      
      // Handles different response structures safely
      setDataTable(response.data.documents ?? response.data ?? []);
    }

    // Sends search filters to backend and retrieves filtered results
    const searchDocuments = async () =>{
      const items: Record<string, any> = {};

      // Only include filters that have values to avoid sending empty parameters
      if (issuanceType && issuanceType !== '--SELECT--') items.issuanceType = issuanceType;
      if (documentNo)items.documentNo = documentNo;
      if (series) items.series = series;
      if (date)items.date = date;
      if (subject)items.subject = subject;
      if (keyword)items.keyword = keyword;
      const response = await axios.get("http://localhost:8080/aims/documents/searchDocuments", {
          params: items
      });

      // Update table with search results
      setDataTable(response.data.documents ?? response.data ?? []);
      // const response = await axios.get("http://localhost:8080/aims/documents/allDocuments");
      // setDataTable(response.data.documents ?? response.data ?? []);
    }
    
  // Load all documents when the component first renders  
  useEffect (() =>{
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDocuments();
  }, []);

return (
  <div className="searchdoc-layout">
    <div className="searchdoc-filters">
      <div className="searchdoc-card">
        <h4 className="text-center mb-3">Search Documents</h4>
        <form className="d-flex flex-column">
          <div className="mb-3">
            <label className="form-label">Issuance Type</label>
            <select 
              id="inputState" 
              className="form-select text-center"
              autoComplete='off'
              value={issuanceType}
              onChange={(e) => setIssuanceType(e.target.value)}>
              {items.map((item, index) => (
              <option key={index} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Issuance No.</label>
              <input 
                  type="text" 
                  className="form-control" 
                  id="inssuaceNo"
                  value={documentNo} 
                  onChange={(e) => setDocumentNo(e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Series</label>
              <input 
                type="number" 
                className="form-control" 
                id="series" 
                autoComplete='off'
                value={series}
                onChange={(e) => setSeries(e.target.value)}/>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Date</label>
            <input 
              type="date" 
              className="form-control" 
              id="date" 
              autoComplete='off'
              value={date}
              onChange={(e) => setDate(e.target.value)}/>
          </div>

          <div className="mb-3">
            <label className="form-label">Subject</label>
            <input 
              type="text" 
              className="form-control" 
              id="inputSubject"
              autoComplete='off'
              value={subject}
              onChange={(e) => setSubject(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label">Key Words</label>
            <input 
              type="text" 
              className="form-control" 
              id="inputKeyword"
              autoComplete='off'
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)} />
          </div>

          <button type="button" className="btn btn-primary searchdoc-btn" onClick={searchDocuments}>
            Search
          </button>

        </form>
      </div>
    </div>

    
    <div className="searchdoc-table">
      <Table data={dataTable} columns={columns}/>
    </div>

    <EditDocumentModal
      isOpen={isModalOpen}
      onClose={() => toggleModal (null)}
      selectedData={selectedDoc}
    />

    <ShareDocumentModal
      isOpen={isShareModalOpen}
      onClose={toggleShareModal}
    />
  </div>
);
}

export default SearchDoc;   