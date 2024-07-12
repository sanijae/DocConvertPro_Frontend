import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist';
import { FaDesktop, FaDropbox, FaGoogleDrive, FaPlus } from 'react-icons/fa';
import axios from 'axios';
 import { ConversionForm, DownloadButton, DownloadWrapper, FileInput, FileInputContainer, FileTitle, FormTitle,
  PdfToWordPageContainer, SubmitButton, UploadIcon, UploadText, Error, RefreshButton,  RefreshIcon,Group,Container,
  Content,Form,Label,Input,Spacer,PreviewContainer, Dropzone,PreviewImage,Preview,AddContainer,AddButton,AddIcon,IconWrapper,
  DigitalWrapper,
  DigitalContainer,
  DigitalInput} from './Styles'
  import Loading from '../Loading/Loading';
import useMediaQuery from '../Media/MediaQuery';
import image from '../../Assets/Images/public_key.png'
import base_url from '../../Assets/API/Axios';


  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function DigitalSignature() {
  const [data, setData] = useState({ file: null, name: ''});
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState('')
  // const [images, setImages] = useState([]);
  const [convertedFile, setConvertedFile] = useState(null);
  const isMobile = useMediaQuery('(max-width: 800px)');

  const users = JSON.parse(localStorage.getItem('doc-user'))
  const [user, setUser] = useState(null)

  useEffect(() => {
    document.title = 'Digital signature';
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
  const onDrop = async (acceptedFiles) => {
    setData({...data,file:acceptedFiles[0]});
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "application/msword": [".doc"],
      "text/plain": [".txt"],
    },
    multiple: true,
   });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('name',data.name)
    
    try {
      setIsLoading(true)
      setIsError('')
      await base_url.post('digital_signature/'+user.id+'/', formData, {
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
      setIsError('Error while processing PDF')
      setIsLoading(false)
    }
  }

//  console.log(data);
//  console.log(images)
const handleDownload = async (id) => {
    try {
      await base_url.get( `signed_file_download/${id}/`,{
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
const styles = {
  container:{
    display:"flex",
    flexDirection: isMobile ? 'column': 'row'
  },
  content:{
    width: isMobile ? '100%' : '70%',
  },
  form:{
    width: isMobile ? '100%': '40%',
    minHeight: convertedFile ? '' :'80vh',
    paddingTop:"20px",
    padding:'0px',
    background:'#fff'
  },
  spacer:{
    display:isMobile ? 'none':'flex'
  }
}
  return (
    <PdfToWordPageContainer>
      {isLoading ? <Loading/> : 
      <>
        <ConversionForm>
        {!convertedFile && <>
          {!data.file && <>
           <Dropzone {...getRootProps()} >
              <FormTitle>Drag 'n' drop a PDF file here</FormTitle>
              <FileInputContainer>
                <FileInput {...getInputProps()} />
                <UploadIcon />
                <UploadText> Click to select one</UploadText>
              </FileInputContainer>
          </Dropzone>
          </>}
          {data.file && 
            <Container style={styles.container}>
              <Content style={styles.content}>
                  <AddContainer>
                    <AddButton {...getRootProps()}>
                      <AddIcon><FaPlus/></AddIcon>
                      <FileInput {...getInputProps()} />
                    </AddButton>
                    {/* <IconWrapper {...getRootProps()}>
                      <FileInputLabel>
                        <AddIcon><FaDesktop/></AddIcon>
                        <FileInput {...getInputProps()} />
                      </FileInputLabel>
                    </IconWrapper>
                    <IconWrapper>
                      <AddIcon><FaGoogleDrive/></AddIcon>
                    </IconWrapper>
                    <IconWrapper>
                      <AddIcon><FaDropbox/></AddIcon>
                    </IconWrapper> */}
                  </AddContainer>
              {/* {images.length < 1 ? <> */}
                {/* (
                  <PreviewContainer>
                    <Loading/>
                  </PreviewContainer>
                ) */}
                {/* </> : */}
                (
                  <PreviewContainer>
                    <Preview>
                      <PreviewImage src={image} alt={`Page`} />
                    </Preview>
                  </PreviewContainer>
                )
                 {/* } */}
              </Content>
              {/* {images.length && */}
              <Form style={styles.form} onSubmit={handleSubmit}>
                <FileTitle style={{padding:'10px',fontSize:"20px"}}>Digital signature</FileTitle>
                <Spacer style={styles.spacer}></Spacer>
                <DigitalContainer>
                  <DigitalWrapper>
                    <DigitalInput>
                      <Label>Give it a name</Label>
                      <Input required type={'text'} placeholder='unique name' onChange={(e)=>setData({...data, name:e.target.value})} value={data.name} />
                  </DigitalInput>
                  </DigitalWrapper>
                </DigitalContainer>
                {isError && <Error>{isError}</Error>}
                <SubmitButton type="submit" style={{width:"90%"}}>Sign now</SubmitButton>
              </Form>
              {/* } */}
            </Container>}
          </>}
          {convertedFile && (
          <DownloadWrapper>
            <RefreshButton onClick={()=>window.location.reload()}><RefreshIcon/> upload another file</RefreshButton>
            <FileTitle> Processed pdf: &nbsp;{convertedFile.file_name}</FileTitle>
            {isError && <Error>{isError}</Error>}
            <DownloadButton type='button' onClick={() => handleDownload(convertedFile.result.id)}>Download</DownloadButton>
          </DownloadWrapper>
        )}
        </ConversionForm>
        </>
      } 
    </PdfToWordPageContainer>
  );
}

export default DigitalSignature;