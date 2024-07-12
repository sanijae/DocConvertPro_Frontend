import React, { useEffect } from 'react';
import FeatureSection from './FeatureSection';
import { 
  FeaturesContainer, HeroContainer, HeroDescription, HeroTitle, OCRFeaturePageContainer} from './Styled'
import { OCR } from './OCR';

export default function OCRFeaturePage() {

  useEffect(() => {
    document.title = 'OCR';
  }, []); 
    
  return (
    <OCRFeaturePageContainer>
      <HeroContainer>
        <HeroTitle>Unlock the Power of OCR</HeroTitle>
        <HeroDescription>Extract text from images and scanned documents for further editing and processing with our OCR feature.</HeroDescription>
        {/* <Button onClick={handleStartTrial}>Get Started</Button> */}
      </HeroContainer>
      <FeaturesContainer>
        <FeatureSection
          icon={require('../../Assets/Images/text.jpg')}
          title="Accurate Text Extraction"
          description="Efficiently extract text from images and scanned documents with high accuracy, enabling seamless integration into your applications."
        />
        <FeatureSection
          icon={require('../../Assets/Images/kindpng_311825.png')}
          title="Multiple Language Support"
          reverse={true}
          description="Recognize text in various languages, ensuring compatibility with a diverse range of documents and content types."
        />
        <FeatureSection
          icon={require('../../Assets/Images/APi7100345.jpg')}
          title="Easy Integration"
          bgColor={'#fff'}
          button={'Learn more'}
          link={'Api-integration'}
          description="Integrate our OCR feature into your applications using our simple and developer-friendly API, with comprehensive documentation and support."
        />
        {/* Add more FeatureSection components for other key features */}
      </FeaturesContainer>
    </OCRFeaturePageContainer>
  );
}
