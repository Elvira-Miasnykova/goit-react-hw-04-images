import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { BackDrop, ModalStyle } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({onCloseModal, children}) => {
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }); 

      
    const handleKeyDown = (e) => {
        if(e.code === 'Escape'){
            onCloseModal();
        }
    };

    const handleBackdropClick = (e) => {
        if(e.currentTarget === e.target) {
            onCloseModal();
        }
    };

    
        return createPortal(
            <BackDrop onClick={handleBackdropClick}>
                <ModalStyle>
                    {children}
                </ModalStyle>
            </BackDrop>,
            modalRoot,
        )
    
};

Modal.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
};