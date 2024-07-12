// src/components/EducationSolutionPage.js
import React, { useEffect } from 'react';
import styled from 'styled-components';
import FeatureSection from './FeatureSection';
import bgImage from '../../Assets/Images/large-triangles.png';
// import TestimonialsSection from './TestimonialsSection';

const EducationSolutionContainer = styled.div`
  padding: 50px 0;
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

function EducationSolutionPage() {

  useEffect(() => {
    document.title = 'Education solution';
  }, []);

    const handleStartTrial = () => {
        // Add logic for starting the free trial
      }; 
  return (
    <EducationSolutionContainer>
      <HeroContainer>
        <HeroTitle>Transform Your Classroom Experience</HeroTitle>
        <HeroDescription>Discover how DocConvertPro can enhance teaching and learning in your educational institution.</HeroDescription>
        {/* <Button onClick={handleStartTrial}>Start 1 Week Free Trial</Button> */}
      </HeroContainer>
      <FeaturesContainer>
      <FeatureSection
        icon={require('../../Assets/Images/undraw_Add_tasks_re_s5yj.png')}
        title="Document Conversion for Students and Educators"
        reverse={false}
        description="Convert handwritten notes and assignments, extract text from images, and convert documents to different formats for educational purposes."
      />
      <FeatureSection
        icon={require('../../Assets/Images/undraw_Annotation_re_h774.png')}
        title="PDF Organization and Management"
        reverse={true}
        description="Merge, split, and optimize PDFs, annotate and edit PDF content, and manage study materials efficiently."
      />
      <FeatureSection
        icon={require('../../Assets/Images/undraw_project_team_lc5a.png')}
        title="Digital Signatures"
        reverse={false}
        description="Digitally sign permission forms, agreements, and other important documents for educational purposes."
      />
      <FeatureSection
        icon={require('../../Assets/Images/undraw_Resume_folder_re_e0bi.png')}
        title="Document Archiving"
        reverse={true}
        description="Efficiently manage and organize educational materials, research papers, and administrative documents with secure cloud-based document storage and retrieval systems."
      />
      </FeaturesContainer>
      {/* <TestimonialsContainer>
        <TestimonialsSection />
      </TestimonialsContainer> */}
    </EducationSolutionContainer>
  );
}

export default EducationSolutionPage;
