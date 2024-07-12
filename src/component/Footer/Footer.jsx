import styled from "styled-components";
import React from 'react'
import { Link } from "react-router-dom";
import useMediaQuery from "../Navbar/useMedia";

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`
const Wrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: start;
    justify-content: space-around;

    @media screen and (max-width:600px){
        flex-direction: column;
        background-color: transparent;
    }
`
const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    justify-content: left;
`
const Title = styled.div`
    font-size: 1.5rem;
    padding: 10px;
    font-weight: bold;
    font-size: bold;
`
const Description = styled.div`
  font-size: 1rem;
  margin: 20px auto;
  padding: 10px;
`
const Header = styled.div`
    font-size: 1rem;
    font-weight: bold;
    font-size: bold;
    margin-bottom: 10px;
    padding: 10px;
`
const Links = styled(Link)`
    list-style: none;
    text-decoration: none;
    font-size: 1em;
    color: #333;
    padding: 10px;
    text-align: left;
    background-color: transparent;
`
const Button = styled.button`
    border: none;
    margin: 10px auto;
    background-color: transparent;
    width: 100%;
    display: flex;
    justify-content: left;
    align-items: center;

    &:hover{
        background-color: #007bff;
        color: #fff;
        a{
            background-color: #007bff;
            color: #fff;
        }
    }
    @media screen and (max-width:600px) {
        width: 100%;
        &:hover{
        background-color: #007bff;
        color: #fff;
        a{
            background-color: #007bff;
            color: #fff;
        }
    }
    }
`
const Section = styled.section`
  background-color: #f7f8fa;
  padding: 10px 100px;
  display: flex;
  justify-content: space-between;
  flex-direction: ${({reverse})=>(reverse ? 'row-reverse' : 'row')};
  margin-bottom: 10px;
  align-items: start;

  @media screen and (max-width:1000px){
    flex-direction: column;
    padding: 10px;
  }
`;

const TextCard = styled.div`
width: fit-content;
display: flex;
justify-content: left;
flex-direction: column;
width: 30%;
align-items: center;

@media screen and (max-width:1000px){
    width: 100%;
  }
`
const Copy  = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
    border-top: 1px solid rgba(0,0,0,.5);
    align-items: center;
`
const CopyTitle = styled.p`
    font-size: 1rem;
`
// const IconsWrapper = styled.div`
//     display: flex;
// `
// const Icon = styled.img`
//     width: 6em;
//     margin-right: 10px;
// `

export default function Footer() {
    const isMobile = useMediaQuery('(max-width: 1000px)');
  return (
    <Container>
        <Section>
        <TextCard>
          {!isMobile &&<Title>A Tool for all your document conversion needs.</Title>}
          {/* {!isMobile && <Description>Merge, split, compress, convert, secure, unlock and watermark PDFs with just a few clicks.</Description>}        */}
        </TextCard>
        <Wrapper>
            <Content>
                <Header>Solution</Header>
                <Button><Links to='/Solution-for-business'>Business</Links></Button>
                <Button><Links to='/Solution-for-education'>Education</Links></Button>
            </Content>
            <Content>
                <Header>Company</Header>
                <Button><Links to='/'>Home</Links></Button>
                <Button><Links to='/about'>About</Links></Button>
                <Button><Links to='/Contact-us'>Contact</Links></Button>
            </Content>
            <Content>
                <Header>Product</Header>
                <Button><Links to='/Api-Integration'>Developer API</Links></Button>
                <Button><Links to='/Features'>Features</Links></Button>
                <Button><Links to='/Pricing'>Pricing</Links></Button>
                <Button><Links to='/Products'>Tools</Links></Button>
            </Content>
        </Wrapper>
     </Section>
        <Copy>
            <CopyTitle>&copy; {new Date().getFullYear()}&nbsp; DocConvertPro</CopyTitle>
            {/* <IconsWrapper>
                <Icon alt='Goggle Play' src={require('../../Assets/Images/1664287128google-play-store-logo-png.png')}/>
                <Icon alt='Goggle Play' src={require('../../Assets/Images/1664287128google-play-store-logo-png.png')}/>
            </IconsWrapper> */}
        </Copy>
    </Container>
  )
}
