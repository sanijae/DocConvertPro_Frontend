import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist';
import { FaDesktop, FaDropbox, FaGoogleDrive, FaPlus } from 'react-icons/fa';
import axios from 'axios';
 import { ConversionForm, DownloadButton, DownloadWrapper, FileInput, FileInputContainer, FileTitle, FormTitle,
  PdfToWordPageContainer, SubmitButton, UploadIcon, UploadText, Error,RefreshButton,RefreshIcon,Container,Content,Form,
 Spacer,PreviewContainer, Dropzone,Drop,PreviewImage,Preview,AddContainer,AddButton,AddIcon,IconWrapper,FileInputLabel,
 Icons,
 RowIcon} from './Styles'
  import Loading from '../Loading/Loading';
import base_url from '../../Assets/API/Axios';
  // import useDrivePicker from 'react-google-drive-picker'
  // import DropboxChooser from 'react-dropbox-chooser';


  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function PdfToWord() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState('')
  const [images, setImages] = useState([]);
  const [convertedFile, setConvertedFile] = useState(null);
  // const [openPicker] = useDrivePicker(); 
  const users = JSON.parse(localStorage.getItem('doc-user'))
  const [user, setUser] = useState(null)

  useEffect(() => {
    document.title = 'PDF to Word';
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

  // const handleOpenPicker = () => {
  //   openPicker({
  //     clientId: process.env.Google_client_id,
  //     developerKey: process.env.Google_App_Key,
  //     viewId: "DOCS",
  //     showUploadView: true,
  //     showUploadFolders: true,
  //     supportDrives: true,
  //     multiselect: false,
  //     viewMimeTypes: '.pdf',//'image/jpeg,image/png,image/gif',
  //     callbackFunction: (data) => {
  //       if (data.action === 'cancel') {
  //         console.log('User clicked cancel/close button')
  //       }
  //       console.log(data)
  //       setData(data)
  //     },
  //   })
  // }

  // const handleDropboxSelect = (files) => {
  //   const file = files[0];
  //   setData(file)
  //   const blob = new Blob([file], { type: file.type });
  //   const fileReader = new FileReader();
  //   fileReader.onload = async () => {
  //     const typedArray = new Uint8Array(fileReader.result);
  //     const pdf = await pdfjsLib.getDocument(typedArray).promise;
  //     const pageImages = [];

  //     for (let i = 1; i <= pdf.numPages; i++) {
  //       const page = await pdf.getPage(i);
  //       const viewport = page.getViewport({ scale: 1.0 });
  //       const canvas = document.createElement('canvas');
  //       const context = canvas.getContext('2d');
  //       canvas.height = viewport.height;
  //       canvas.width = viewport.width;
  //       await page.render({ canvasContext: context, viewport }).promise;
  //       pageImages.push(canvas.toDataURL());
  //     }

  //     setImages(pageImages);
  //   };
    
  //   // Read the Blob as array buffer
  //   fileReader.readAsArrayBuffer(blob);
  // };

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setData(acceptedFiles[0]);
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

      setImages(pageImages);
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
    formData.append('file', data);
    
    try {
      setIsLoading(true)
      setIsError('')
      await base_url.post('pdf_to_word/'+user.id+'/', formData, {
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

  return (
    <PdfToWordPageContainer>
      {isLoading ? <Loading/> : 
      <>
        <ConversionForm>
        {!convertedFile && <>
          {!data && <>
           <Dropzone {...getRootProps()}>
              {/* <Drop {...getRootProps()}> */}
                  <FormTitle>Drag 'n' drop a PDF file here</FormTitle>
                  <FileInputContainer>
                    <FileInput {...getInputProps()} />
                    <UploadIcon />
                    <UploadText> Click to select one</UploadText>
                  </FileInputContainer>
              {/* </Drop> */}
              {/* <RowIcon>
                <Icons {...getRootProps()}>
                  <FaDesktop/>
                  <FileInput {...getInputProps()} />
                </Icons>
                <Icons onClick={() => handleOpenPicker()}><FaGoogleDrive/></Icons>
                <Icons>
                    <DropboxChooser
                      appKey={process.env.DROPBOX_APP_KEY}
                      multiselect={false}
                      extensions={['.pdf']} 
                      success={handleDropboxSelect}>
                        <AddIcon><FaDropbox/></AddIcon>
                    </DropboxChooser>
                </Icons>
              </RowIcon> */}
          </Dropzone>
          </>}
          {data && 
            <Container>
              <Content>
                  <AddContainer>
                    <AddButton {...getRootProps()}>
                      <AddIcon><FaPlus/></AddIcon>
                      <FileInput{...getInputProps()} />
                    </AddButton>
                    {/* <IconWrapper {...getRootProps()}>
                      <FileInputLabel>
                        <AddIcon><FaDesktop/></AddIcon>
                        <FileInput{...getInputProps()} />
                      </FileInputLabel>
                    </IconWrapper>
                    <IconWrapper>
                      <AddIcon><FaGoogleDrive/></AddIcon>
                    </IconWrapper>
                    <IconWrapper>
                      <DropboxChooser
                        appKey={'h0c1w2f6shnkq3q'}
                        multiselect={false}
                        extensions={['.pdf']} 
                        success={handleDropboxSelect}>
                          <AddIcon><FaDropbox/></AddIcon>
                      </DropboxChooser>
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
                    <Preview>
                      <PreviewImage src={images[0]} alt={`Page`} />
                    </Preview>
                  </PreviewContainer>
                )}
              </Content>
              <Form onSubmit={handleSubmit}>
                <FileTitle>PDF to Word</FileTitle>
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

export default PdfToWord;