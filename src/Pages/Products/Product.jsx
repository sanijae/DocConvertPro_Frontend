// src/components/ProductPage.js
import React, { useEffect } from 'react';
import styled from 'styled-components';
import FeatureSection from './FeatureSection';
import bgImage from '../../Assets/Images/large-triangles.png'

const ProductPageContainer = styled.div`
  padding-top: 50px;
  padding: 10px 0;
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

const ToolsContainer = styled.div`
  padding: 50px 0;
  background-color: #fff;
`;

function ProductPage() {
  useEffect(() => {
    document.title = 'Product';
  }, []);
  
  return (
    <ProductPageContainer>
      <HeroContainer>
        <HeroTitle>Discover Our Powerful Tools</HeroTitle>
        <HeroDescription>Explore a range of features designed to simplify document management and enhance productivity.</HeroDescription>
      </HeroContainer>
      <ToolsContainer>
        <FeatureSection/>
      </ToolsContainer>
    </ProductPageContainer>
  );
}

export default ProductPage;
