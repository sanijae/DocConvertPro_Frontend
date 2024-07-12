import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import Draggable from "react-draggable";
import styled from 'styled-components';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import { IoIosCloudUpload } from "react-icons/io";

const Container = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
`;
const ViewerWrapper = styled.div`
  flex: 1;
  overflow: hidden;
`

const ModalWrapper = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* overflow: auto; */
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #007bff;
  width: 60%;
  display: flex;
  flex-direction: column;

  @media screen and (max-width:800px){
    width: 80%;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ModalBody = styled.div`
padding: 20px;
background: #fff;
border: 1px solid #007bff;
border-radius: 7px;
display: flex;
flex-direction: column;
`
const ModalFooter = styled.div`
  text-align: right;
  display: flex;
  justify-content: right;
`;

const ModalButton = styled.button`
  background-color: ${props => (props.primary ? '#007bff' : '#ddd')};
  color: ${props => (props.primary ? '#fff' : '#000')};
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;
const ModalTitle = styled.h2`
font-size: 1rem;
color: #007bff;
`
const Label = styled.div`
font-size: 1rem;
width: 100%;
color: #007bff;
margin: 10px auto;
text-align: left;
`
const Input = styled.input`
  padding: 15px;
  width: 90%;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  background-color: #fff;
  color: #0056b3;

  &:focus{
    outline: none;
  }
`
const TextArea = styled.textarea`
  padding: 15px;
  width: 90%;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  background-color: #fff;
  color: #0056b3;

  &:focus{
    outline: none;
  }
`
const Dropzone = styled.div`
width: 80%;
min-height: 50%;
padding: 20px;
display: flex;
flex-direction: column;
align-items: center;
background: #F4F7FB;
color: #007bff;
`
const FormTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
  color: #007bff;
`;

const FileInputContainer = styled.label`
  display: inline-block;
  position: relative;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  color: #0056b3;

  &:hover{
    background-color: #fff;
    color: #007bff;
    border: 1px solid #007bff;
  }
`;

const FileInput = styled.input.attrs({ type: 'file' })`
  display: none;
  width: 100%;
`;
const UploadIcon = styled(IoIosCloudUpload)`
  font-size: 24px;
`;

const UploadText = styled.span`
  font-size: 1.5rem;
  margin-left: 8px;
`;


// const TabsWrapper = styled.div`
//   display: flex;
//   justify-content: center;
// `;

// const TabButton = styled.button`
//   padding: 10px 20px;
//   margin: 0 10px;
//   border: none;
//   background-color: transparent;
//   cursor: pointer;
//   font-size: 1rem;
//   color: ${props => (props.active ? '#007bff' : '#333')};
//   border-bottom: 2px solid ${props => (props.active ? '#007bff' : 'transparent')};
// `;


export const SignModal = ({ isOpen, onClose, onConfirm }) => {
  // const [activeTab, setActiveTab] = useState('draw');
  // const [file,setFile] = useState(null)
  const signatureCanvas = useRef();
  // const fileInputRef = useRef();

  // const onDrop = async (acceptedFiles) => {
  //   const file = acceptedFiles[0];
  //   setFile(file);
  // };
  
 
  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop: onDrop,
  //   accept: '.pdf, .doc, .docx',
  //   multiple: true,
  //  });

   const handleConfirm = () => {
    const signatureData = signatureCanvas.current.toDataURL();
      onConfirm(signatureData);
    // if (activeTab === 'draw') {
    //   const signatureData = signatureCanvas.current.toDataURL();
    //   onConfirm(signatureData);
    // } else if (activeTab === 'upload') {
    //   if (file) {
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //       const signatureDataURL = reader.result;
    //       onConfirm(signatureDataURL);
    //     };
    //     reader.readAsDataURL(file);
    //   } else {
    //     console.error('No file uploaded.');
    //   }
    // }
  };
  

  return (
    <ModalWrapper isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Signature Options</ModalTitle>
        </ModalHeader>
        <ModalBody>
          {/* <TabsWrapper>
            <TabButton active={activeTab === 'draw'} onClick={() => setActiveTab('draw')}>
              Draw Signature
            </TabButton>
            <TabButton active={activeTab === 'upload'} onClick={() => setActiveTab('upload')}>
              Upload Signature
            </TabButton>
          </TabsWrapper>
          {activeTab === 'draw' && (
            <SignatureCanvas ref={signatureCanvas} />
          )}
          {activeTab === 'upload' && (
            <Dropzone {...getRootProps()} >
                <FormTitle>Drag 'n' drop a PDF file here</FormTitle>
                <FileInputContainer>
                  <FileInput {...getInputProps()} />
                  <UploadIcon />
                  <UploadText> Click to select one</UploadText>
                </FileInputContainer>
            </Dropzone>
          )} */}
           <SignatureCanvas ref={signatureCanvas} />
        </ModalBody>
        <ModalFooter>
          <ModalButton secondary onClick={onClose}>Cancel</ModalButton>
          <ModalButton primary onClick={handleConfirm}>Confirm</ModalButton>
        </ModalFooter>
      </ModalContent>
    </ModalWrapper>
  );
}

export const TextModal = ({ isOpen, onClose, onConfirm }) => {
  const [data,setData] = useState('')
  
  const handleChange = (e) => {
    const text = e.target.value;
    setData(text);
  };
  const handleConfirm = () => {
    onConfirm(data);
  };

  return (
    <ModalWrapper isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Enter your name below</ModalTitle>
        </ModalHeader>
        <ModalBody style={{border:'none'}}>
          <Label>your name</Label>
          <Input placeholder='Enter the name' value={data} onChange={handleChange}/>
        </ModalBody>
        <ModalFooter>
          <ModalButton secondary onClick={onClose}>Cancel</ModalButton>
          <ModalButton primary onClick={handleConfirm}>Confirm Sign</ModalButton>
        </ModalFooter>
      </ModalContent>
    </ModalWrapper>
  );
}

export const DateModal = ({ isOpen, onClose, onConfirm }) => {
  const [data,setData] = useState('')
  
  const handleChange = (e) => {
    const text = e.target.value;
    setData(text);
  };
  const handleConfirm = () => {
    onConfirm(data);
  };

  return (
    <ModalWrapper isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>select the date</ModalTitle>
        </ModalHeader>
        <ModalBody style={{border:'none'}}>
          <Label>Text sign</Label>
          <Input type='date' value={data} onChange={handleChange}/>
        </ModalBody>
        <ModalFooter>
          <ModalButton secondary onClick={onClose}>Cancel</ModalButton>
          <ModalButton primary onClick={handleConfirm}>Confirm Sign</ModalButton>
        </ModalFooter>
      </ModalContent>
    </ModalWrapper>
  );
}
export const AddTextModal = ({ isOpen, onClose, onConfirm }) => {
  const [data,setData] = useState('')
  
  const handleChange = (e) => {
    const text = e.target.value;
    setData(text);
  };
  const handleConfirm = () => {
    onConfirm(data);
  };

  return (
    <ModalWrapper isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Type your text below</ModalTitle>
        </ModalHeader>
        <ModalBody style={{border:'none'}}>
          <Label>Text sign</Label>
          <TextArea placeholder='Enter the additional comment' value={data} onChange={handleChange}/>
        </ModalBody>
        <ModalFooter>
          <ModalButton secondary onClick={onClose}>Cancel</ModalButton>
          <ModalButton primary onClick={handleConfirm}>Confirm Sign</ModalButton>
        </ModalFooter>
      </ModalContent>
    </ModalWrapper>
  );
}

export const StampModal = ({ isOpen, onClose, onConfirm }) => {
  const [file,setFile] = useState(null)
  const [previewUrl,setPreviewImageUrl] = useState(null)
 
  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const imageUrl = fileReader.result; 
      setPreviewImageUrl(imageUrl); 
    };
  
    fileReader.readAsDataURL(file); 
  };
  
 
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
    accept: '.pdf, .doc, .docx',
    multiple: true,
   });
  
  
  const handleConfirm = () => {
    const reader = new FileReader();
      reader.onload = () => {
        onConfirm(reader.result);
      };
      reader.readAsDataURL(file);
  };

  return (
    <ModalWrapper isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>upload your stamp</ModalTitle>
        </ModalHeader>
        <ModalBody style={{border:'none'}}>
          {previewUrl ?
          <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <img src={previewUrl} style={{width:'100px'}} alt="Preview" />
          </div>
          :
          <Dropzone {...getRootProps()} >
              <FormTitle>Drag 'n' drop a PDF file here</FormTitle>
              <FileInputContainer>
                <FileInput {...getInputProps()} />
                <UploadIcon />
                <UploadText> Click to select one</UploadText>
              </FileInputContainer>
          </Dropzone>}
        </ModalBody>
        <ModalFooter>
          <ModalButton secondary onClick={onClose}>Cancel</ModalButton>
          <ModalButton primary onClick={handleConfirm}>Confirm Sign</ModalButton>
        </ModalFooter>
      </ModalContent>
    </ModalWrapper>
  );
}

export const UploadPdfModal = ({ isOpen, onClose, data,setData, setShowAdd }) => {
  
  const onDrop = async (acceptedFiles) => {
    const blob = await blobToURL(acceptedFiles[0])
    setData({ ...data, file: blob});
    setShowAdd(false)
  };
 
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
    accept: '.pdf',
    multiple: true,
   });

  return (
    <ModalWrapper isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>upload your stamp</ModalTitle>
        </ModalHeader>
        <ModalBody style={{border:'none'}}>
          <Dropzone {...getRootProps()} >
              <FormTitle>Drag 'n' drop a PDF file here</FormTitle>
              <FileInputContainer>
                <FileInput {...getInputProps()} />
                <UploadIcon />
                <UploadText> Click to select one</UploadText>
              </FileInputContainer>
          </Dropzone>
        </ModalBody>
        <ModalFooter>
          <ModalButton secondary onClick={onClose}>Cancel</ModalButton>
          <ModalButton primary onClick={onClose}>upload</ModalButton>
        </ModalFooter>
      </ModalContent>
    </ModalWrapper>
  );
}


export function blobToURL(blob) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  }

  export function DraggableSignature({ url, onEnd, onSet, onCancel }) {
  const styles = {
    container: {
      position: 'absolute',
      zIndex: 100,
      border: `1px solid #007bff`,
      cursor:'move',
    },
    controls: {
      position: 'absolute',
      right: 0,
      display: 'inline-block',
      backgroundColor: '#fff',
      // borderRadius: 4,
    },
    content: {
      width:'fit-content',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      background:'transparent',
      padding:'15px',
    },
    smallButton: {
      display: 'inline-block',
      cursor: 'pointer',
      padding: 4,
    }
  }
  return (
    <Draggable onStop={onEnd}>
      <div style={styles.container}>
        <div style={styles.controls}>
          <div style={styles.smallButton} onClick={onSet}><FaCheck color={'green'}/></div>
          <div style={styles.smallButton} onClick={onCancel}><FaTimes color={'red'}/></div>
        </div>
        <div style={styles.content}>
          <img src={url} width={200} style={styles.img} draggable={false} alt='sign' />
        </div>
      </div>
    </Draggable>
  );
}

export function DraggableText({ onEnd, onSet, onCancel, text }) {
  const styles = {
    container: {
      position: "absolute",
      zIndex: 100,
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      border: `1px solid #007bff`,
      minWidth:'10em',
      cursor:'move',
    },
    content: {
      width:'fit-content',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      background:'transparent',
      padding:'15px',
    },
    controls: {
      position: "absolute",
      right: 0,
      display: "inline-block",
      backgroundColor: "#fff",
    },
    smallButton: {
      display: "inline-block",
      cursor: "pointer",
      padding: 4,
    },
    text: {
     fontSize:'18px',
     color:'#000'
    }
  };
  return (
    <Draggable onStop={onEnd}>
      <div style={styles.container}>
        <div style={styles.controls}>
          <div style={styles.smallButton} onClick={()=>onSet(text)}>  <FaCheck color={'#007bff'} /> </div>
          <div style={styles.smallButton} onClick={onCancel}> <FaTimes color={'red'} /> </div>
        </div>
        <div style={styles.content}>
            <div style={styles.text}>{text}</div>
        </div>
      </div>
    </Draggable>
  );
}

export function DraggableName({ onEnd, onSet, onCancel, text }) {
  const styles = {
    container: {
      position: "absolute",
      zIndex: 100,
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      border: `1px solid #007bff`,
      minWidth:'10em',
      cursor:'move',
    },
    content: {
      width:'fit-content',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      background:'transparent',
      padding:'15px',
    },
    controls: {
      position: "absolute",
      right: 0,
      display: "inline-block",
      backgroundColor: "#fff",
    },
    smallButton: {
      display: "inline-block",
      cursor: "pointer",
      padding: 4,
    },
    text: {
     fontSize:'18px',
     color:'#000'
    }
  };
  return (
    <Draggable onStop={onEnd}>
      <div style={styles.container}>
        <div style={styles.controls}>
          <div style={styles.smallButton} onClick={()=>onSet(text)}>  <FaCheck color={'#007bff'} /> </div>
          <div style={styles.smallButton} onClick={onCancel}> <FaTimes color={'red'} /> </div>
        </div>
        <div style={styles.content}>
            <div style={styles.text}>{text}</div>
        </div>
      </div>
    </Draggable>
  );
}

export function DraggableDate({ onEnd, onSet, onCancel, text }) {
  const styles = {
    container: {
      position: "absolute",
      zIndex: 100,
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      border: `1px solid #007bff`,
      minWidth:'10em',
      cursor:'move',
    },
    content: {
      width:'fit-content',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      background:'transparent',
      padding:'15px',
    },
    controls: {
      position: "absolute",
      right: 0,
      display: "inline-block",
      backgroundColor: "#fff",
    },
    smallButton: {
      display: "inline-block",
      cursor: "pointer",
      padding: 4,
    },
    text: {
     fontSize:'18px',
     color:'#000'
    }
  };
  return (
    <Draggable onStop={onEnd}>
      <div style={styles.container}>
        <div style={styles.controls}>
          <div style={styles.smallButton} onClick={()=>onSet(text)}>  <FaCheck color={'#007bff'} /> </div>
          <div style={styles.smallButton} onClick={onCancel}> <FaTimes color={'red'} /> </div>
        </div>
        <div style={styles.content}>
            <div style={styles.text}>{text}</div>
        </div>
      </div>
    </Draggable>
  );
}
export function DraggableStamp({ url, onEnd, onSet, onCancel }) {
  const styles = {
    container: {
      position: 'absolute',
      zIndex: 100,
      border: `1px solid #007bff`,
      cursor:'move',
    },
    controls: {
      position: 'absolute',
      right: 0,
      display: 'inline-block',
      backgroundColor: '#fff',
      // borderRadius: 4,
    },
    content: {
      width:'fit-content',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      background:'transparent',
      padding:'15px',
    },
    smallButton: {
      display: 'inline-block',
      cursor: 'pointer',
      padding: 4,
    }
  }
  return (
    <Draggable onStop={onEnd}>
      <div style={styles.container}>
        <div style={styles.controls}>
          <div style={styles.smallButton} onClick={onSet}><FaCheck color={'green'}/></div>
          <div style={styles.smallButton} onClick={onCancel}><FaTimes color={'red'}/></div>
        </div>
        <div style={styles.content}>
          <img src={url} width={200} style={styles.img} draggable={false} alt='sign' />
        </div>
      </div>
    </Draggable>
  );
}
