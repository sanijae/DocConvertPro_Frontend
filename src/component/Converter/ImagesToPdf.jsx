import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist';
import { FaDesktop, FaDropbox, FaGoogleDrive, FaPlus } from 'react-icons/fa';
import axios from 'axios';
 import { ConversionForm, DownloadButton, DownloadWrapper, FileInput, FileInputContainer, FileTitle, FormTitle,PdfToWordPageContainer, SubmitButton, UploadIcon, UploadText, Error,RefreshButton,RefreshIcon,Container,Content,Form,
 Spacer,PreviewContainer, Dropzone,PreviewImage,Preview,AddContainer,AddButton,AddIcon,IconWrapper,FileInputLabel} from './Styles'
  import Loading from '../Loading/Loading';
import Slider from 'react-slick';
import useMediaQuery from '../Media/MediaQuery';
import base_url from '../../Assets/API/Axios';


  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function ImagesToPdf() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState('')
  const [images, setImages] = useState([]);
  const [convertedFile, setConvertedFile] = useState(null);
  const isMobile = useMediaQuery('(max-width: 800px)');

 
  const users = JSON.parse(localStorage.getItem('doc-user'))
  const [user, setUser] = useState(null)

  useEffect(() => {
    document.title = 'Images to PDF';
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
    let files = [];
    if (Array.isArray(acceptedFiles)) {
      files = acceptedFiles;
    } else {
      files = [acceptedFiles];
    }
    
    const promises = files.map(file => {
      const fileReader = new FileReader();
      return new Promise((resolve, reject) => {
        fileReader.onload = () => {
          const imageUrl = fileReader.result;
          setImages(prevImages => [...prevImages, imageUrl]);
          resolve(); 
        };
        fileReader.onerror = reject;
        fileReader.readAsDataURL(file);
      });
    });
  
    await Promise.all(promises);
    setData(files);
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
      console.error('Error: ', error);
      setIsError('Error: ', error.message)
      setIsLoading(false)
    }
  }

//  console.log(images);
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
    maxHeight:'100vh',
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
          {!data.length && <>
           <Dropzone {...getRootProps()} >
              <FormTitle>Drag 'n' drop a Image file here</FormTitle>
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
                    <AddButton>
                      <FileInputLabel {...getRootProps()}>
                      <AddIcon><FaPlus/></AddIcon>
                      <FileInput {...getInputProps()} />
                      </FileInputLabel>
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
              {data.length < 1 ? <>
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

export default ImagesToPdf;

export const ImagesSlider=({images})=>{
  const [settings] = useState({
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: images.length >1 ? 2 : 1,
    slidesToScroll: images.length >1 ? 2 : 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  });
  
  console.log('images',images.length);
  return (
    <Preview style={{width:'30em'}}>
        <Slider {...settings}>
              {images.map((img,i)=>{
              return(
                  <PreviewImage style={{width:'10em'}} src={img} alt={`Page`} />
              )
              })}
        </Slider>
    </Preview>
  );
}