import React from 'react';
import styled from 'styled-components';

const SectionContainer = styled.div`
 display: flex;
  width: 100%;
  background-color: ${({bgColor})=>(bgColor ? bgColor : '#fff')};
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;
  flex-direction: ${({reverse})=>(reverse ? 'row-reverse':'row')};

  @media screen and (max-width:700px){
    flex-direction: column-reverse;
  }
`;



const Icon = styled.img`
  width: 500px;
  margin: 0 auto 20px;
  background-size: cover;
  padding: 20px;

  @media screen and (max-width:700px){
    width: 70%;
  }
`;

const SectionText = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  width: 500px;

  @media screen and (max-width:700px){
    width: 70%;
    padding: 30px;
    background-color: transparent;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  text-align: left;
  width: 100%;
  padding-left: 30px;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  text-align: left;
  width: 100%;
  padding-left: 30px;
`;

function FeatureSection({ icon, title, description,reverse }) {
  return (
    <SectionContainer reverse={reverse}>
      <Icon src={icon} alt="Feature Icon" />
      <SectionText>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </SectionText>
    </SectionContainer>
  );
}

export default FeatureSection;
