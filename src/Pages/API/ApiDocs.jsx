import React from 'react';
import styled from 'styled-components';
import { Endpoints } from './docs_data';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 50px 20px;
`;
const Sections = styled.div`
  padding-top: 70px;

`;
const SectionContainer = styled.div`
  margin-bottom: 40px;
`;

const SectionHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;
const SectionTitle = styled.h5`
  font-size: 24px;
`;

const Description = styled.p`
  margin-bottom: 10px;
`;

const CodeBlock = styled.pre`
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 5px;
  overflow-x: auto;
`;

const ApiDocumentation = ({api_key}) => {
  return (
    <PageContainer>
      <Sections>
      <SectionContainer>
        <SectionHeader>Developer API Documentation</SectionHeader>
        <Description>
          Welcome to the developer documentation for our API. Here, you'll find all the information you need to integrate and use our API endpoints for document conversion services. Each endpoint allows you to convert documents between various formats. Please ensure you include the Api-Key in the request headers for authentication.
        </Description>
        <Description>
          Your Api Key: &nbsp; <code>{api_key}</code>
        </Description>
      </SectionContainer>
      <SectionContainer>
        <SectionHeader>Base URL and Authentication</SectionHeader>
        <Description>
          <strong>Base URL:</strong> All endpoints are relative to the base URL:
        </Description>
        <CodeBlock>
          https://api.yourdomain.com/
        </CodeBlock>
        <Description>
          <strong>Authentication:</strong> All requests require an Api-Key header for authentication.
        </Description>
        <CodeBlock>
          Api-Key: YOUR_API_KEY
        </CodeBlock>
      </SectionContainer>
      <SectionContainer>
        <SectionHeader>Error Codes</SectionHeader>
        <Description>
          400 Bad Request: The request was invalid or cannot be served.
        </Description>
        <Description>
          401 Unauthorized: The request requires user authentication.
        </Description>
        <Description>
          403 Forbidden: The server understood the request, but refuses to authorize it.
        </Description>
        <Description>
          404 Not Found: The requested resource could not be found.
        </Description>
        <Description>
          500 Internal Server Error: An error occurred on the server side.
        </Description>
      </SectionContainer>
      <SectionHeader>API Endpoints</SectionHeader>
      {Endpoints.map((doc,i)=>{
        return(
          <SectionContainer key={i}>
            <SectionTitle> <strong>{doc.title}</strong></SectionTitle>
            {/* Repeat the following pattern for each endpoint */}
            <Description>
              <strong>{doc.end_title}</strong> {doc.end_url}
            </Description>
            <Description>
              <strong>{doc.desc_title}</strong> {doc.desc_content}
            </Description>
            <Description>
              <strong>{doc.req_header}</strong>
            </Description>
            <CodeBlock>
             {doc.req_url}
            </CodeBlock>
            <Description>
              <strong>{doc.req_param}</strong>
            </Description>
            <CodeBlock>
              {doc.req_par_content}
            </CodeBlock>
            <Description>
              <strong>{doc.req_body}</strong>
            </Description>
            <CodeBlock>
              {doc.req_body_file}
            </CodeBlock>
            <Description>
              <strong>{doc.res_title}</strong>
            </Description>
            <CodeBlock>
             {doc.res_content}
            </CodeBlock>
            <Description>{doc.example_use_title}</Description>
            <CodeBlock>
              {doc.example_use_content}
            </CodeBlock>
          </SectionContainer>
        )
      })}
      </Sections>
    </PageContainer>
  );
};

export default ApiDocumentation;
