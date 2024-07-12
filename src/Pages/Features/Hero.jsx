import React from 'react';
import styled from 'styled-components';
import bgImage from '../../Assets/Images/large-triangles.png';

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

function Hero() {
  return (
    <HeroContainer>
      <HeroTitle>Welcome to DocConvertPro</HeroTitle>
      <HeroDescription>A powerful tool for all your document management needs. Explore our features below.</HeroDescription>
    </HeroContainer>
  );
}

export default Hero;
