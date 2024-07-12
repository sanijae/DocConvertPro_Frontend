import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist';
import { FaDesktop, FaDropbox, FaGoogleDrive, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { ConversionForm, DownloadButton, DownloadWrapper, FileInput, FileInputContainer, FileTitle, FormTitle,
  PdfToWordPageContainer, SubmitButton, UploadIcon, UploadText, Error,RefreshButton,RefreshIcon,Container,Content,
  Form,Spacer,PreviewContainer, Dropzone,PreviewImage,Preview,AddContainer,AddButton,AddIcon,IconWrapper,FileInputLabel} from './Styles'
  import Loading from '../Loading/Loading';
import base_url from '../../Assets/API/Axios';


  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function ImageToPdf() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState('')
  const [images, setImages] = useState([]);
  const [convertedFile, setConvertedFile] = useState(null);


  const users = JSON.parse(localStorage.getItem('doc-user'))
  const [user, setUser] = useState(null)

  useEffect(() => {
    document.title = 'Image to PDF';
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
    const files = acceptedFiles;
    setData(files);
  
    for (const file of files) {
      const fileReader = new FileReader();
      await new Promise((resolve, reject) => {
        fileReader.onload = () => {
          const imageUrl = fileReader.result;
          setImages(imageUrl);
          resolve(); 
        };
        fileReader.onerror = reject;
        fileReader.readAsDataURL(file);
      });
    }
  };
  

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
    accept: {
      'image/*': ['.jpeg','.jpg','.bmp', '.png']
    },
    multiple: true,
   });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    data.map((img)=>    formData.append('file', img))
    
    try {
      setIsLoading(true)
      setIsError('')
      await base_url.post('image_to_pdf/'+user.id+'/', formData, {
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
      console.error('Error :', error);
      setIsError('Error :', error.message)
      setIsLoading(false)
    }
  }

 console.log(images);
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
      {isLoading ? <Loading/> : 
      <>
        <ConversionForm>
        {!convertedFile && <>
          {!data.file && <>
           <Dropzone {...getRootProps()} >
              <FormTitle>Drag 'n' drop a Image file here</FormTitle>
              <FileInputContainer>
                <FileInput {...getInputProps()} />
                <UploadIcon />
                <UploadText> Click to select one</UploadText>
              </FileInputContainer>
          </Dropzone>
          </>}
          {data.file && 
            <Container>
              <Content>
                  <AddContainer>
                    <AddButton {...getRootProps()}>
                      <AddIcon><FaPlus/></AddIcon>
                      <FileInput {...getInputProps()} />
                    </AddButton>
                    {/* <IconWrapper {...getRootProps()} >
                      <FileInputLabel>
                        <AddIcon><FaDesktop/></AddIcon>
                        <FileInput {...getInputProps()}  />
                      </FileInputLabel>
                    </IconWrapper>
                    <IconWrapper>
                      <AddIcon><FaGoogleDrive/></AddIcon>
                    </IconWrapper>
                    <IconWrapper>
                      <AddIcon><FaDropbox/></AddIcon>
                    </IconWrapper> */}
                  </AddContainer>
              {data.file.length < 1 ? <>
                (
                  <PreviewContainer>
                    <Loading/>
                  </PreviewContainer>
                )
                </> :
                (
                  <PreviewContainer>
                    <Preview>
                      <PreviewImage src={data.file[0]} alt={`Page`} />
                    </Preview>
                  </PreviewContainer>
                )}
              </Content>
              <Form onSubmit={handleSubmit}>
                <FileTitle>Images to PDF</FileTitle>
                <Spacer></Spacer>
                {/* <Group>
                  <Label>From page</Label>
                  <Input type='number' placeholder=' 1,2,4' onChange={(e)=>setData({...data, page:e.target.value})} value={data.page} />
                </Group> */}
                {isError && <Error>{isError}</Error>}
                <SubmitButton type="submit">Convert</SubmitButton>
              </Form>
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

export default ImageToPdf;