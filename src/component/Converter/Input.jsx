import React from 'react';
import styled from 'styled-components';
import { IoIosCloudUpload } from "react-icons/io";

const FileInputContainer = styled.label`
  display: inline-block;
  margin: 40px auto;
  position: relative;
  cursor: pointer;
  padding: 30px 10px;
  border-radius: 10px;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #007bff;
  color: #fff;

  &:hover{
    background-color: #fff;
    color: #007bff;
    border: 1px solid #007bff;
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

const FileUploader = ({ setFile,title }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <FileInputContainer>
      <FileInput onChange={handleFileChange} />
      <UploadIcon />
      <UploadText>{title}</UploadText>
    </FileInputContainer>
  );
};

export default FileUploader;
