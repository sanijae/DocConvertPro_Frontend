import React, { useState } from 'react';
import styled from 'styled-components';
import bgImage from '../../Assets/Images/large-triangles.png';
import {useLocation, useNavigate } from 'react-router-dom';
import base_url from '../../Assets/API/Axios';

const VerifyOTPContainer = styled.div`
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

function VerifyOTP() {
  const [data,setData] = useState({otp:''})
  const [isError, setIsError] = useState('')
  const navigate = useNavigate()
  const location = useLocation();
  const user = location.state?.data;


  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const  formData = new FormData()
        formData.append('otp', data.otp)
        formData.append('email',user.user.email)
        await base_url.post(`verify_otp/`,formData,{
          'headers':{
            'Content-Type':'multipart/form-data'
          }
        }).then((res)=>{
          console.log(res.data);
          setIsError('')
        //   localStorage.setItem('doc-user',JSON.stringify(res.data))
        //   navigate('/Update-password')
          navigate('/Update-password', { state: { data: res.data } });
        }).catch((err)=>{
          console.log(err.response.data.error);
          setIsError(err.response.data.error)
        })
    } catch (error) {
      console.log(error);
      setIsError(error.message)
    }
  };
console.log(user);
  return (
    <VerifyOTPContainer>
      <SignUpFormContainer>
        <FormTitle>Enter the code sent to your email</FormTitle>
        <Form onSubmit={handleSubmit}>
          <Input type="text" placeholder="Enter the code" onChange={(e)=>setData({...data,otp:e.target.value})} required />
          {isError && <Error>{isError}</Error>}
          <SubmitButton type="submit">Verify</SubmitButton>
        </Form>
      </SignUpFormContainer>
    </VerifyOTPContainer>
  );
}

export default VerifyOTP;
