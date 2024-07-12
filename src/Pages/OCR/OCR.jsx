import React, { useEffect, useState } from 'react';
import { OCRContainer, ConversionForm, DownloadButton, DownloadWrapper, FileInput, FileInputContainer, FileTitle, FormTitle,
    PdfToWordPageContainer, SubmitButton, UploadIcon, UploadText, Error,
    RefreshButton,
    RefreshIcon,
    Group, Container,Content,Form,
    Label,
    StyledSelect,
    Input,
    Spacer,
    PreviewContainer, Dropzone,
    PreviewImage,
    Preview,
    AddContainer,
    AddButton,
    AddIcon,
    FileName
    } from './Styled'
    import Loading from '../../component/Loading/Loading';
  import base_url from '../../Assets/API/Axios';
import { useDropzone } from 'react-dropzone';
import { FaPlus } from 'react-icons/fa';

export function OCR(){
    const [data, setData] = useState({ file: null, lang:''});
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState('')
    const [convertedFile, setConvertedFile] = useState(null);
    const users = JSON.parse(localStorage.getItem('doc-user'))
    const [user, setUser] = useState(null)
  
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
        'image/*': ['.jpeg','.jpg','.bmp', '.png']
      }
     });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append('file', data.file);
      formData.append('langugae', data.lang.value);
      
      try {
        setIsLoading(true)
        setIsError('')
        await base_url.post('ocr_image/'+user.id+'/', formData, {
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
          console.log(err.response.data.error)
          setIsLoading(false)
        })
      } catch (error) {
        console.error('Error while processing:', error);
        setIsError('Error: ', error.message)
        setIsLoading(false)
      }
    }
  
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

  const tesseractLanguages = [
    { value: 'afr', label: 'Afrikaans' },
    { value: 'amh', label: 'Amharic' },
    { value: 'ara', label: 'Arabic' },
    { value: 'asm', label: 'Assamese' },
    { value: 'aze', label: 'Azerbaijani' },
    { value: 'bel', label: 'Belarusian' },
    { value: 'ben', label: 'Bengali' },
    { value: 'bod', label: 'Tibetan' },
    { value: 'bos', label: 'Bosnian' },
    { value: 'bul', label: 'Bulgarian' },
    { value: 'cat', label: 'Catalan' },
    { value: 'ceb', label: 'Cebuano' },
    { value: 'ces', label: 'Czech' },
    { value: 'chr', label: 'Cherokee' },
    { value: 'cym', label: 'Welsh' },
    { value: 'dan', label: 'Danish' },
    { value: 'dan_frak', label: 'Danish (Fraktur)' },
    { value: 'deu', label: 'German' },
    { value: 'deu_frak', label: 'German (Fraktur)' },
    { value: 'ell', label: 'Greek' },
    { value: 'eng', label: 'English' },
    { value: 'enm', label: 'Middle English (1100-1500)' },
    { value: 'epo', label: 'Esperanto' },
    { value: 'est', label: 'Estonian' },
    { value: 'eus', label: 'Basque' },
    { value: 'fao', label: 'Faroese' },
    { value: 'fas', label: 'Persian' },
    { value: 'fil', label: 'Filipino' },
    { value: 'fin', label: 'Finnish' },
    { value: 'fra', label: 'French' },
    { value: 'frk', label: 'German (Fraktur)' },
    { value: 'frm', label: 'French (Reformed)' },
    { value: 'glg', label: 'Galician' },
    { value: 'grc', label: 'Ancient Greek' },
    { value: 'guj', label: 'Gujarati' },
    { value: 'hat', label: 'Haitian' },
    { value: 'heb', label: 'Hebrew' },
    { value: 'hin', label: 'Hindi' },
    { value: 'hrv', label: 'Croatian' },
    { value: 'hun', label: 'Hungarian' },
    { value: 'iku', label: 'Inuktitut' },
    { value: 'ind', label: 'Indonesian' },
    { value: 'isl', label: 'Icelandic' },
    { value: 'ita', label: 'Italian' },
    { value: 'ita_old', label: 'Italian (Old)' },
    { value: 'jav', label: 'Javanese' },
    { value: 'jpn', label: 'Japanese' },
    { value: 'kan', label: 'Kannada' },
    { value: 'kaz', label: 'Kazakh' },
    { value: 'khm', label: 'Khmer' },
    { value: 'kir', label: 'Kyrgyz' },
    { value: 'kor', label: 'Korean' },
    { value: 'kur', label: 'Kurdish' },
    { value: 'lao', label: 'Lao' },
    { value: 'lat', label: 'Latin' },
    { value: 'lav', label: 'Latvian' },
    { value: 'lit', label: 'Lithuanian' },
    { value: 'mal', label: 'Malayalam' },
    { value: 'mar', label: 'Marathi' },
    { value: 'mkd', label: 'Macedonian' },
    { value: 'mlt', label: 'Maltese' },
    { value: 'mon', label: 'Mongolian' },
    { value: 'mya', label: 'Burmese' },
    { value: 'nep', label: 'Nepali' },
    { value: 'nld', label: 'Dutch' },
    { value: 'nor', label: 'Norwegian' },
    { value: 'oci', label: 'Occitan' },
    { value: 'pan', label: 'Punjabi' },
    { value: 'pol', label: 'Polish' },
    { value: 'por', label: 'Portuguese' },
    { value: 'pus', label: 'Pashto' },
    { value: 'que', label: 'Quechua' },
    { value: 'ron', label: 'Romanian' },
    { value: 'rus', label: 'Russian' },
    { value: 'san', label: 'Sanskrit' },
    { value: 'sin', label: 'Sinhala' },
    { value: 'slk', label: 'Slovak' },
    { value: 'slv', label: 'Slovenian' },
    { value: 'spa', label: 'Spanish' },
    { value: 'spa_old', label: 'Spanish (Old)' },
    { value: 'srp', label: 'Serbian' },
    { value: 'swa', label: 'Swahili' },
    { value: 'swe', label: 'Swedish' },
    { value: 'syr', label: 'Syriac' },
    { value: 'tam', label: 'Tamil' },
    { value: 'tat', label: 'Tatar' },
    { value: 'tel', label: 'Telugu' },
    { value: 'tgk', label: 'Tajik' },
    { value: 'tha', label: 'Thai' },
    { value: 'tir', label: 'Tigrinya' },
    { value: 'tur', label: 'Turkish' },
    { value: 'uig', label: 'Uighur' },
    { value: 'ukr', label: 'Ukrainian' },
    { value: 'urd', label: 'Urdu' },
    { value: 'uzb', label: 'Uzbek' },
    { value: 'vie', label: 'Vietnamese' },
    { value: 'yid', label: 'Yiddish' }
];

    const handleSelectChange = (selectedOption) => {
        // setSelectedLanguage(selectedOption);
        setData({...data, lang:selectedOption})
        console.log(`Selected: ${selectedOption.value}`);
    };

  const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: 'transparent',width:'100%' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor:  'transparent',
      color: '#007bff',
      cursor: isDisabled ? 'not-allowed' : 'default',
      };
    },
  };
  
console.log(data.lang)

    return (
      <OCRContainer>
        {isLoading ? <Loading/> : 
        <>
          <ConversionForm>
          {!convertedFile && <>
            {!data.file && <>
             <Dropzone {...getRootProps()} >
                <FormTitle>Drag 'n' drop a Image here</FormTitle>
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
                    <PreviewContainer>
                      <Preview>
                        <PreviewImage src={require('../../Assets/Images/ocr1.webp')} alt={`Page`} />
                        <FileName>{data.file.name}</FileName>
                      </Preview>
                    </PreviewContainer>
                </Content>
                <Form onSubmit={handleSubmit}>
                  <FileTitle>Optical character recognition</FileTitle>
                  <Spacer></Spacer>
                  <Group>
                    <Label>Select langugae</Label>
                    <StyledSelect
                      options={tesseractLanguages}
                      value={data.lang}
                      onChange={handleSelectChange}
                      placeholder={data.lang ? data.lang.label : 'Select a language'}
                      styles={colourStyles}
                      menuPlacement="top"
                      required
                    />
                  </Group>
                  {isError && <Error>{isError}</Error>}
                  <SubmitButton type="submit">Extract content</SubmitButton>
                </Form>
              </Container>}
            </>}
            {convertedFile && (
            <DownloadWrapper>
              <RefreshButton onClick={()=>window.location.reload()}><RefreshIcon/> upload another file</RefreshButton>
              <FileTitle> Extracted content file: &nbsp;{convertedFile.file_name}</FileTitle>
              {isError && <Error>{isError}</Error>}
              <DownloadButton type='button' onClick={() => handleDownload(convertedFile.result.id)}>Download</DownloadButton>
            </DownloadWrapper>
          )}
          </ConversionForm>
          </>
        }
      </OCRContainer>
    );
  }