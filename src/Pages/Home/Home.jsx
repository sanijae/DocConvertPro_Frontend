import React from 'react';
import { LandingPageContainer,HeroSection,HeroTitle,HeroDescription,FeatureSection,
  FeatureTitle,FeatureContainer,Feature, FeatureIcon } from './Home-Styled';
import { FeatureData } from './Data';
import ChooseCard from './ChooseCard'
// import FileUploader from './Inputs'
import CardContainer from './CardContainer'
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate()
  return (
    <LandingPageContainer>
      <HeroSection bgColor='e0e6ee'>
        <HeroTitle>A powerful tool for all your document conversion needs.</HeroTitle>
        <HeroDescription>Merge, split, compress, convert, secure, unlock and watermark PDFs with just a few clicks.</HeroDescription>
        {/* <ButtonContainer>
          <FileUploader/>
        </ButtonContainer> */}
        {/* <CTAButton to="/pdf-organizer">Get Started</CTAButton> */}
      </HeroSection>
      <FeatureSection>
        {/* <FeatureHeader >All Products</FeatureHeader> */}
        <FeatureContainer>
          {FeatureData.map((feature,i)=>{
            return(
              <Feature key={i} onClick={()=>navigate(feature.link)}>
                {/* <FeatureTitle>{feature.title}</FeatureTitle> */}
                <FeatureIcon alt={feature.title} src={feature.icon} />
                <FeatureTitle>{feature.title}</FeatureTitle>
                {/* <FeatureDescription>{feature.subtitle}</FeatureDescription> */}
              </Feature>
            ) 
          })}
        </FeatureContainer>
      </FeatureSection>
      {/* <CardContainer/> */}
      <ChooseCard/>
      {/* <Footer/> */}
    </LandingPageContainer>
  );
}

export default Home;
