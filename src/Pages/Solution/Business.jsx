import React, { useEffect } from 'react';
import styled from 'styled-components';
import FeatureSection from './FeatureSection';
// import TestimonialsSection from './TestimonialsSection';
import bgImage from '../../Assets/Images/large-triangles.png';

const BusinessSolutionContainer = styled.div`
  padding-top: 50px 0;
  background-color: #fff;
`;

const HeroContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  color: #fff;
  text-align: center;
  padding: 100px 0;
`;
const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const HeroDescription = styled.p`
  font-size: 1.5rem;
  margin-bottom: 40px;
`;

const FeaturesContainer = styled.div`
  padding: 50px 0;
  background-color: #f9f9f9;
`;


const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 15px 30px;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #fff;
    color: #0056b3;
  }
`;


// const TestimonialsContainer = styled.div`
//   padding: 50px 0;
// `;

function BusinessSolutionPage() {

  useEffect(() => {
    document.title = 'Business solution';
  }, []);

    const handleStartTrial = () => {
        // Add logic for starting the free trial
      };
  return (
    <BusinessSolutionContainer>
      <HeroContainer>
        <HeroTitle>Streamline Your Document Management Process</HeroTitle>
        <HeroDescription>Discover how DocConvertPro can help your business achieve greater efficiency and productivity.</HeroDescription>
        {/* <Button onClick={handleStartTrial}>Start 1 Week Free Trial</Button> */}
      </HeroContainer>
      <FeaturesContainer>
        <FeatureSection
          icon={require('../../Assets/Images/undraw_two_factor_authentication_namy.png')}
          title="Enterprise-Level Security"
          reverse={false}
          description="Protect your sensitive documents with advanced encryption andaccess controls. Digitally sign contracts, agreements, and other important documents to streamline approval processes for business.."
        />
        <FeatureSection
          icon={require('../../Assets/Images/pngwingcom.png')}
          title="Customizable Workflows"
          reverse={true}
          description="Tailor DocConvertPro to your organization's unique requirements with customizable workflows and integrations."
        /> 

        <FeatureSection
        icon={require('../../Assets/Images/all-in-one.png')}
        title="Document Conversion for Professional Use"
        reverse={false}
        description="Convert contracts, proposals, and scanned documents to editable formats, and extract text from scanned documents for business purposes."
      />
      <FeatureSection
        icon={require('../../Assets/Images/edit.png')}
        title="PDF Organization and Management"
        reverse={true}
        description="Merge, split, and optimize PDFs, annotate and edit PDF content, and manage business documents efficiently."
      />
      <FeatureSection
        icon={require('../../Assets/Images/undraw_File_bundle_re_6q1e.png')}
        title="Scalability and Reliability"
        reverse={true}
        description="Enjoy the scalability and reliability of DocConvertPro's cloud-based architecture, ensuring uninterrupted service for your business."
      />
      </FeaturesContainer>
      {/* <TestimonialsContainer>
        <TestimonialsSection />
      </TestimonialsContainer> */}
    </BusinessSolutionContainer>
  );
}

export default BusinessSolutionPage;
