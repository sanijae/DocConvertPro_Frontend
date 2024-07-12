import React, { useState } from 'react';
import styled from 'styled-components';
import bgImage from '../../Assets/Images/large-triangles.png';
import { Link, useNavigate } from 'react-router-dom';
import { getUserById } from '../Redux/actions';
import base_url from '../../Assets/API/Axios';

const SignInPageContainer = styled.div`
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
const Wrapper = styled.div`
width: 100%;
background-color: transparent;
margin: 10px auto;
display: flex;
justify-content: left;
`
const Label = styled.div`
padding: 10px;
width: fit-content;
background-color: transparent;
display: flex;
align-items: center;
cursor: pointer;
font-size: 1em;
color: #007bff;

/* &:hover{
    background: #007bff;
    color: #fff;
} */
a{
    list-style: none;
    text-decoration: none;
    background: #007bff;
    color: #fff;
    padding: 10px;

    &:hover{
        background: #009cff;
        color: #fff;
    }
}
`
const ShowPassword = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  cursor: pointer;
  color: #007bff;
  margin-bottom: 4px;
`
const ForgetPassword = styled.div`
display: flex;
justify-content: right;
align-items: center;
background-color: transparent;
color: #007bff;
font-weight: bold;
cursor: pointer;
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

function SignInPage() {
  const [data,setData] = useState({email:'',password:''})
  const [showPass, setShowPass] = useState(false)
  const [isError, setIsError] = useState('')
  const navigate = useNavigate()


  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const  formData = new FormData()
        formData.append('email', data.email)
        formData.append('password', data.password)
        await base_url.post('login/',formData,{
          'headers':{
            'Content-Type':'multipart/form-data'
          }
        }).then((res)=>{
          console.log(res.data.user);
          getUserById(res.data.user.id)
          setIsError('')
          localStorage.setItem('doc-user',JSON.stringify(res.data))
          navigate('/')
          window.location.reload()
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
    <SignInPageContainer>
      <SignUpFormContainer>
        <FormTitle>Sign Up</FormTitle>
        <Form onSubmit={handleSubmit}>
          <Input type="email" placeholder="Email" onChange={(e)=>setData({...data,email:e.target.value})} required />
          <Input type={showPass ? 'text' : "password"} placeholder="Password" onChange={(e)=>setData({...data, password:e.target.value})} required />
          <ForgetPassword onClick={()=>navigate('/Forget-password')}>Forget password</ForgetPassword>
          <ShowPassword onClick={()=>setShowPass(!showPass)}><input type='checkbox' checked={showPass}/>Show password</ShowPassword>
          {isError && <Error>{isError}</Error>}
          <SubmitButton type="submit">Login</SubmitButton>
          <Wrapper>
            <Label>Don't have an account sign up &nbsp;<Link to='/SignUp'>here</Link></Label>
          </Wrapper>
        </Form>
      </SignUpFormContainer>
    </SignInPageContainer>
  );
}

export default SignInPage;
