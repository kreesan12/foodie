import React from 'react';
import './ConfirmationModal.css';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, item }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Confirm Removal</h3>
                <p>Are you sure you want to remove {item.name} from the basket?</p>
                <div className="modal-buttons">
                    <button className="modal-button confirm" onClick={onConfirm}>Yes, Remove</button>
                    <button className="modal-button cancel" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
