import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist';
import { FaDesktop, FaDropbox, FaGoogleDrive, FaPlus } from 'react-icons/fa';
import axios from 'axios';
 import { ConversionForm, DownloadButton, DownloadWrapper, FileInput, FileInputContainer, FileTitle, FormTitle,
  PdfToWordPageContainer, SubmitButton, UploadIcon, UploadText, Error, RefreshButton,  RefreshIcon,Group,Container,
  Content,Form,Label,Input,Spacer,PreviewContainer, Dropzone,PreviewImage,Preview,AddContainer,AddButton,AddIcon,IconWrapper,
  FileInputLabel} from './Styles'
  import Loading from '../Loading/Loading';
import useMediaQuery from '../Media/MediaQuery';
import { UploadPdfModal } from './Modal';
import image from '../../Assets/Images/sec-pdf.png'
import base_url from '../../Assets/API/Axios';


  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function UnlockPdf() {
  const [data, setData] = useState({ file: null, user_password: '', owner_password: ''});
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState('')
  // const [images, setImages] = useState([]);
  const [convertedFile, setConvertedFile] = useState(null);
  const [addFile,setAddFile] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const isMobile = useMediaQuery('(max-width: 800px)');

  const users = JSON.parse(localStorage.getItem('doc-user'))
  const [user, setUser] = useState(null)

  useEffect(() => {
    document.title = 'Unlock pdf';
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
    const file = acceptedFiles[0];
    setData({...data,file:file});
    // const fileReader = new FileReader();
    // fileReader.onload = async () => {
    //   const typedArray = new Uint8Array(fileReader.result);
    //   const pdf = await pdfjsLib.getDocument(typedArray).promise;
    //   const pageImages = [];

    //   for (let i = 1; i <= pdf.numPages; i++) {
    //     const page = await pdf.getPage(i);
    //     const viewport = page.getViewport({ scale: 1.0 });
    //     const canvas = document.createElement('canvas');
    //     const context = canvas.getContext('2d');
    //     canvas.height = viewport.height;
    //     canvas.width = viewport.width;
    //     await page.render({ canvasContext: context, viewport }).promise;
    //     pageImages.push(canvas.toDataURL());
    //   }

    //   setImages(pageImages);
    // };
    // fileReader.readAsArrayBuffer(file);
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
    formData.append('password',data.owner_password)
    // formData.append('user_password',data.user_password)
    
    try {
      setIsLoading(true)
      setIsError('')
      await base_url.post('unlock_pdf/'+user.id+'/', formData, {
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
      console.error('Error:', error);
      setIsError('Error while processing PDF')
      setIsLoading(false)
    }
  }

//  console.log(data);
//  console.log(images)
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
  container:{
    display:"flex",
    flexDirection: isMobile ? 'column': 'row'
  },
  content:{
    width: isMobile ? '100%' : '70%',
  },
  form:{
    width: isMobile ? '100%': '30%',
  }
}
  return (
    <PdfToWordPageContainer>
      {isLoading ? <Loading/> : 
      <>
        <ConversionForm onSubmit={handleSubmit}>
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
                  <PreviewContainer>
                    <Preview>
                      <PreviewImage src={image} alt={`Page`} />
                    </Preview>
                  </PreviewContainer>
              </Content>
              <Form style={styles.form}>
                <FileTitle>Unlock PDF</FileTitle>
                <Spacer></Spacer>
                <Group>
                  <Label>Password</Label>
                  <Input type={ showPass ? 'text' : 'password'} placeholder='password' onChange={(e)=>setData({...data, user_password:e.target.value})} value={data.user_password} />
                </Group>
                <Group>
                  <Label>Confirm Password</Label>
                  <Input type={ showPass ? 'text' : 'password'} placeholder='repeat password' onChange={(e)=>setData({...data, owner_password:e.target.value})} value={data.owner_password} />
                  <div style={{color:'#007bff',width:'100%',textAlign:'left',marginTop:'10px',display:'flex',alignItems:'center'}}>
                    <input type='checkbox' value={showPass} onClick={()=>setShowPass(!showPass)} />
                    <div>show password</div>
                  </div>
                </Group>
                {isError && <Error>{isError}</Error>}
                <SubmitButton type="submit">Unlock</SubmitButton>
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
      {addFile && <UploadPdfModal data={data} setData={setData} setShowAdd={setAddFile} />}
    </PdfToWordPageContainer>
  );
}

export default UnlockPdf;