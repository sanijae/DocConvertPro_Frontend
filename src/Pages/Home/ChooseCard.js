import React from 'react';
import styled from 'styled-components';

const LandingPageContainer = styled.div`
  text-align: center;
  padding: 50px 0;
`;

const FeatureSection = styled.section`
  padding: 80px 0;
`;

const FeatureTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 50px;
`;

const FeatureList = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: center;
  gap: 40px;
  list-style: none;
  background-color: transparent;
`;

const FeatureItem = styled.li`
  width: auto;
  padding: 40px;
  flex: 1;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const FeatureIcon = styled.img`
  width: 80px;
  margin-bottom: 20px;
`;

const FeatureName = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 20px;
`;

const FeatureDescription = styled.p`
  font-size: 1.4rem;
`;

const ChooseCard = () => {
  return (
    <LandingPageContainer>
      <FeatureSection>
        <FeatureTitle>Why Choose DocConvertPro?</FeatureTitle>
        <FeatureList>
          <FeatureItem>
            <FeatureIcon src={require('../../Assets/Images/all-in-one.png')} alt="Icon" />
            <FeatureName>PDF Conversion</FeatureName>
            <FeatureDescription>Convert PDF files to and from various formats with ease.</FeatureDescription>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon src={require('../../Assets/Images/edit.png')} alt="Icon" />
            <FeatureName>PDF Editing</FeatureName>
            <FeatureDescription>Edit PDF files with our easy-to-use online tools.</FeatureDescription>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon src={require('../../Assets/Images/sec-pdf.png')} alt="Icon" />
            <FeatureName>Secure & Safe</FeatureName>
            <FeatureDescription>Your privacy and security are our top priorities.</FeatureDescription>
          </FeatureItem>
        </FeatureList>
      </FeatureSection>
    </LandingPageContainer>
  );
}

export default ChooseCard;
