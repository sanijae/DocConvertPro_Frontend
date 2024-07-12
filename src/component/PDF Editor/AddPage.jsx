import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist';
import { FaDesktop, FaDropbox, FaGoogleDrive, FaPlus } from 'react-icons/fa';
import axios from 'axios';
 import { ConversionForm, DownloadButton, DownloadWrapper, FileInput, FileInputContainer, FileTitle, FormTitle,
  PdfToWordPageContainer, SubmitButton, UploadIcon, UploadText, Error,RefreshButton,RefreshIcon,Group, Container,Content,
  Form,Label,Input,Spacer,PreviewContainer, Dropzone,PreviewImage,Preview,AddContainer,AddButton,AddIcon,IconWrapper,
  FileInputLabel,
  DisableButton,} from './Styles'
  import Loading from '../Loading/Loading';
import base_url from '../../Assets/API/Axios';


  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function AddPage() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState('')
  const [images, setImages] = useState([]);
  const [convertedFile, setConvertedFile] = useState(null);

  const users = JSON.parse(localStorage.getItem('doc-user'))
  const [user, setUser] = useState(null)

  useEffect(() => {
    document.title = 'Add Page';
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
    const file = acceptedFiles[0]
    
    setData((current)=>([...current,file]))
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

        setImages((current)=>([...current,pageImages[0]]))
      };
      fileReader.readAsArrayBuffer(file);
   
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
    accept: {"application/pdf": [".pdf"]},
    multiple: true,
   });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', data[0]);
    formData.append('add_page',data[1])
    formData.append('after_page',page)
    
    try {
      setIsLoading(true)
      setIsError('')
      await base_url.post('add_page/'+user.id+'/', formData, {
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
      console.error('Error converting PDF', error);
      setIsError('Error while processing PDF')
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

  return (
    <PdfToWordPageContainer>
      {isLoading ? <Loading/> : 
      <>
        <ConversionForm>
        {!convertedFile && <>
          {!data.length && <>
           <Dropzone {...getRootProps()} >
              <FormTitle>Drag 'n' drop a PDF file here</FormTitle>
              <FileInputContainer>
                <FileInput {...getInputProps()} />
                <UploadIcon />
                <UploadText> Click to select one</UploadText>
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
              {images.length < 1 ? <>
                (
                  <PreviewContainer>
                    <Loading/>
                  </PreviewContainer>
                )
                </> :
                (
                  <PreviewContainer>
                    {images.map((img,i)=>{
                      return(
                        <Preview key={i}>
                          <PreviewImage src={img} alt={`Page`} />
                          {/* <FileName>{data.file.name}</FileName> */}
                        </Preview>
                      )
                    })}                    
                  </PreviewContainer>
                )}
              </Content>
             {images.length &&
              <Form onSubmit={handleSubmit}>
                <FileTitle> Add Page</FileTitle>
                <Spacer></Spacer>
                {data.length >2 && <Error>Only two document are allow at a</Error>}
                {isError && <Error>{isError}</Error>}
                {data.length >1 ? (
                  <>
                    <Group>
                      <Label>Add page after</Label>
                      <Input type='number' placeholder='where to add' onChange={(e)=>setPage(e.target.value)}  />
                    </Group>
                    <SubmitButton type="submit" >Add</SubmitButton>
                  </>
                 ) : (
                  <DisableButton type="submit" disabled>Add pdf page</DisableButton>
                )}
              </Form>}
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

export default AddPage;