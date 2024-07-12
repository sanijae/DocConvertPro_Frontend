import styled from 'styled-components'
import { IoIosCloudUpload, IoIosArrowDropleftCircle } from "react-icons/io";
import Slider from 'react-slick';
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
    margin-top: 80px;
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
font-size: 17px;
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
display: flex;
flex-direction: column;
`
export const ContentContainer = styled.div`
display: flex;
justify-content:space-between;
background-color: #fff;
width: 100%;
/* position: relative; */

@media screen and (max-width:1000px){
  flex-direction: column;
  background: #fff;
}
`
export const Tabs = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
padding: 10px;
position: relative;
background: #fff;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

@media screen and (max-width:1000px){
  width: 100%;
}
`
export const TabsContent = styled.div`
background-color: #fff;
display: flex;
`
export const TabIcon = styled.div`
padding: 10px;
margin-left: 10px;
display: flex;
align-items: center;
background-color: #007bff;
color: #fff;
border-radius: 8px;
cursor: pointer;
`
export const Content = styled.div`
display: flex;
justify-content: center;
background-color: transparent;

@media screen and (max-width:1000px) {
  width: 100%;
  padding: 0;
  height: max-content;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
}
`
export const Wrapper = styled.div`
min-height: 80vh;
height: 100vh;
overflow: auto;
background-color: #fff;
padding: 20px;
display: flex;
width: 10em;
min-width: 10em;
flex-direction: column;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

@media screen and (max-width:1000px) {
  display: none;
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
export const Sliders = styled(Slider)`
background-color: transparent;
padding: 0px;
`
export const Preview = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
margin: 20px 10px;
padding: 10px;
background-color: #fff;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

/* @media screen and (max-width:800px) {
  background-color: #fff;
  flex-direction: row;
  justify-content: center;
} */
`
export const ThumbnailPreview = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
margin: 10px 10px;
padding: 10px;
background-color: transparent;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

@media screen and(max-width: 1000px) {
    width: 10em;
    padding: 0;
    margin: 0;
  }
`
export const PdfPreview = styled.div`
display: flex;
justify-content: center;
padding: 10px;
margin: 10px auto;
background-color: #fff;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

.document{
  height: max-content;
  border: 1px solid black;
  padding: 10px;
}

.page{
  background: transparent;
  height: max-content;
  border: 1px solid transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
}
@media screen and (max-width:1000px){
  width: 100%;
  height: max-content;
  background-color: transparent;
}
`
export const PdfContainer = styled.div`
display: flex;
flex-direction: column;
width: 100%;
background-color: transparent;
min-height: max-content;
height: max-content;
overflow: auto;

@media screen and (max-width:1000px){
  width: 100%;
  padding: 20px 0;
  height: max-content;
  background-color: transparent;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}
`
export const PdfImage = styled.img`
width: 100%;
`
export const PreviewImage = styled.img`
width: 10em;
`
export const TabIconWrapper = styled.div`
  background: #007bff;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  cursor: pointer;
  margin-left: 10px;
`;

export const IconWrapper = styled.div`
  background: #007bff;
  padding: 10px;
  border-radius: 50%;
  display: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 10px auto;
`;

export const AddContainer = styled.div`
display:  flex; //${({showAdd})=>(showAdd ? 'flex':'none')};
background-color: transparent;
flex-direction: column;
position: absolute;
left: 2em;
top: 7em;


&:hover{
  ${IconWrapper}{
    display: flex;
  }
}
`
export const AddIcon = styled.div`
  font-size: 20px;
  color: #fff;
`;

export const AddButton = styled.div`
  background: #007bff;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: center;
  padding: 20px;
  border-radius: 50%;
  cursor: pointer;
`;

export const Form = styled.form`
width: 90%;
height: max-content;
background-color: #fff;
padding: 20px;
display: flex;
flex-direction: column;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

@media screen and (max-width:1000px) {
  width:80%
}
`
export const FormWrapper = styled.div`
display: flex;
justify-content: center;
background-color: transparent;
width: 20%;

@media screen and (max-width:1000px){
  background-color: #fff;
  width: 100%;
}
`
export const Spacer = styled.div`
display: flex;
flex-grow: 1;

@media screen and (max-width:1000px) {
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
  width: 90%;
  border: 1px solid #ccc;
  border-radius: 5px;
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
export const TextArea = styled.textarea`
  padding: 10px;
  width: 90%;
  border: 1px solid #ccc;
  border-radius: 5px;
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

  @media screen and (max-width:1000px){
    padding: 20px;
  }
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

  @media screen and (max-width:1000px){
    width: 80%;
  }
`;

export const FormButton = styled.div`
  background: transparent;
  border: 1px dashed #007bff;
  color: #007bff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0px;
`;
export const FormContent = styled.div`
background-color: transparent;
display: flex;
justify-content: left;
width: 100%;
position: relative;
align-items: center;
`
export const SignIcon = styled.div`
font-size: 18px;
font-weight: bold;
padding: 10px;
cursor: pointer;
`
export const SignImg = styled.img`
width: 100%;
padding: 10px;
object-fit: cover;
font-weight: bold;
color: transparent;
`
export const SignText = styled.div`
font-size: 1rem;
width: 100%;
color: #007bff;
text-align: center;
`
export const SignLabel = styled.div`
font-size: 1em;
font-weight: bold;
padding: 10px;
`
export const SignButton = styled.div`
  background: #007bff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;

  &:hover{
    background-color: #fff;
    color:#007bff;
    border: 1px solid #007bff;
  }
`;

export const SignWrapper = styled.div`
  width: 100%;
  border-radius: 5px;
  color: #007bff;
`;

export const TabHeader = styled.div`
  display: flex;
`;

export const TabButton = styled.div`
  flex: 1;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #007bff;
  background-color: ${(props) => (props.active ? '#f0f0f0' : 'transparent')};
  border: none;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: ${(props) => (props.active ? '#f0f0f0' : '#f9f9f9')};
  }
`;

export const TabContent = styled.div`
  background-color: transparent;
`;
export const PageInput = styled.input`
border: 1px solid #007bff;
outline: none;
padding: 10px;
width: 50px;
font-size: 13px;
background: #f0f0f0;

&:focus{
  outline: none;
}
`
  export const DragContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    background: transparent;
  `
  export const DragControl = styled.div`
  display: flex;
  justify-content: space-between;
  opacity: 0;
  background-color: #007bff;
  padding: 10px;
  `
  export const ControlIcon = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  color: #fff;
  background: transparent;
  `
  export const DragWrapper = styled.div`
  background-color: transparent;
  width: fit-content;
  height: fit-content;
  position: absolute;
  z-index: 100;
  width: 20em;
  display: flex;
  flex-direction: column;
  transition: border-color 0.3s;

  ${props => props.isHovetransparent && `
    border: 2px dashed #007bff;
    cursor:move ;
    ${DragControl}{
      opacity: 1;
    }
  `}

  &:hover{
    ${DragControl}{
      display: flex;
    }
  }
`
  export const DraggableBox = styled.div`
    position: absolute;
    padding: 0;
    z-index: 100;
    border: 1px solid #007bff;
   `
  export const DigitalContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  margin: 0;
  background-color: #fff;
  `
  export const DigitalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 90%;
  padding: 10px;
  `
  export const DigitalInput = styled.div`
  border: none;
  padding: 10px;
  background-color: transparent;
  display: flex;
  margin: 5px 0;
  flex-direction: column;
  `
  export const DigitalSignButton = styled.button`
  padding: 15px;
  background-color: #f0f0f0;
  color: #007bff;
  text-align: left;
  border: 1px solid #007bff;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-size: 17px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f9f9f9;
    color: #007bff;
  }

  /* @media screen and (max-width:1000px){
    width: 80%;
  } */
  `