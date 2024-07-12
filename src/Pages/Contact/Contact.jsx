// src/components/ContactPage.js
import React,{useEffect, useState} from 'react';
import styled from 'styled-components';
import bgImage from '../../Assets/Images/large-triangles.png';
import base_url from '../../Assets/API/Axios';

const ContactPageContainer = styled.div`
  padding: 50px 0;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
`;

const HeroContainer = styled.div`
  color: #fff;
  text-align: center;
  padding-top: 100px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const HeroDescription = styled.p`
  font-size: 1.5rem;
`;

const ContactFormContainer = styled.div`
  padding: 50px;
  background-color: #f9f9f9;
  width: 50%;
  border-radius: 10px;

  @media screen and (max-width:800px) {
    width: 80%;
  }
`;
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 5em;
    background-color: transparent;

    @media screen and (max-width:800px) {
    padding: 0 20px;
    width: 90%;
  }
`
const ContactFormTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  padding: 15px 30px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
const Success = styled.div`
  background: transparent;
  color: #007bff;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px auto;
  padding: 10px;
`
const Error = styled.div`
  background: transparent;
  color: red;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px auto;
  padding: 10px;
`

function ContactPage() {
  const [data, setData] = useState({ title:'',message:''});
  const [isSuccess, setIsSuccess] = useState('')
  const [isError, setIsError] = useState('')
  const users = JSON.parse(localStorage.getItem('doc-user'))
  const [user, setUser] = useState(null)

  useEffect(() => {
    document.title = 'Contact Us';
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

 const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('message', data.message);
    formData.append('email', user.email);
    formData.append('name', user.name);
    
    try {
      setIsError('')
      await base_url.post('create_contact/'+user.id+'/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res)=>{
        console.log(res);
        setIsSuccess('Message was sent successfully. Our team respond within a week ')
        setIsError('')
        setData({ title:'',message:''})
        window.location.reload()
      }).catch((err)=>{
        setIsError(err.response.data.error)
        console.log(err)
        setIsSuccess('')
      })
    } catch (error) {
      console.error('Something went wrong:', error);
      setIsError('Something went wrong:', error.message)
    }
  }

  return (
    <ContactPageContainer>
      <HeroContainer>
        <HeroTitle>Contact Us</HeroTitle>
        <HeroDescription>Have questions or need assistance? Reach out to us using the form below.</HeroDescription>
      </HeroContainer>
      <Wrapper>
        <ContactFormContainer>
            <ContactFormTitle>Send Us a Message</ContactFormTitle>
            <Form onSubmit={handleSubmit}>
            <Input type="text" placeholder="Enter title" onChange={(e)=>setData({...data,title:e.target.value})} />
            {/* <Input type="email" placeholder="Your Email" /> */}
            <TextArea rows="8" placeholder="Your Message" onChange={(e)=>setData({...data,message:e.target.value})}></TextArea>
            {isError && <Error>{isError}</Error>}
            {isSuccess && <Success>{isSuccess}</Success>}
            <SubmitButton type="submit">Send Message</SubmitButton>
            </Form>
        </ContactFormContainer>
      </Wrapper>
    </ContactPageContainer>
  );
}

export default ContactPage;
