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
  margin-bottom: 40px;
`;

// const Button = styled.button`
//   background-color: #007bff;
//   color: #fff;
//   padding: 15px 30px;
//   font-size: 1.2rem;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #fff;
//     color: #0056b3;
//   }
// `;

function Hero() {
  
  return (
    <HeroContainer>
      <HeroTitle>Welcome to DocConvertPro</HeroTitle>
      <HeroDescription>A powerful tool for all your document management needs. Explore our pricing below.</HeroDescription>
      {/* <Button onClick={handleStartTrial}>Start 1 Week Free Trial</Button> */}
    </HeroContainer>
  );
}

export default Hero;
