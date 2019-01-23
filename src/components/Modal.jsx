import React from 'react';

const Modal = ({ children, title, onClose }) => {
    return (
        <div className="modal fade show" role="dialog" tabIndex="-1" aria-modal='true'
            style={{
                display: 'block',
                background: 'hsla(0, 0%,0%,0.33)'
            }}
            onClick={onClose}>
            <div className="modal-dialog modal-dialog-centered" role="document"
                onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                            onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body"
                        children={children}>
                    </div>
                    <div className="modal-footer">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;