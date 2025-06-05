"use client"
import "./Modal.css"

function CreateNewModal({ onClose, onStartDesign }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Create New Design</h2>
          <button className="modal-close" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <p className="modal-description">Choose how you want to start your business card design</p>

          <div className="modal-options">
            <button className="modal-option" onClick={() => onStartDesign(true)}>
              <div className="option-icon template-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
              </div>
              <h3>Use a Template</h3>
              <p>Start with a pre-designed template</p>
            </button>

            <button className="modal-option" onClick={() => onStartDesign(false)}>
              <div className="option-icon blank-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
              <h3>Blank Canvas</h3>
              <p>Start from scratch with a blank design</p>
            </button>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateNewModal
