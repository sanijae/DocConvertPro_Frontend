import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist';
import { FaDesktop, FaDropbox, FaGoogleDrive, FaPlus } from 'react-icons/fa';
import axios from 'axios';
 import { ConversionForm, DownloadButton, DownloadWrapper, FileInput, FileInputContainer, FileTitle, FormTitle,
  PdfToWordPageContainer, SubmitButton, UploadIcon, UploadText, Error,RefreshButton,RefreshIcon,Group, Container,Content,
  Form,Spacer,PreviewContainer, Dropzone,PreviewImage,Preview,AddContainer,AddButton,AddIcon,IconWrapper,FileInputLabel,
  DisableButton} from './Styles'
  import useMediaQuery from '../Media/MediaQuery';
  import Loading from '../Loading/Loading';
import base_url from '../../Assets/API/Axios';


  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function MergePdf() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState('')
  const [images, setImages] = useState([]);
  const [convertedFile, setConvertedFile] = useState(null);
  const isMobile = useMediaQuery('(max-width: 800px)');

  const users = JSON.parse(localStorage.getItem('doc-user'))
  const [user, setUser] = useState(null)

  useEffect(() => {
    document.title = 'Merge PDF';
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
    // Iterate over each file in acceptedFiles
    for (const file of acceptedFiles) {
      setData((current) => [...current, file]);
  
      const fileReader = new FileReader();
  
      fileReader.onload = async () => {
        const typedArray = new Uint8Array(fileReader.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        const pageImages = [];
  
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.0 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          await page.render({ canvasContext: context, viewport }).promise;
          pageImages.push(canvas.toDataURL());
        }
  
        setImages((current) => [...current, pageImages[0]]);
      };
  
      fileReader.readAsArrayBuffer(file);
    }
  };
  

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
    accept: {"application/pdf": [".pdf"]},
    multiple: true,
   });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    data.map((pdf)=>formData.append('file',pdf))
    
    try {
      setIsLoading(true)
      setIsError('')
      await base_url.post('merge_pdf/'+user.id+'/', formData, {
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

 console.log(data);
 console.log(images)
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
const styles = {
  grid:{
    display:'grid',
    background:'transparent',
    gridTemplateColumns: isMobile ? "repeat(2,auto)" : "repeat(3,auto)",
    maxHeight:'80vh',
    height:'fit-content',
    overflow:'auto',
  },
  form:{
    maxHeight:'70vh',
  }
}

  return (
    <PdfToWordPageContainer>
      {isLoading ? <Loading/> : 
      <>
        <ConversionForm>
        {!convertedFile && <>
          {!data.length   && <>
           <Dropzone {...getRootProps()} >
              <FormTitle>Drag 'n' drop base PDF here</FormTitle>
              <FileInputContainer>
                <FileInput {...getInputProps()} />
                <UploadIcon />
                <UploadText> Click to base pdf</UploadText>
              </FileInputContainer>
          </Dropzone>
          </>}
          {data.length && 
            <Container>
              <Content>
                  <AddContainer>
                    <AddButton {...getRootProps()}>
                      <AddIcon><FaPlus/></AddIcon>
                      <FileInput {...getInputProps()} />
                    </AddButton>
                    {/* <IconWrapper {...getRootProps()}>
                      <FileInputLabel>
                        <AddIcon><FaDesktop/></AddIcon>
                        <FileInput  {...getInputProps()} />
                      </FileInputLabel>
                    </IconWrapper>
                    <IconWrapper>
                      <AddIcon><FaGoogleDrive/></AddIcon>
                    </IconWrapper>
                    <IconWrapper>
                      <AddIcon><FaDropbox/></AddIcon>
                    </IconWrapper> */}
                  </AddContainer>
              {!images.length ? <>
                (
                  <PreviewContainer>
                    <Loading/>
                  </PreviewContainer>
                )
                </> : 
                (
                  <PreviewContainer>
                   {images.length <=1 ?
                   <>
                      {images.map((img,i)=>(
                        <Preview key={i}>
                          <PreviewImage src={img} alt='Pages' />
                        </Preview>
                      ))}
                    </>
                    :
                    <div style={styles.grid}>
                      {images.map((img,i)=>(
                        <Preview key={i}>
                          <PreviewImage src={img} alt='Pages' />
                        </Preview>
                      ))}
                    </div>}
                  </PreviewContainer>
                )}
              </Content>
              <Form onSubmit={handleSubmit} style={styles.form}>
                <FileTitle> Merge pdf</FileTitle>
                <Spacer></Spacer>
                {/* <Group>
                  <UploadText style={{background:"#007bff",padding:'10px', margin:'10px auto',borderRadius:'5px'}}>select two pdf file</UploadText>
                </Group> */}
                {isError && <Error>{isError}</Error>}
                {data.length > 1 ? (
                  <SubmitButton type="submit" >Merge</SubmitButton>
                 ) : (
                  <DisableButton type="submit" disabled>Add PDF</DisableButton>
                )}
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

export default MergePdf;