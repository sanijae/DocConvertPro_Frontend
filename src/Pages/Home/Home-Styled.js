import { Link } from 'react-router-dom';
import styled from 'styled-components';
import bgImage from '../../Assets/Images/large-triangles.png'

export const LandingPageContainer = styled.div`
  /* text-align: center; */
  color: #000;
`;

export const HeroSection = styled.header`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  color: #fff;
  padding-top: 150px;
  padding-bottom: 20px;
  text-align: center;
`;
export const HeroTitle = styled.h1`
   font-size: 3rem;
  margin-bottom: 20px;
`;

export const HeroDescription = styled.p`
  font-size: 1.5rem;
  margin: 40px auto;
`;
export const ButtonContainer = styled.div`
width: 100%;
display: flex;
justify-content: space-around;
align-items: center;
margin: 10px auto;
`;
export const FeatureSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  margin: 50px auto;
  background-color: ${({bgColor})=>(bgColor ? bgColor : '#fff')};
`;
export const FeatureHeader = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 50px;
`;
export const FeatureIcon = styled.img`
width: 80px;
height: 80px;
border: none;
border-radius: 10px;
object-fit: cover;
`
export const FeatureTitle = styled.p`
font-weight: bold;
  font-size: 1.5rem;
`;

export const FeatureSubTitle = styled.p`
  font-size: 1rem;
`;

export const FeatureContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5,20%);
  flex-wrap: wrap;

  @media screen and (max-width:1000px) {
    grid-template-columns: repeat(3,33.3%);
  }
  @media screen and (max-width:800px) {
    grid-template-columns: repeat(2,50%);
  }
`;

export const Feature = styled.div`
  padding: 20px;
  margin: 5px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  background-color: ${({bgColor})=>(bgColor ? bgColor : '#fff')};
`;

export const FeatureTitle2 = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

export const FeatureDescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 20px;
`;

export const FeatureButton = styled(Link)`
  display: inline-block;
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  font-size: 1rem;
  text-decoration: none;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;
