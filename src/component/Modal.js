import { useState } from 'react';
import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: relative;
  height: 100%;
  overflow-y: hidden;
`;

export const ModalBackdrop = styled.div.attrs((props) => ({
  id: "background"
}))`
  width: 150%;
  height: 150%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -16.5%;
  left: -15%;
  background-color: rgba(0, 0, 0, 0.75);
`;

export const ModalBtn = styled.button`
  background-color: #4000c7;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
  position: absolute;
  left: 43.5%;
  top: 37.5%
`;

export const ModalView = styled.div.attrs(props => ({
  role: 'dialog'
}))`
  background: white;
  width: 15%;
  height: auto;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
  text-align: center;

  .modalText {
    color: #4000c7;
  }
`;

export const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const openModalHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const closeModalHandler = (event) => {
    if (event.target.id === "background" || event.target.className === "close-btn") {
      setIsOpen(false);
    }
  };

  return (
    <ModalContainer>
      <ModalBtn onClick={openModalHandler}>
        {isOpen ? "Opened!" : "Open Modal"}
      </ModalBtn>
      {isOpen && (
        <ModalBackdrop onClick={closeModalHandler}>
          <ModalView>
            <span className="close-btn" onClick={closeModalHandler}> &times; </span>
            <div className="modalText"> HELLO WORLD! </div>
          </ModalView>
        </ModalBackdrop>
      )}
    </ModalContainer>
  );
};