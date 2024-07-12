import React, { useEffect } from 'react';
import './About.css';

function AboutPage() {
  useEffect(() => {
    document.title = 'About Us';
  }, []);
  
  return (
    <>
    <div className="about-page">
      <div className='about-wrapper'>
        <div className="about-content">
          <h1>About DocConvertPro</h1>
          <p>DocConvertPro is a versatile document conversion tool designed to meet all your document management needs. Whether you need to organize, optimize, convert, edit, secure, perform OCR, or integrate with other applications via APIs, DocConvertPro has you covered.</p>
          
          <h2>Key Features</h2>
          <ul>
            <li>PDF Optimizer: Reduce PDF file size while maintaining quality, making them easier to share and store.</li>
            <li>Convert to PDF: Convert various file formats like DOCX, TXT, and ODT to PDF with just a few clicks.</li>
            <li>Convert from PDF: Convert PDF files to other formats like DOCX, TXT, and ODT, maintaining formatting and layout.</li>
            <li>Edit PDF: Add annotations, highlight text, add watermarks, and merge multiple PDFs with ease.</li>
            <li>PDF Security: Protect your sensitive documents with password protection, encryption, and digital signatures.</li>
            <li>OCR (Optical Character Recognition): Extract text from images and scanned documents for further processing.</li>
            <li>API Integrations: Seamlessly integrate DocConvertPro with other applications via APIs for automated document management workflows.</li>
          </ul>
          
          <h2>Why Choose DocConvertPro?</h2>
          <p>DocConvertPro stands out from other document conversion tools for its user-friendly interface, powerful features, and reliable performance. Whether you're a business professional, student, or freelancer, DocConvertPro provides the tools you need to efficiently manage your documents and streamline your workflow.</p>
          
          <h2>Contact Us</h2>
          <p>If you have any questions, feedback, or suggestions, we'd love to hear from you! Contact our support team at support@docconvertpro.com or visit our website for more information.</p>
        </div>
      </div>
    </div>
    {/* <Footer/> */}
    </>
  );
}

export default AboutPage;
