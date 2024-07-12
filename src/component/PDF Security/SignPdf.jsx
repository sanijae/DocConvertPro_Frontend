import React, { useEffect, useRef,useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { pdfjs} from 'react-pdf';
import { PDFDocument, } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { Document, Page } from 'react-pdf';
import { FaDesktop, FaDropbox, FaGoogleDrive, FaPenNib } from 'react-icons/fa';
import axios from 'axios';
 import { ConversionForm, DownloadButton, DownloadWrapper, FileInput, FileInputContainer, FileTitle, FormTitle,
  PdfToWordPageContainer, SubmitButton, UploadIcon, UploadText, Error,
  RefreshButton, RefreshIcon, Container,Content,Form, Label, Dropzone, PreviewImage, 
  AddIcon, Wrapper, FormWrapper, ThumbnailPreview,ContentContainer,Tabs,TabsContent,TabIcon,TabIconWrapper,FormButton,SignIcon,
 SignLabel,Group,SignWrapper,TabHeader,TabButton,TabContent,FormContent,
 PdfContainer, PdfPreview,
 DigitalContainer,
 DigitalWrapper,
 DigitalSignButton,
 Toast,
 Spacer} from './Styles'
import Loading from '../Loading/Loading';
import useMediaQuery from '../Media/MediaQuery';
import{AddTextModal, DateModal, DraggableDate, DraggableName, DraggableSignature, DraggableStamp, DraggableText, SignModal,UploadPdfModal, StampModal, TextModal, blobToURL } from './Modal';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { GrDrag } from 'react-icons/gr';
import { FaPenToSquare } from 'react-icons/fa6';
import base_url from '../../Assets/API/Axios';


pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = new URL(  'pdfjs-dist/build/pdf.worker.min.js',import.meta.url,).toString();

export default function SignPdf() {
  const [data, setData] = useState({ file: null, user_password: '', owner_password: ''});
  const [signedPdf, setSigned] = useState(null)
  const [textSign,setTextSign] = useState('')
  const [dateSign,setDateSign] = useState('')
  const [nameSign,setNameSign] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [signatureURL, setSignatureURL] = useState(null);
  const [stampImg, setStampImg] = useState(null);
  const [pageDetails, setPageDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [isShowDate, setIsShowDate] = useState(false)
  const [isShowAddText, setIsShowAddText] = useState(false)
  const [isShowStamp, setIsShowStamp] = useState(false)
  const [isShowName, setIsShowName] = useState(false)
  const [isError, setIsError] = useState('')
  const [convertedFile, setConvertedFile] = useState(null);
  const [isShowSign, setIsShowSign] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1000px)');
  const documentRef = useRef(null);
  const [images,setImages] = useState('')
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });


  const users = JSON.parse(localStorage.getItem('doc-user'))
  const [user, setUser] = useState(null)

  useEffect(() => {
    document.title = 'Pdf signature';
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
    function onDocumentLoadSuccess({ numPages }){
      setNumPages(numPages);
    }

  const styleContent = {
    padding:isDesktop ? '0px 10px' : '0',
    // minHeight:'100%',
    background:'#fff',
    width:isDesktop ? '70%' : '99%',
    height:'max-content',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  }
  
  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSigned(acceptedFiles[0]);
    const blob = await blobToURL(acceptedFiles[0])
    setData({ ...data, file: blob});
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

      setImages(pageImages[0]);
    };
    fileReader.readAsArrayBuffer(file);
  };
 
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
    accept: {"application/pdf": [".pdf"]},
    multiple: true,
   });

  //  console.log(signedPdf.name);


   const handleSign = async () => {
    try {
      const { originalHeight, originalWidth } = pageDetails;
      const scale = originalWidth / documentRef.current.clientWidth;
  
      // Adjust y-coordinate based on document and container offsets
      const y = documentRef.current.clientHeight - (position.y - position.offsetY + 64 - documentRef.current.offsetTop);
      const x = position.x - 160 - position.offsetX - documentRef.current.offsetLeft;
  
      // Calculate new coordinates relative to actual document size
      const newY = (y * originalHeight) / documentRef.current.clientHeight;
      const newX = (x * originalWidth) / documentRef.current.clientWidth;
  
      const pdfDoc = await PDFDocument.load(data.file);
      const pages = pdfDoc.getPages();
      const page = pages[pageNumber - 1];
  
      const pngImage = await pdfDoc.embedPng(signatureURL);
      const pngDims = pngImage.scale(scale * 0.3);
  
      // Draw the signature image onto the page
      page.drawImage(pngImage, {
        x: newX,
        y: newY,
        width: pngDims.width,
        height: pngDims.height,
      });
  
      // Save the modified PDF
      const pdfBytes = await pdfDoc.save();
      // const blob = new Blob([new Uint8Array(pdfBytes)]);
      const modifiedPdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

        // Create a new File object from the Blob
        const modifiedPdfFile = new File([modifiedPdfBlob], `${signedPdf.name}`, { type: 'application/pdf' });
  
      // Convert blob to URL and update data state
      // const URL = await blobToURL(blob);
      setData({ ...data, file: modifiedPdfFile });
      // setSigned(URL);
      setPosition({ x: 0, y: 0 });
      setSignatureURL(null);
    } catch (error) {
      console.log(error.message);
      setIsError('Error please try again')
    }
  };
  
      const handleStampSign =async () => {
        // e.preventDefault()
        try {
          const { originalHeight, originalWidth } = pageDetails;
          const scale = originalWidth / documentRef.current.clientWidth;
  
          const y = documentRef.current.clientHeight - (position.y - position.offsetY + 64 -  documentRef.current.offsetTop);
          const x = position.x - 160 - position.offsetX - documentRef.current.offsetLeft;
  
          // new XY in relation to actual document size
          const newY = (y * originalHeight) / documentRef.current.clientHeight;
          const newX = (x * originalWidth) / documentRef.current.clientWidth;
          const blob = await blobToURL(data.file)
          const pdfDoc = await PDFDocument.load(blob);
          const pages = pdfDoc.getPages();
          const page = pages[pageNumber - 1];
          const pngImage = await pdfDoc.embedPng(stampImg);
          const pngDims = pngImage.scale( scale * .3);
          page.drawImage(pngImage, {
            x: newX,
            y: newY,
            width: pngDims.width,
            height: pngDims.height,
          });
          // Save the modified PDF
          const pdfBytes = await pdfDoc.save();
          // const blob = new Blob([new Uint8Array(pdfBytes)]);
          const modifiedPdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

            // Create a new File object from the Blob
            const modifiedPdfFile = new File([modifiedPdfBlob], `${signedPdf.name}`, { type: 'application/pdf' });
      
          // Convert blob to URL and update data state
          // const URL = await blobToURL(blob);
          setData({ ...data, file: modifiedPdfFile });
          // setSigned(URL);
          setPosition({x:0,y:0});
          setStampImg(null);
          // await  blobToURL(null)
        } catch (error) {
          console.log(error.message);
          setIsError('Error please try again')
        }
        }
const handleTextSign = async (text) => {
  try {
    const { originalHeight, originalWidth } = pageDetails;
    const scale = originalWidth / documentRef.current.clientWidth;

    const y = documentRef.current.clientHeight - (position.y + (24 * scale) - position.offsetY - documentRef.current.offsetTop);
    const x = position.x - 75 - position.offsetX - documentRef.current.offsetLeft;

    // new XY in relation to actual document size
    const newY = (y * originalHeight) / documentRef.current.clientHeight;
    const newX = (x * originalWidth) / documentRef.current.clientWidth;

    const blob = await blobToURL(data.file)
    const pdfDoc = await PDFDocument.load(blob);
    const pages = pdfDoc.getPages();
    const page = pages[pageNumber - 1]
    page.drawText(text, {
        x: newX,
        y: newY,
        size: 30,
      });
     // Save the modified PDF
     const pdfBytes = await pdfDoc.save();
     // const blob = new Blob([new Uint8Array(pdfBytes)]);
     const modifiedPdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

       // Create a new File object from the Blob
       const modifiedPdfFile = new File([modifiedPdfBlob], `${signedPdf.name}`, { type: 'application/pdf' });
 
     // Convert blob to URL and update data state
     // const URL = await blobToURL(blob);
     setData({ ...data, file: modifiedPdfFile });
     // setSigned(URL);
     setPosition({ x: 0, y: 0 });
      setTextSign('');
  } catch (error) {
    console.log(error.message);
    setIsError('Error please try again')
  }
}

const handleNameSign = async (text) => {
  try {
    const { originalHeight, originalWidth } = pageDetails;
    const scale = originalWidth / documentRef.current.clientWidth;

    const y = documentRef.current.clientHeight - (position.y + (24 * scale) - position.offsetY - documentRef.current.offsetTop);
    const x = position.x - 75 - position.offsetX - documentRef.current.offsetLeft;

    // new XY in relation to actual document size
    const newY = (y * originalHeight) / documentRef.current.clientHeight;
    const newX = (x * originalWidth) / documentRef.current.clientWidth;

    const blob = await blobToURL(data.file)
    const pdfDoc = await PDFDocument.load(blob);
    const pages = pdfDoc.getPages();
    const page = pages[pageNumber - 1]
    page.drawText(text, {
        x: newX,
        y: newY,
        size: 30,
      });
      // Save the modified PDF
      const pdfBytes = await pdfDoc.save();
      // const blob = new Blob([new Uint8Array(pdfBytes)]);
      const modifiedPdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

        // Create a new File object from the Blob
        const modifiedPdfFile = new File([modifiedPdfBlob], `${signedPdf.name}`, { type: 'application/pdf' });
  
      // Convert blob to URL and update data state
      // const URL = await blobToURL(blob);
      setData({ ...data, file: modifiedPdfFile });
      // setSigned(URL);
      setPosition({ x: 0, y: 0 });
      setNameSign('');
  } catch (error) {
    console.log(error.message);
    setIsError('Error please try again')
  }
}
const handleDateSign = async (text) => {
  try {
    const { originalHeight, originalWidth } = pageDetails;
    const scale = originalWidth / documentRef.current.clientWidth;

    const y = documentRef.current.clientHeight - (position.y + (24 * scale) - position.offsetY - documentRef.current.offsetTop);
    const x = position.x - 75 - position.offsetX - documentRef.current.offsetLeft;

    // new XY in relation to actual document size
    const newY = (y * originalHeight) / documentRef.current.clientHeight;
    const newX = (x * originalWidth) / documentRef.current.clientWidth;

    const blob = await blobToURL(data.file)
    const pdfDoc = await PDFDocument.load(blob);
    const pages = pdfDoc.getPages();
    const page = pages[pageNumber - 1]
    page.drawText(text, {
        x: newX,
        y: newY,
        size: 30,
      });
      // Save the modified PDF
      const pdfBytes = await pdfDoc.save();
      // const blob = new Blob([new Uint8Array(pdfBytes)]);
      const modifiedPdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

        // Create a new File object from the Blob
        const modifiedPdfFile = new File([modifiedPdfBlob], `${signedPdf.name}`, { type: 'application/pdf' });
  
      // Convert blob to URL and update data state
      // const URL = await blobToURL(blob);
      setData({ ...data, file: modifiedPdfFile });
      // setSigned(URL);
      setPosition({ x: 0, y: 0 });
      setDateSign('');
  } catch (error) {
    console.log(error.message);
    setIsError('Error please try again')
  }
}



  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', data.file);
    // formData.append('owner_password',data.owner_password)
    // formData.append('user_password',data.user_password)
    
    try {
      setIsLoading(true)
      setIsError('')
      await base_url.post('sign_pdf/'+user.id+'/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res)=>{
        console.log(res);
       setConvertedFile(res.data);
       setIsLoading(false)
       setIsError('')
      }).catch((err)=>{
        setIsError('failed to signed')
        console.log(err)
        setIsLoading(false)
      })
    } catch (error) {
      console.error('Error:', error);
      setIsError('Error while processing PDF')
      setIsLoading(false)
    }
  }

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
            <Container >
              {!images.length ?
              <Loading/>
              :
              <ContentContainer>
                    <Content style={styleContent}>
                      <PdfContainer>
                      <Tab pageNumber={pageNumber} setPageNumber={setPageNumber} numPages={numPages}
                         setShowAdd={setShowAdd} data={data} setData={setData} />
                       <PdfPreview ref={documentRef} style={{position:'relative'}}>
                          <Document className={'document'} file={data.file} onLoadSuccess={onDocumentLoadSuccess} onLoadError={(error)=>setIsError(error.message)}>
                            <Page width={!isDesktop ? 400 : null} className={'page'} pageNumber={pageNumber}  onLoadSuccess={(data) => {setPageDetails(data)}}/>
                          </Document>
                          {/* <p>
                            Page {pageNumber} of {numPages}
                          </p> */}
                          {nameSign ?
                              <DraggableName onEnd={setPosition} onSet={handleNameSign} onCancel={() => {setIsShowName(false)}}  text={nameSign}/> 
                            : null}
                          {textSign ?
                              <DraggableText onEnd={setPosition} onSet={handleTextSign} onCancel={() => {setIsShowAddText(false)}}  text={textSign}/> 
                            : null}
                          {dateSign ?
                              <DraggableDate onEnd={setPosition} onSet={handleDateSign} onCancel={() => {setIsShowDate(false)}}  text={dateSign}/> 
                            : null}
                          {signatureURL ? 
                              <DraggableSignature url={signatureURL} onSet={handleSign} onEnd={setPosition} onCancel={() => {setSignatureURL(null)}}/>
                              :null}
                          {stampImg ? 
                              <DraggableStamp url={stampImg} onSet={handleStampSign} onEnd={setPosition} onCancel={() => {setStampImg(null)}}/>
                              :null}
                       </PdfPreview>
                      </PdfContainer>
                    </Content>
                    <Forms isError={isError} handleSign={handleSign} isDesktop={isDesktop} setIsShowSign={setIsShowSign} signedPdf={signedPdf} handleSubmit={handleSubmit}
                    setIsShowAddText={setIsShowAddText} setIsShowDate={setIsShowDate} setIsShowName={setIsShowName} setIsShowStamp={setIsShowStamp}/>
              </ContentContainer>}
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
      {isShowSign && <SignModal isOpen={()=>setIsShowSign(true)} onClose={()=>setIsShowSign(false)} onConfirm={(url) => { setSignatureURL(url); setIsShowSign(false)  }} />}
      {isShowName && <TextModal isOpen={()=>setIsShowName(true)} onClose={()=>setIsShowName(false)} onConfirm={(text) => { setNameSign(text); setIsShowName(false)  }} />}
      {isShowAddText && <AddTextModal isOpen={()=>setIsShowAddText(true)} onClose={()=>setIsShowAddText(false)} onConfirm={(text) => { setTextSign(text); setIsShowAddText(false)  }} />}
      {isShowDate && <DateModal isOpen={()=>setIsShowDate(true)} onClose={()=>setIsShowDate(false)} onConfirm={(text) => { setDateSign(text); setIsShowDate(false)  }} />}
      {isShowStamp && <StampModal isOpen={()=>setIsShowStamp(true)} onClose={()=>setIsShowStamp(false)} onConfirm={(img) => { setStampImg(img); setIsShowStamp(false)  }} />}
      {showAdd && <UploadPdfModal isOpen={()=>setShowAdd(true)} onClose={()=>setShowAdd(false)} data={data} setData={setData} setShowAdd={setShowAdd} />}
    </PdfToWordPageContainer>
  );
}


export function Forms(props) {
  const {isError,setIsShowSign,isDesktop,setIsShowName,setIsShowAddText,setIsShowDate, handleSubmit} = props
   const styles = {
    formWrapper:{
      width: isDesktop ? '30%' : '100%',
    },
    form:{
      width:'95%',
      padding:'5px',
      paddingTop:isDesktop ? '2em':'20px',
      paddingBottom:'20px,'
    },
    group:{
      width: isDesktop ? '93%':'96%',
    }
  }
  return (
    <FormWrapper style={styles.formWrapper}>
      <Form style={styles.form} onSubmit={handleSubmit}>
        <SignWrapper>
          <TabContent>
              <FileTitle>Simple signature</FileTitle>
              <Group style={styles.group}>
                <FormButton>
                <SignIcon><FaPenNib/></SignIcon>
                <FormContent>
                  <SignLabel>Signature</SignLabel>
                  </FormContent>
                  <SignIcon onClick={()=>setIsShowSign(true)}><FaPenToSquare/> </SignIcon>
                </FormButton>
              </Group>
              <Group style={styles.group}>
                <FormButton>
                  <SignIcon><FaPenNib/></SignIcon>
                  <FormContent>
                      <SignLabel>Name</SignLabel>
                  </FormContent>
                  <SignIcon onClick={()=>setIsShowName(true)}><FaPenToSquare/> </SignIcon>
                </FormButton>
              </Group>
              <Group style={styles.group}>
                {/* <Label>Required field</Label> */}
                <FormButton>
                  <SignIcon><GrDrag/> </SignIcon>
                  <FormContent>
                    <SignLabel>Date</SignLabel>
                  </FormContent>
                  <SignIcon onClick={()=>setIsShowDate(true)}><FaPenToSquare/> </SignIcon>
                </FormButton>
              </Group>
              <Group style={styles.group}>
                {/* <Label>Required field</Label> */}
                <FormButton>
                  <SignIcon><GrDrag/> </SignIcon>
                  <FormContent>
                    <SignLabel>Text</SignLabel>
                  </FormContent>
                  <SignIcon onClick={()=>setIsShowAddText(true)}><FaPenToSquare/> </SignIcon>
                </FormButton>
              </Group>
              {/* <Group style={styles.group}>
                <FormButton>
                  <SignIcon><GrDrag/> </SignIcon>
                  <FormContent>
                    <SignLabel>Stamp</SignLabel>
                  </FormContent>
                  <SignIcon onClick={()=>setIsShowStamp(true)}><FaPenToSquare/> </SignIcon>
                </FormButton>
              </Group> */}
          </TabContent>
        </SignWrapper>
        {isError && <Error>{isError}</Error>}
        <SubmitButton type="submit">Sign</SubmitButton>
      </Form>
    </FormWrapper>
  )
}

export function Thumbnail({images, data}) {
  
  return (
    <>
    {images.length >=1 && 
      <Wrapper>
      {images.map((image,i)=>{
        return (
          <ThumbnailPreview key={i}>
            {/* <div> */}
              <PreviewImage src={image} alt={data.file.name} style={{width:'100%'}} />
              <Label>{i}</Label>
            {/* </div> */}
          </ThumbnailPreview>
        )
      })}
      </Wrapper>}
    </>
  )
}




export const Tab = (props) => {
  const {pageNumber,setPageNumber,numPages,setShowAdd} = props

  const goToPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

 
  return (
    <>
     <Tabs>
        <TabsContent>
          <TabIcon onClick={goToPrevPage}><IoIosArrowUp /> </TabIcon>
          <TabIcon onClick={goToNextPage}><IoIosArrowDown /></TabIcon>
        </TabsContent>
        <TabsContent>
        <Label>Page {pageNumber} of {numPages}</Label>
        </TabsContent>
        <TabsContent>
          <TabIconWrapper >
            <AddIcon onClick={()=>setShowAdd(true)}><FaDesktop/></AddIcon>
            {/* <FileInputLabel>
              <AddIcon onClick={()=>setShowAdd(true)}><FaDesktop/></AddIcon>
              <FileInput onClick={()=>console.log('done')}  onChange={handleChange} />
            </FileInputLabel> */}
          </TabIconWrapper>
          {/* <TabIconWrapper  >
            <AddIcon onClick={()=>alert('done')}><FaGoogleDrive/></AddIcon>
          </TabIconWrapper> */}
          {/* <TabIconWrapper  >
            <AddIcon><FaDropbox/></AddIcon>
          </TabIconWrapper> */}
        </TabsContent>
      </Tabs>
    </>
  );
};
