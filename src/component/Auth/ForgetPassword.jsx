import React, { useState } from 'react';
import styled from 'styled-components';
import bgImage from '../../Assets/Images/large-triangles.png';
import {useNavigate } from 'react-router-dom';
import base_url from '../../Assets/API/Axios';

const ForgetPasswordContainer = styled.div`
  padding: 50px 0;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
`;

const SignUpFormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  margin-top: 100px;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media screen and (max-width:800px) {
    width: 80%;
  }
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  padding: 15px;
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
  color: #00d9ff;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px auto;
  padding: 10px;
`

const Error = styled.div`
  background: transparent;
  color: red;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px auto;
  padding: 10px;
`

function ForgetPassword() {
//   const users = JSON.parse(localStorage.getItem('doc-user'))
  const [isSuccess, setSuccess] = useState('')
  const [data,setData] = useState({email:''})
  const [isError, setIsError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const  formData = new FormData()
        formData.append('email', data.email)
        await base_url.post(`forget_password/`,formData,{
          'headers':{
            'Content-Type':'multipart/form-data'
          }
        }).then((res)=>{
          console.log(res.data);
          setSuccess(res.data.message)
          setIsError('')
        //   localStorage.setItem('doc-user',JSON.stringify(res.data))
          navigate('/Verify-otp-code', { state: { data: res.data } });
        }).catch((err)=>{
          console.log(err.response.data.error);
          setIsError(err.response.data.error)
        })
    } catch (error) {
      console.log(error);
      setIsError(error.message)
    }
  };

  return (
    <ForgetPasswordContainer>
      <SignUpFormContainer>
        <FormTitle>Enter registered email</FormTitle>
        <Form onSubmit={handleSubmit}>
          <Input type="email" placeholder="Email" onChange={(e)=>setData({...data,email:e.target.value})} required />
          {isError && <Error>{isError}</Error>}
          {isSuccess && <Success>{isSuccess}</Success>}
          <SubmitButton type="submit">Send code</SubmitButton>
        </Form>
      </SignUpFormContainer>
    </ForgetPasswordContainer>
  );
}

export default ForgetPassword;
