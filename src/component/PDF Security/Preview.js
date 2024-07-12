import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import pdfjs from 'pdfjs-dist';


function Preview() {
    const [images, setImages] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
  
    const onDrop = (acceptedFiles) => {
      const file = acceptedFiles[0];
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const typedArray = new Uint8Array(fileReader.result);
        const pdf = await pdfjs.getDocument(typedArray).promise;
        const numPages = pdf.numPages;
        const page = await pdf.getPage(pageNumber);
        const scale = 1.5;
        const viewport = page.getViewport({ scale });
  
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
  
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
  
        await page.render(renderContext).promise;
        const image = canvas.toDataURL('image/png');
        setImages([image]);
      };
      fileReader.readAsArrayBuffer(file);
    };
  
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
  
    return (
      <div>
        <div {...getRootProps()} style={dropzoneStyles}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop a PDF file here, or click to select one</p>
        </div>
        {images.length > 0 && (
          <div style={previewStyles}>
            <img src={images[0]} alt="PDF Preview" style={{ maxWidth: '100%' }} />
          </div>
        )}
      </div>
    );
  }
  
  const dropzoneStyles = {
    border: '2px dashed #ccc',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
  };
  
  const previewStyles = {
    marginTop: '20px',
  };
  
  export default Preview;
  