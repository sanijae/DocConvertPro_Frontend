import React from 'react';
import styled from 'styled-components';

const AlertContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border: 2px solid #333333;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const AlertTitle = styled.h2`
  color: #333333;
`;

const AlertMessage = styled.p`
  color: #555555;
`;

const CloseButton = styled.button`
  background-color: #eeeeee;
  border: none;
  color: #333333;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #dddddd;
  }
`;

export const Alert = ({ title, message, onClose }) => {
  return (
    <AlertContainer>
      <AlertTitle>{title}</AlertTitle>
      <AlertMessage>{message}</AlertMessage>
      <CloseButton onClick={onClose}>Close</CloseButton>
    </AlertContainer>
  );
};
