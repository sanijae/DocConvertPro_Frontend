import React, { useState } from 'react';
import styled from 'styled-components';
import bgImage from '../../Assets/Images/large-triangles.png';
import {useLocation, useNavigate } from 'react-router-dom';
import base_url from '../../Assets/API/Axios';

const UpdatePasswordContainer = styled.div`
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
  margin: 10px auto;
  padding: 10px;
`

function UpdatePassword() {
  const [data,setData] = useState({password:'', repeat_pass:""})
//   const users = JSON.parse(localStorage.getItem('doc-user'))
  const [isError, setIsError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const navigate  = useNavigate()
  const location = useLocation();
  const email = location.state?.email;
  const uid = location.state?.data;


  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      if(data.password === data.repeat_pass){

        const  formData = new FormData()
        formData.append('password', data.password)
        formData.append('email',email)
        await base_url.put(`change_password/${uid.user.id}/`,formData,{
          'headers':{
            'Content-Type':'multipart/form-data'
          }
        }).then((res)=>{
          console.log(res.data);
          setIsError('')
        //   localStorage.setItem('doc-user',JSON.stringify(res.data))
          navigate('/SignIn')
        }).catch((err)=>{
          console.log(err);
          setIsError(err.response.data.error)
        })
      }else{
        setIsError("password did'nt match")
      }
    } catch (error) {
      console.log(error);
      setIsError(error.message)
    }
  };
console.log(uid);
console.log(uid.user.id);
  return (
    <UpdatePasswordContainer>
      <SignUpFormContainer>
        <FormTitle>Update your password </FormTitle>
        <Form onSubmit={handleSubmit}>
          <Input type={showPass ? 'text' : "password"} placeholder="Password" onChange={(e)=>setData({...data, password:e.target.value})} required />
          <Input type={showPass ? 'text' : "password"} placeholder="Confirm Password" onChange={(e)=>setData({...data,repeat_pass:e.target.value})} required />
          <ShowPassword onClick={()=>setShowPass(!showPass)}><input type='checkbox' checked={showPass}/>Show password</ShowPassword>
          {isError && <Error>{isError}</Error>}
          <SubmitButton type="submit">Confirm</SubmitButton>
        </Form>
      </SignUpFormContainer>
    </UpdatePasswordContainer>
  );
}

export default UpdatePassword;
