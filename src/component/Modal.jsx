import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { IoIosCloudUpload } from "react-icons/io";
import base_url from '../../Assets/API/Axios';


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
  margin-top: 50px;
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
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: transparent;
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
const Dropzone = styled.div`
width: 100%;
padding: 10px;
display: flex;
flex-direction: column;
align-items: center;
background: #F4F7FB;
color: #007bff;
`
const FormTitle = styled.h2`
  font-size: 1rem;
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
const Group = styled.div`
display: flex;
flex-direction: column;
width: 100%;
`
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


const TabsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1rem;
  color: ${props => (props.active ? '#007bff' : '#333')};
  border-bottom: 2px solid ${props => (props.active ? '#007bff' : 'transparent')};
`;
const ShowPassword = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  cursor: pointer;
  color: #007bff;
  margin-bottom: 4px;
`

const Error = styled.div`
  background: transparent;
  color: red;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  padding: 10px;
`
const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const Image = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
`

export const InfoModal = (props) => {
  const users = JSON.parse(localStorage.getItem('doc-user'))
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('email');
  const [file,setFile] = useState(null)
  const [previewUrl,setPreviewImageUrl] = useState(null)
  const {setOpen,open,} = props
  const [data,setData] = useState('')
  const [isError, setIsError] = useState('')
    
  useEffect(()=>{
    return(async()=>{
      try {
         await base_url.get(`/user/${users?.user.id}`)
         .then((res)=>{
          setUser(res.data)
          console.log(res);
         }).catch((err)=>{
          console.log(err);
         })
      } catch (error) {
        console.log(error);
      }
    })
  },[users?.user.id])

    const handleChange = (e) => {
    const text = e.target.value;
    setData(text);
    };

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
    accept: '.jpg, .png, .jpeg',
    multiple: true,
   });

   const handleConfirm = async() => {
     
    if (activeTab === 'email') {
        console.log('email');
        const formData = new FormData()
        formData.append('email',data)
        await base_url.put(`update_email/${user.id}/`,formData,{
            'headers':{
                'Content-Type':'multipart/form-data'
            }
        }).then((res)=>{
            localStorage.setItem('doc-user',JSON.stringify(res.data))
            window.location.reload()
        }).catch((err)=>{
            setIsError(err.response.data.message)
        }) 
    } else if (activeTab === 'upload') {
        console.log('upload');
        const formData = new FormData()
        formData.append('profile_image',file)
        await base_url.put(`profile_image_upload/${user.id}/`,formData,{
            'headers':{
                'Content-Type':'multipart/form-data'
            }
        }).then((res)=>{
            localStorage.setItem('doc-user',JSON.stringify(res.data))
            window.location.reload()
        }).catch((err)=>{
            setIsError(err.response.data.message)
        })
    }
  };
  

  return (
    <ModalWrapper isOpen={()=>setOpen(!open)}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Profile update</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <TabsWrapper>
            <TabButton active={activeTab === 'email'} onClick={() => setActiveTab('email')}>
              email
            </TabButton>
            <TabButton active={activeTab === 'upload'} onClick={() => setActiveTab('upload')}>
              Picture
            </TabButton>
          </TabsWrapper>
          {activeTab === 'email' && (
            <>
                <Label>Email</Label>
                <Input placeholder='Enter the email' type='email' value={data} onChange={handleChange}/>
                {isError && <Error>{isError}</Error>}
            </>
          )}
          {activeTab === 'upload' && (
            <Container> 
                <Wrapper>
                    <Dropzone {...getRootProps()} >
                        <FormTitle>Drag 'n' drop a PDF file here</FormTitle>
                        <FileInputContainer>
                            <FileInput {...getInputProps()} />
                            <UploadIcon />
                            <UploadText> Select picture </UploadText>
                        </FileInputContainer>
                    </Dropzone>
                    {previewUrl && <ImageWrapper>
                        <Image src={previewUrl} alt="Preview" />
                    </ImageWrapper>}
                    {isError && <Error>{isError}</Error>}
                </Wrapper>
            </Container>
          )}
        </ModalBody>
        <ModalFooter>
          <ModalButton secondary onClick={()=>setOpen(false)}>Cancel</ModalButton>
          <ModalButton primary onClick={handleConfirm}>Update</ModalButton>
        </ModalFooter>
      </ModalContent>
    </ModalWrapper>
  );
}

export const UpdatePasswordModal = (props) => {
  const users = JSON.parse(localStorage.getItem('doc-user'))
  const [user, setUser] = useState(null)
  const [showPass,setShowPass] = useState(false)
  const {setOpen,open,} = props
  const [data,setData] = useState({current_password:'',new_password:"",confirm_new_password:''})
  const [isError, setIsError] = useState('')
    
  useEffect(()=>{
    return(async()=>{
      try {
         await base_url.get(`/user/${users?.user?.id}`)
         .then((res)=>{
          setUser(res.data)
          console.log(res);
         }).catch((err)=>{
          console.log(err);
         })
      } catch (error) {
        console.log(error);
      }
    })
  },[users?.user?.id])
// console.log(users);
   const handleConfirm = async() => {
    setIsError('')
    if(data.new_password === data.confirm_new_password){
        const formData = new FormData()
        formData.append('password',data.current_password)
        formData.append('new_password',data.new_password)
        await base_url.put(`update_password/${user?.id}/`,formData,{
            'headers':{
                'Content-Type':'multipart/form-data'
            }
        }).then((res)=>{
            localStorage.setItem('doc-user',JSON.stringify(res.data))
            window.location.reload()
        }).catch((err)=>{
            setIsError(err.response.data.error)
            console.log(err);
        })
    }else{
      setIsError('Password mismatch')
    }
  };
  

  return (
    <ModalWrapper isOpen={()=>setOpen(!open)}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Password update</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Group>
            <Label>Current password</Label>
            <Input placeholder='Enter current password' type={showPass ? 'text' : 'password'} onChange={(e)=>setData({...data,current_password:e.target.value})}/>
          </Group>
          <Group>
            <Label>New password</Label>
            <Input placeholder='Enter new password' type={showPass ? 'text' : 'password'} onChange={(e)=>setData({...data,new_password:e.target.value})}/>
          </Group>
          <Group>
            <Label>Confirm new password</Label>
            <Input placeholder='Enter new password' type={showPass ? 'text' : 'password'} onChange={(e)=>setData({...data,confirm_new_password:e.target.value})}/>
          </Group>
          <ShowPassword onClick={()=>setShowPass(!showPass)}><input type='checkbox' checked={showPass}/>Show password</ShowPassword>
          {isError && <Error>{isError}</Error>}
        </ModalBody>
        <ModalFooter>
          <ModalButton secondary onClick={()=>setOpen(false)}>Cancel</ModalButton>
          <ModalButton primary onClick={handleConfirm}>Update</ModalButton>
        </ModalFooter>
      </ModalContent>
    </ModalWrapper>
  );
}