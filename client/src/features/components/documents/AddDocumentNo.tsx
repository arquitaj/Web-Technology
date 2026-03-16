import React, { useState } from 'react'

// Declaring array for Type of documents
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

const AddDocumentNo = () => {

  const [issuanceType, setIssuanceType] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!issuanceType || issuanceType === "--SELECT--") {
      setError("Please select an issuance type.");
      return;
    }

    const confirmGenerate = window.confirm(
      "Generate document number for this issuance type?"
    );

    if (!confirmGenerate) return;

    setError("");
    alert("Document number generated successfully!");
  };

  return (
    <div>
      <div>
        <h2 className='text-center'>Generate Document Number</h2>

        <form className="d-flex align-items-center g-3" onSubmit={handleGenerate}>

          <div className="row w-75 justify-content-center">
            <div className="col-md-6 mb-3">

              <label htmlFor="inputState" className="form-label">
                Issuance Type
              </label>

              <select
                id="inputState"
                className="form-select text-center"
                value={issuanceType}
                onChange={(e) => setIssuanceType(e.target.value)}
              >
                {items.map(item => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              {error && (
                <small className="text-danger">{error}</small>
              )}

            </div>
          </div>

          <div className="mb-3 justify-content-center">
            <button type="submit" className="btn btn-primary">
              Generate
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddDocumentNo