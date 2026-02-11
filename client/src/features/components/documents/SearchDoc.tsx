import {useState, useEffect} from 'react';
import axios from 'axios';
import Table, { type columnConfig } from '../../../shared/components/ui/Table';
import "../../../assets/styles/Table.css";


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

interface documentData{
    documentNo: string;
    issuanceType: string;
    series: string;
    date: string;
    subject: string;
    keyword: string;
}
const SearchDoc = () => {
    const [dataTable, setDataTable] = useState([]);
    console.log(dataTable);

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
            <img src="../public/pen.png" className='tbl-Icon'/>
            <img src="../public/delete.png" className='tbl-Icon'/>
            <img src="../public/view.png" className='tbl-Icon'/>
            <img src="../public/download.png" className='tbl-Icon'/>
        </>
      )
    }
    ];
    const handleView = (doc: documentData) => {
        alert(`Opening Document: ${doc.documentNo}`);
    };

    const fetchDocuments = async () => {
    const response = await axios.get("http://localhost:8080/aims/document/allDocuments");
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
    </div>
  );
}

export default SearchDoc;   