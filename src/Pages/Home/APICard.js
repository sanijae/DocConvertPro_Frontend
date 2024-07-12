import React from 'react';
import styled from 'styled-components';

const APIIntegrationSection = styled.section`
  background-color: #f7f8fa;
  padding: 100px 0;
  display: flex;
  justify-content: space-around;
`;
const APIIntegrationTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 50px;
`;
const APIIntegrationDescription = styled.p`
  font-size: 1.5rem;
  margin-bottom: 40px;
`;

const APIIntegrationButton = styled.a`
  display: inline-block;
  background-color: #3f7efd;
  color: #fff;
  padding: 15px 40px;
  font-size: 1.5rem;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #235edc;
  }
`;

const APIIntegration = () => {
  return (
    <APIIntegrationSection>
      <APIIntegrationTitle>Integrate DocConvertPro into Your Workflow</APIIntegrationTitle>
      <APIIntegrationDescription>Streamline your processes by integrating DocConvertPro directly into your applications.</APIIntegrationDescription>
      <APIIntegrationButton href="/api-documentation">Learn More</APIIntegrationButton>
    </APIIntegrationSection>
  );
}

export default APIIntegration;
