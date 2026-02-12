import {useState} from 'react'

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

interface EditDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentNo: string;
}

const EditDocumentModal: React.FC<EditDocumentModalProps> = ({isOpen, onClose, documentNo}) => {
  const [issuanceType, setIssuanceType] = useState("");
  const [series, setSeries] = useState("");
  const [date, setDate] = useState("");
  const [subject, setSubject] = useState("");
  const [keyword, setKeyword] = useState("");

  if(!isOpen) return null;
  // return (
  //   <>
  //     {/* <!-- Modal --> */}
  //     <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
  //       <div className="modal-dialog">
  //         <div className="modal-content">
  //           <div className="modal-header">
  //             <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title {documentNo}</h1>
  //             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  //           </div>
  //           <div className="modal-body">
  //             ...
  //           </div>
  //           <div className="modal-footer">
  //             <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Close</button>
  //             <button type="button" className="btn btn-primary">Understood</button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // )

  return (
    
    <>
      <div style={overlayStyle}>
        <div style={modalStyle}>
          <h2 className="text-center">Edit Document No. {documentNo}</h2>
          <form className="d-flex flex-column align-items-center g-3">
        <div className="row justify-content-center w-100">
        <div className="mb-3 col-md-6">
          <label htmlFor="formFile" className="form-label">Upload Document</label>
          <input 
            className="form-control" 
            type="file" 
            id="formFile"
            />
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
                    onChange={(e) => setIssuanceType(e.target.value)}>
                    {items.map((item, index) => (
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
                    />
                </div>

                <div className="col-md-3 mb-3">
                <label htmlFor="series" className="form-label">Series</label>
                <input 
                    type="number" 
                    className="form-control" 
                    id="series" 
                    autoComplete='off'
                    value={series}
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
                        onChange={(e) => setKeyword(e.target.value)}/>
                </div>
            </div>
            <div className="row w-100 justify-content-center align-items-center">
              <div className="col-md-2 mb-3">
              <button type="submit" className="btn btn-primary" >Upload</button>
              </div>
              <div className="col-md-2 mb-3">
              <button type="submit" className="btn btn-primary color-red">Cancel</button>
              </div>   
            </div>

        </form>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </> 
  );
}

// Quick styles for visualization
const overlayStyle: React.CSSProperties = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
};

const modalStyle: React.CSSProperties = {
  background: 'white', padding: '2rem', borderRadius: '8px', minWidth: '300px'
};
export default EditDocumentModal
