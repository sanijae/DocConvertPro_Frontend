import React from 'react';
import styled from 'styled-components';
import { IoIosCloudUpload } from "react-icons/io";

const FileInputContainer = styled.label`
  display: inline-block;
  margin-top: 40px;
  position: relative;
  cursor: pointer;
  padding: 20px;
  border-radius: 10px;
  width: 50%;
  background-color: #fff;
  color: #007bff;

  &:hover{
    background-color: #007bff;
    color: #fff;
  }

  @media screen and (max-width:700px) {
    width: 80%;
  }
`;

const FileInput = styled.input.attrs({ type: 'file' })`
  display: none;
  width: 100%;
`;

const UploadIcon = styled(IoIosCloudUpload)`
  font-size: 24px;
`;

const UploadText = styled.span`
  font-size: 1.5rem;
  margin-left: 8px;
`;

const FileUploader = ({ onChange }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onChange(file);
  };

  return (
    <FileInputContainer>
      <FileInput onChange={handleFileChange} />
      <UploadIcon />
      <UploadText>Choose File</UploadText>
    </FileInputContainer>
  );
};

export default FileUploader;
