import {useState, useEffect} from 'react';
import axios from 'axios';
import Table, { type columnConfig } from '../../../shared/components/ui/Table';
import "../../../assets/styles/Table.css";
import EditDocumentModal from './EditDocumentModal';
import "../../../assets/styles/SearchDoc.css";
import ShareDocumentModal from './ShareDocumentModal';


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
    const [dataTable, setDataTable] = useState([]);
    // const [selectDoc, setSelectDoc] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        alert("I am clicked");
    }

    interface documentData{
    documentNo: string;
    issuanceType: string;
    series: string;
    date: string;
    subject: string;
    keyword: string;
}

    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const toggleShareModal = () => setIsShareModalOpen(!isShareModalOpen);

    const columns: columnConfig<documentData>[] = [
        {header: "No.", key: "documentNo"},
        {header: "Type", key: "issuanceType"},
        {header: "Series", key: "series"},
        {header: "Date", 
         key: "date",
         render: (item) => new Date(item.date).toLocaleDateString('en-PH')
        },
        {header: "Subject", key: "subject"},
        {header: "Keyword", key: "keyword"},
        {header: "Action",
         key: "actions",
         render: (item) => (
        <>
            <img src="../public/forward.png" className='tbl-Icon' onClick={toggleShareModal}  />
            <img src="../public/pen.png" 
                className='tbl-Icon'  
                onClick={toggleModal}
            />
            <img src="../public/delete.png" className='tbl-Icon' onClick={() => handleDelete(item.documentNo)}/>
            <img src="../public/download.png" className='tbl-Icon' onClick={() => handleViewFile(item.documentNo)}/>
            
          
        </>
      )
    }
    ];

    // For Edit Document and appear the modal EditDocumentModal.tsx
    // const handleEditDoc = (item: documentData) => {
    //     setSelectDoc(item.documentNo);
        
    // }
    // To view document
    const handleView = (doc: documentData) => {
        alert(`Opening Document: ${doc.documentNo}`);
    };

    // To delete specific document
    const handleDelete = async (documentNo: string) => {
        alert("I am clicked");
        const response = await axios.delete(`http://localhost:8080/aims/documents/deleteDocument/${documentNo}`);
        alert(response.data.message);
        fetchDocuments();
    }

    //To view the file
    const handleViewFile = async (documentNo: string) => {
        window.open(`http://localhost:8080/aims/documents/viewDocument/${documentNo}`);
    }

    // To display all documents
    const fetchDocuments = async () => {
    const response = await axios.get("http://localhost:8080/aims/documents/allDocuments");
    setDataTable(response.data.documents ?? response.data ?? []);
    
  }
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
            <select className="form-select">
              {items.map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Issuance No.</label>
              <input type="text" className="form-control" />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Series</label>
              <input type="text" className="form-control" />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Date</label>
            <input type="date" className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label">Subject</label>
            <input type="text" className="form-control" />
          </div>

          <div className="mb-3">
            <label className="form-label">Key Words</label>
            <input type="text" className="form-control" />
          </div>

          <button type="submit" className="btn btn-primary searchdoc-btn">
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
      onClose={toggleModal}
      documentNo="0001"
    />

    <ShareDocumentModal
      isOpen={isShareModalOpen}
      onClose={toggleShareModal}
    />
  </div>
);
}

export default SearchDoc;   