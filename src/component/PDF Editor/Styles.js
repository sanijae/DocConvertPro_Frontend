import styled from 'styled-components'
import { IoIosCloudUpload, IoIosArrowDropleftCircle } from "react-icons/io";
// import bgImage from '../../Assets/Images/large-triangles.png';

export const PdfToWordPageContainer = styled.div`
  background-color: #fff;
  color: #fff;
`;

export const ConversionForm = styled.div`
  width: 100%;
  margin-top: 70px;
  /* padding-top: 20px; */
  background-color: transparent;
  display: flex;
  flex-direction: column;

  @media screen and (max-width:1100px) {
    margin-top: 96px;
  }
  @media screen and (max-width:800px) {
    margin-top: 70px;
  }
`;

export const DownloadWrapper = styled.div`
  background-color: transparent;
  padding: 20px;
  display: flex;
  width: 90%;
  background-color: #F4F7FB;
  flex-direction: column;
  align-items: center;
  margin: 50px auto;
`
export const DownloadButton = styled.button`
  border: none;
  color: #fff;
  background-color: #0056b3;
  font-weight: bold;
  padding: 20px;
  font-size: 1.5rem;
  cursor: pointer;
  width: 60%;
  border-radius: 10px;

  &:hover{
    color: #fff;
    background-color: #007bff;
  }
`
export const Dropzone = styled.div`
width: 80%;
min-height: 50%;
padding: 20px;
display: flex;
flex-direction: column;
align-items: center;
margin: 50px auto;
background: #F4F7FB;
color: #007bff;
`
export const FormTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
  color: #007bff;
`;

export const FileInputContainer = styled.label`
  display: inline-block;
  margin: 10px auto;
  position: relative;
  cursor: pointer;
  padding: 30px 10px;
  border-radius: 10px;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  color: #0056b3;

  &:hover{
    background-color: #fff;
    color: #007bff;
    border: 1px solid #007bff;
  }
`;

export const FileInputLabel = styled.label`
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  cursor: pointer;
`;

export const FileInput = styled.input.attrs({ type: 'file' })`
  display: none;
  width: 100%;
`;
export const UploadIcon = styled(IoIosCloudUpload)`
  font-size: 24px;
`;

export const UploadText = styled.span`
  font-size: 1.5rem;
  margin-left: 8px;
`;

export const Error = styled.div`
padding: 20px;
color: red;
display: flex;
align-content: center;
font-weight: bold;
font-size: 14px;
`
export const RefreshButton = styled.div`
color: #0056b3;
background-color: #fff;
font-size: 17px;
font-weight: bold;
display: flex;
cursor: pointer;
align-items: center;
padding: 20px;
width:80%;
border-radius: 20px;
justify-content: space-between;
margin: 10px auto;
`

export const RefreshIcon = styled(IoIosArrowDropleftCircle)`
  font-size: 24px;
`;

export const Container = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
background-color: #F4F7FB;

@media screen and (max-width:800px){
  flex-direction: column;
  justify-content: center;
}
`
export const Content = styled.div`
display: flex;
justify-content: center;
padding: 20px;
width: 90%;
position: relative;
background-color: transparent;

@media screen {
  width: 100%;
  padding: 0px;
}
`
export const PreviewContainer = styled.div`
display: flex;
justify-content: center;
align-items: flex-start;
padding: 20px;
background-color: transparent;
color: #000;
`
export const Preview = styled.div`
display: flex;
margin: 20px 10px;
/* margin-left: 30px; */
padding: 10px;
background-color: #fff;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`
export const PreviewImage = styled.img`
max-width: 10em;
`
export const IconWrapper = styled.div`
  background: #007bff;
  padding: 20px;
  border-radius: 50%;
  margin: 20px auto;
  display: none;
  cursor: pointer;

  @media screen and (max-width:800px){
    margin-left: 20px;
  }
`;
export const AddContainer = styled.div`
position: absolute;
background: transparent;
left: 30px;
top: 20px;
padding: 10px;

&:hover ${IconWrapper} {
    display: flex;
    align-items: flex-start;
  }

  @media screen and (max-width:800px){
    display: flex;
  }
`
export const AddIcon = styled.div`
  font-size: 17px;
  color: #fff;
`;

export const AddButton = styled.div`
  background: #007bff;
  padding: 20px;
  border-radius: 50%;
  margin: 20px auto;
  cursor: pointer;
`;

export const Form = styled.form`
width: 300px;
min-height: 80vh;
background-color: #fff;
padding: 20px;
display: flex;
justify-content: left;
flex-direction: column;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

@media screen and (max-width:800px){
  width: 100%;
  padding: 20px 0px;
  min-height: fit-content;
  display: flex;
  justify-content: center;
}
`
export const Spacer = styled.div`
display: flex;
flex-grow: 1;

@media screen and (max-width:800px) {
  display: none;
}
`
export const Group = styled.div`
display: flex;
flex-direction: column;
background-color: transparent;
width: 90%;
justify-content: left;
align-items: center;
padding: 10px;
`
export const Row = styled.div`
display: flex;
width:100%;
justify-content: space-around;
background: transparent;
`
export const Label = styled.div`
font-size: 1rem;
width: 100%;
color: #007bff;
margin: 10px auto;
text-align: left;
`
export const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  width: 90%;
  border: 1px solid rgba(0,0,0,.2);
  outline: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  background-color: #fff;
  color: #0056b3;

  &:focus{
    outline: none;
  }
`

export const FileTitle = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0,0,0,.5);

  @media screen and (max-width:800px){
    padding: 20px;
  }
`;


export const FileName = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  color: #007bff;
  margin: 20px auto;
`;

export const SubmitButton = styled.button`
  padding: 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 20px auto;
  width: 100%;
  font-size: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #fff;
    color: #007bff;
    border: 1px solid #007bff;
  }

  @media screen and (max-width:800px){
    width: 80%;
  }
`;
export const DisableButton = styled.button`
  padding: 15px;
  background-color: #fff;
  color: #007bff;
  border: 1px solid #007bff;
  opacity: 0.8;
  border-radius: 5px;
  cursor: not-allowed;
  margin: 20px auto;
  width: 100%;
  font-size: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #fff;
    color: #007bff;
    border: 1px solid #007bff;
  }

  @media screen and (max-width:800px){
    width: 80%;
  }
`;

