import React from 'react'
import styled from 'styled-components';

const Section = styled.section`
  background-color: ${({bgcolor})=>(bgcolor ? bgcolor : '#fff')};
  padding: 10px 100px;
  display: flex;
  justify-content: space-between;
  flex-direction: ${({reverse})=>(reverse ? 'row-reverse' : 'row')};
  margin-bottom: 10px;
  align-items: center;

  @media screen and (max-width:1000px){
    flex-direction: column;
  }
  @media screen and (max-width:600px){
    flex-direction: column;
    padding: 10px;
  }
`;
// const Header = styled.h2`
//   font-size: 2.5rem;
//   margin-top: 20px;
//   width: 100%;
//   text-align: center;
// `;
const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  width: 100%;
  text-align: left;
`;

const Description = styled.div`
  font-size: 1rem;
  width: 100%;
  text-align: left;
  margin: 20px auto;
`;
const ButtonContainer = styled.div`
width: 100%;
display: flex;
justify-content: left;
padding-top: 40px;
`
const Button = styled.a`
  display: inline-block;
  background-color: transparent;
  color: #3f7efd;
  padding: 15px 40px;
  font-size: 1rem;
  text-decoration: none;
  text-align: left;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #235edc;
    color: #fff;
  }
  @media screen and (max-width:700px){
    width: 100%;
    background-color: transparent;
  }
`;
const ImageCard = styled.img`
background: transparent;
padding: 10px;
width: 50%;
border: none;
border-radius: 10px;

@media screen and (max-width:1000px){
    width: 100%;
  }
`
const TextCard = styled.div`
width: fit-content;
display: flex;
justify-content: left;
flex-direction: column;
width: 50%;
align-items: center;

@media screen and (max-width:1000px){
    width: 100%;
  }
`
const Icon = styled.img`
  width: 10em;
  padding: 10px;
  cursor: pointer;
`
export default function CardContainer() {
  const reverse = true
  return (
    <>
     {/* <Header>Other Services</Header> */}
     <Section>
        <TextCard>
          <Title>Integrate DocConvertPro API into Your Workflow</Title>
          <Description>Streamline your processes by integrating DocConvertPro directly into your applications.</Description>
          <ButtonContainer>
          {/* <Button href="/api-documentation">Learn More</Button> */}
          </ButtonContainer>
        </TextCard>
        <ImageCard alt='API Integration' src={require('../../Assets/Images/7015995.jpg')} />
     </Section>
     <Section reverse = {reverse}>
        <TextCard>
          <Title>Extract Text from Images with OCR</Title>
          <Description>Utilize our Optical Character Recognition (OCR) technology to extract text from images and PDFs effortlessly. Enhance your productivity with our OCR.</Description>
          <ButtonContainer>
          {/* <Button href="/api-documentation">Try our OCR Now</Button> */}
          </ButtonContainer>
        </TextCard>
        <ImageCard alt='API Integration' src={require('../../Assets/Images/kisspng-comparison-of-optical-character-recognition-softwa-5af5b11c2867e7.0729486115260511001655.png')} />
     </Section>
     <Section bgcolor={'#f8f9fa'}>
        <TextCard>
          <Title>Simple and Transparent Pricing</Title>
          <Description>Choose the plan that fits your needs. No hidden fees. Cancel anytime.</Description>
          <ButtonContainer>
          {/* <Button href="/api-documentation">Start Now</Button> */}
          </ButtonContainer>
        </TextCard>
        <ImageCard alt='API Integration' src={require('../../Assets/Images/26564.jpg')} />
     </Section>
     {/* <Section>
        <TextCard>
          <Title>Download for your device</Title>
          <Description>Get a lightweight PDF app that helps you process heavy PDF tasks offline in seconds. On your device manage documents remotely or on the move. Turn your Android or iPhone device into a PDF Editor & Scanner to annotate, sign, and share documents with ease.</Description>
          <ButtonContainer>
          <Icon alt='Google Play Icon' src={require('../../Assets/Images/1664287128google-play-store-logo-png.png')} />
            <Icon alt='Google Play Icon' src={require('../../Assets/Images/1664287128google-play-store-logo-png.png')} />
          </ButtonContainer>
        </TextCard>
        <ImageCard alt='API Integration' src={require('../../Assets/Images/undraw_cloud_files_wmo8.png')} />
     </Section> */}
    </>
  )
}
