import {useState, useEffect} from 'react';
import axios from 'axios';
import Table, { type columnConfig } from './Table';
import "../assets/Table.css";
import EditDocumentModal from './EditDocumentModal';


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
            <img src="../public/forward.png" className='tbl-Icon' onClick={() => handleView(item)} />
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
    <div>
        <div className="container">
        <h2 className="text-center">Search Documents</h2>
        

        <form className="d-flex flex-column align-items-center g-3">
            <div className="row w-100 justify-content-center">
                <div className="col-md-6 mb-3">
                <label htmlFor="inputState" className="form-label">Issuance Type</label>
                <select id="inputState" className="form-select text-center">
                    {items.map(item => (
                    <option key={item}>{item}</option>
                    ))}
                </select>
                </div>
            </div>

            <div className="row w-100 justify-content-center">
                <div className="col-md-3 mb-3">
                <label htmlFor="inssuaceNo" className="form-label">Issuance No.</label>
                <input type="text" className="form-control" id="inssuaceNo" />
                </div>

                <div className="col-md-3 mb-3">
                <label htmlFor="series" className="form-label">Series</label>
                <input type="text" className="form-control" id="series" />
                </div>
            </div>

            <div className="row justify-content-center w-100">
                <div className="col-md-6 mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input type="date" className="form-control" id="date" />
                </div>
            </div>


            <div className="row w-100 justify-content-center">
                <div className="col-md-6 mb-3">
                    <label htmlFor="inputSubject" className="form-label">Subject</label>
                    <input type="text" className="form-control" id="inputSubject" />
                </div>
            </div>

            <div className="row w-100 justify-content-center">
                <div className="col-md-6 mb-3 ">
                    <label htmlFor="inputKeyWords" className="form-label">Key Words</label>
                    <input type="text" className="form-control" id="inputKeyWords"/>
                </div>
            </div>
            <div className="mb-3">
            <button type="submit" className="btn btn-primary">Search</button>
            </div>
        </form>

        </div>
        <div className="table-wrapper">
            <Table data={dataTable} columns={columns}/>
        </div>
          <EditDocumentModal isOpen={isModalOpen} onClose={toggleModal} documentNo="0001" />
    </div>
  );
}

export default SearchDoc;   