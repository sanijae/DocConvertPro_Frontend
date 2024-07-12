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
    width: 100%;
  }
`;

const FeatureText = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;

  @media screen and (max-width:700px){
    width: 100%;
  }
`;

const FeatureTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
`;

function FeatureSection({ icon, title, description , reverse,bgColor}) {
  return (
    <FeatureSectionContainer reverse = {reverse} bgColor={bgColor}>
      <Icon src={icon} alt="Icon" />
      <FeatureText>
        <FeatureTitle>{title}</FeatureTitle>
        <FeatureDescription>{description}</FeatureDescription>
      </FeatureText>
    </FeatureSectionContainer>
  );
}

export default FeatureSection;
