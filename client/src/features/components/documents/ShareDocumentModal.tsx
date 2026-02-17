import { useState } from "react";
import "../../../assets/styles/ShareDocumentModal.css";

interface ShareDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface User {
  name: string;
  email: string;
}

const dummyUsers: User[] = [
  { name: "John Doe", email: "john@gmail.com" },
  { name: "Jane Smith", email: "jane@gmail.com" },
  { name: "Alice Cooper", email: "alice@gmail.com" },
  { name: "Bob Marley", email: "bob@gmail.com" },
  { name: "Alice Williams", email: "alice.williams@gmail.com" },
  { name: "Charlie Brown", email: "charlie.brown@gmail.com" },
  { name: "Emily Davis", email: "emily.davis@gmail.com" },
  { name: "Michael Scott", email: "michael.scott@gmail.com" },
];

const ShareDocumentModal: React.FC<ShareDocumentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  if (!isOpen) return null;

  const filteredUsers = dummyUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="share-modal-overlay">
      <div className="share-modal-container">
        <h3 className="share-modal-title">Share Document</h3>
        <input
          type="text"
          placeholder="Search users..."
          className="form-control share-modal-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="share-modal-users">
          {filteredUsers.map((user, index) => (
            <div
              key={index}
              className={`share-modal-user ${
                selectedUser === index ? "selected" : ""
              }`}
              onClick={() => setSelectedUser(index)}
            >
              <div>
                <strong>{user.name}</strong>
                <div className="share-modal-email">{user.email}</div>
              </div>
            </div>
          ))}
          {filteredUsers.length === 0 && (
            <div className="text-center mt-2">No users found.</div>
          )}
        </div>

        <div className="share-modal-actions">
          <button
            className="btn btn-primary search-btn-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="btn btn-primary">Share</button>
        </div>
      </div>
    </div>
  );
};

export default ShareDocumentModal;
