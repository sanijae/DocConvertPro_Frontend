import React, { useEffect } from 'react';
import styled from 'styled-components';
import FeatureSection from './FeatureSection';
import pdfOptimizerIcon from '../../Assets/Images/time-management.png';
import convertToPdfIcon from '../../Assets/Images/conv.jpeg';
import convertFromPdfIcon from '../../Assets/Images/pngegg.png';
import editPdfIcon from '../../Assets/Images/pngegg (2).png';
import pdfSecurityIcon from '../../Assets/Images/bucket-list.png';
import ocrIcon from '../../Assets/Images/oocr.png';
import apiIntegrationsIcon from '../../Assets/Images/7015995.jpg';
import Hero from './Hero';

const FeaturesPageWrapper = styled.div`
  padding: 50px 0;
  background-color: #fff;
`;

const FeatureSections = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;

  @media screen and (max-width: 800px) {
    .feature-section {
      flex-direction: column-reverse;
      background: transparent;
    }
  }
`;

function FeaturesPage() {
  useEffect(() => {
    document.title = 'App features';
  }, []);
  return (
    <FeaturesPageWrapper>
      <Hero/>
      <FeatureSections>
        <FeatureSection
          icon={pdfOptimizerIcon}
          reverse={false}
          bgColor={'#edf5fc'}
          title="PDF Optimizer"
          description="Compress and optimize your PDF files to reduce file size while maintaining quality. This feature helps you save storage space and make file sharing easier."
        />
        <FeatureSection
          icon={convertToPdfIcon}
          reverse={true}
          bgColor={'#faf4f7'}
          title="Convert to PDF"
          description="Convert various file formats (e.g., DOCX, TXT, ODT) to PDF format. With this feature, you can easily create PDF documents from your existing files."
        />
        <FeatureSection
          icon={convertFromPdfIcon}
          reverse={false}
          bgColor={'#e3e7f7'}
          title="Convert from PDF"
          description="Convert PDF files to other formats such as DOCX, TXT, and ODT. This feature allows you to extract content from PDFs for further editing and use."
        />
        <FeatureSection
          icon={editPdfIcon}
          reverse={true}
          title="Edit PDF"
          description="Edit your PDF files by adding annotations, text, images, and shapes. This feature enables you to customize your PDF documents according to your needs."
        />
        <FeatureSection
          icon={pdfSecurityIcon}
          reverse={false}
          bgColor={'#f1f2f2'}
          title="PDF Security"
          description="Protect your PDF files with password encryption, permissions, and digital signatures. This feature ensures the confidentiality and integrity of your sensitive documents."
        />
        <FeatureSection
          icon={ocrIcon}
          reverse={true}
          bgColor={'#f1e7ec'}
          title="OCR (Optical Character Recognition)"
          description="Extract text from images and scanned documents for further editing and processing. This feature converts scanned documents into editable text, making them searchable and editable."
        />
        <FeatureSection
          icon={apiIntegrationsIcon}
          title="API Integrations"
          description="Integrate DocConvertPro with other applications via APIs for automated workflows. This feature allows you to streamline your document management processes and improve productivity."
        />
      </FeatureSections>
    </FeaturesPageWrapper>
  );
}

export default FeaturesPage;
