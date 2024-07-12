import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import styled from 'styled-components'

const Loading = ({ text = 'Please wait' }) => {
  return (
    <Wrapper>
      <Container>
        <LoadingIcon>
            <FaSpinner/>
        </LoadingIcon>
        <LoadingText>{text}</LoadingText>
      </Container>
    </Wrapper>
  );
};

export default Loading;
const Wrapper = styled.div`
width: 100%;
margin: 100px auto;
display: flex;
justify-content: center;
align-items: center;
`
const Container = styled.div`
padding: 20px;
margin: 10px auto;
display: flex;
flex-direction: column;
`
const LoadingIcon = styled.div`
font-size: 3em;
margin: 50px auto;
color: #007bff;
width: 100%;
animation: spin 2s infinite;

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`
const LoadingText = styled.div`
 font-size: 1.5rem;
 font-weight: bold;
 color: #007bff;
`