import React, { useEffect, useState } from 'react';
import axios from 'axios';
 import { ConversionForm, DownloadButton, DownloadWrapper, FileInput, FileInputContainer, FileTitle, FormTitle,
  PdfToWordPageContainer, SubmitButton, UploadIcon, UploadText, Error } from './Styles'
  import Loading from '../Loading/Loading';
import base_url from '../../Assets/API/Axios';

function OrganizePdf() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState('')
  const [convertedFile, setConvertedFile] = useState(null);

  const users = JSON.parse(localStorage.getItem('doc-user'))
  const [user, setUser] = useState(null)

  useEffect(() => {
    document.title = 'Organized PDF';
  }, []);

  useEffect(()=>{
    return(async()=>{
      try {
         await base_url.get(`/user/${users?.user?.id}`)
         .then((res)=>{
          setUser(res.data)
         }).catch((err)=>{
          console.log(err);
          setIsError(err.response.data.error)
         })
        
      } catch (error) {
        console.log(error);
        setIsError(error.message)
      }
    })
  },[users?.user?.id])
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    
    try {
      setIsLoading(true)
      setIsError('')
      await base_url.post('excel_to_pdf/'+user.id+'/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res)=>{
        console.log(res);
       setConvertedFile(res.data);
       setIsLoading(false)
       setIsError('')
      }).catch((err)=>{
        setIsError(err.response.data.error)
        console.log(err)
        setIsLoading(false)
      })
    } catch (error) {
      console.error('Error: ', error);
      setIsError('Error: ', error.message)
      setIsLoading(false)
    }
  }


 console.log(file);
 
const handleDownload = async (id) => {
    try {
      await base_url.get( `file_download/${id}/`,{
        method: 'GET',
        responseType: 'blob', // Important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', convertedFile.file_name); // Name of the downloaded file
        document.body.appendChild(link);
        link.click();
      });
    } catch (error) {
        console.error('Error downloading document: ', error);
        setIsError('Error downloading document');
    }
};

  return (
    <PdfToWordPageContainer>
       {isLoading ? <Loading/> : <ConversionForm onSubmit={handleSubmit}>
        <FormTitle>Organize your PDF Pages</FormTitle>
        <FileInputContainer>
          <FileInput onChange={handleFileChange} />
          <UploadIcon />
          <UploadText>Select .pdf file</UploadText>
        </FileInputContainer>
        {isError && <Error>{isError}</Error>}
        {file &&  <FileTitle>{file.name}</FileTitle>}
        {file && <SubmitButton type="submit">Organize This PDF</SubmitButton>}
        {convertedFile && (
        <DownloadWrapper>
          <h2>Organized Document</h2>
          <p>{convertedFile.file_name}</p>
          <DownloadButton type='button' onClick={() => handleDownload(convertedFile.result.id)}>Download</DownloadButton>
        </DownloadWrapper>
      )}
      </ConversionForm>}
    </PdfToWordPageContainer>
  );
}

export default OrganizePdf;
