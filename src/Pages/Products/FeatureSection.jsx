import React from 'react';
import styled from 'styled-components';
import { FeatureData } from '../Home/Data';
import { useNavigate } from 'react-router-dom';

const FeatureContainer = styled.div`
  display: grid;
  background: transparent;
  padding: 30px;
  grid-template-columns: repeat(4,25%);
  flex-wrap: wrap;

  @media screen and (max-width:1000px) {
    grid-template-columns: repeat(3,33.3%);
  }
  @media screen and (max-width:800px) {
    grid-template-columns: repeat(2,50%);
  }
`;

const Feature = styled.div`
  padding: 20px;
  margin: 5px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  background-color: ${({bgColor})=>(bgColor ? bgColor : '#f8f9fa')};
`;
const Icon = styled.img`
  width: 80px;
  height: 80px;
  border: none;
  border-radius: 10px;
  object-fit: cover;
`;

const Title = styled.h2`
  font-size: 1.5rem;
`;


function FeatureSection() {
  const navigate = useNavigate()
  return (
    <FeatureContainer>
        {FeatureData.map((feature,i)=>{
            return(
                <Feature key={i} onClick={()=>navigate(feature.link)}>
                    <Icon src={feature.icon} alt="Feature Icon" />
                    <Title>{feature.title}</Title>
                </Feature>
            )
        })}
      
    </FeatureContainer>
  );
}

export default FeatureSection;
