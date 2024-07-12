// src/components/FeatureSection.js
import React from 'react';
import styled from 'styled-components';

const FeatureSectionContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: ${({bgColor})=>(bgColor ? bgColor : '#fff')};
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;
  flex-direction: ${({reverse})=>(reverse ? 'row-reverse':'row')};

  @media screen and (max-width:900px){
    flex-direction: column-reverse;
  }
`;

const Icon = styled.img`
  width: 400px;
  margin: 0 auto 20px;
  background-size: cover;
  padding: 20px;

  @media screen and (max-width:700px){
    width: 70%;
  }
`;

const FeatureText = styled.div`
  padding: 30px 50px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  width: 500px;

  @media screen and (max-width:700px){
    width: 70%;
    padding: 50px;
  }
`;

const FeatureTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  width: 100%;
  text-align: left;
`;

const FeatureDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  width: 100%;
  text-align: left;
`;
const Button = styled.a`
  display: inline-block;
  background-color: transparent;
  color: #3f7efd;
  padding: 15px 40px;
  font-size: 1rem;
  text-decoration: none;
  border-radius: 5px;
  width: 100%;
  text-align: left;
  transition: background-color 0.3s ease;

  &:hover {
   font-weight: bold;
  }
  @media screen and (max-width:700px){
    width: 100%;
    background-color: transparent;
  }
`;

function FeatureSection({ icon, title, description , reverse,bgColor,button,link}) {
  return (
    <FeatureSectionContainer reverse = {reverse} bgColor={bgColor}>
      <Icon src={icon} alt="Icon" />
      <FeatureText>
        <FeatureTitle>{title}</FeatureTitle>
        <FeatureDescription>{description}</FeatureDescription>
       {button && <Button href={`/${link}`}>{button}</Button>}
      </FeatureText>
    </FeatureSectionContainer>
  );
}

export default FeatureSection;
