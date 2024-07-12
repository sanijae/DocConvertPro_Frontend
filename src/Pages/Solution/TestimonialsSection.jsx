import React from 'react';
import styled from 'styled-components';

const SectionContainer = styled.div`
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const Testimonial = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
`;

const Quote = styled.p`
  font-size: 1.4rem;
  font-style: italic;
  margin-bottom: 10px;
`;

const Author = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

function TestimonialsSection() {
  return (
    <SectionContainer>
      <h2>Testimonials</h2>
      <Testimonial>
        <Quote>"DocConvertPro has greatly improved our document management process. It's user-friendly and offers powerful features that meet our business needs."</Quote>
        <Author>- John Doe, CEO at XYZ Corporation</Author>
      </Testimonial>
      <Testimonial>
        <Quote>"We've been using DocConvertPro for years and couldn't be happier. It's reliable, secure, and has helped us streamline our workflows effectively."</Quote>
        <Author>- Jane Smith, Operations Manager at ABC Company</Author>
      </Testimonial>
      {/* Add more testimonials as needed */}
    </SectionContainer>
  );
}

export default TestimonialsSection;
