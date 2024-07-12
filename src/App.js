import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'
import NavBar from './component/Navbar/Navbar';
import Footer from './component/Footer/Footer';
import Home from './Pages/Home/Home';
import AboutPage from './Pages/About/About';
import FeaturePage from './Pages/Features/FeaturePage';
import PricingPage from './Pages/Pricing/Pricing';
import BusinessSolutionPage from './Pages/Solution/Business';
import EducationSolutionPage from './Pages/Solution/Education';
import ProductPage from './Pages/Products/Product';
import DeveloperAPIPage from './Pages/API/APIPage';
import ContactPage from './Pages/Contact/Contact';
import SignUpPage from './component/Auth/SignUpPage';
import SignInPage from './component/Auth/SignInPage';
import UserProfilePage from './component/Profile/ProfilePage';
import OCRFeaturePage from './Pages/OCR/OCRPage';
import ExcelToPDF from './component/Converter/Excel-to-Pdf';
import WordToPDF from './component/Converter/Word-to_Pdf';
import PDFToExcel from './component/Converter/Pdf-to-excel';
import PDFToWord from './component/Converter/Pdf-to-word';
import CsvToPdf from './component/Converter/CsvToPdf';
import ImagesToPdf from './component/Converter/ImagesToPdf';
import PdfToCsv from './component/Converter/PdfToCsv';
import PptToPDF from './component/Converter/PptToPDF';
import PdfToPpt from './component/Converter/PdfToPpt';
import PdfToJpg from './component/Converter/PdfoJpg';
import PdfToJpeg from './component/Converter/PdfToJpeg';
import PdfToPNG from './component/Converter/PdfToPng';
import PdfToBmp from './component/Converter/PdfToBmp';
import AddWatermark from './component/PDF Editor/Add_watermark';
import AddPage from './component/PDF Editor/AddPage';
import RemovePage from './component/PDF Editor/RemovePage';
import ExtractPdf from './component/PDF Editor/ExtractPdf';
import OrganizePdf from './component/PDF Editor/OrganizePdf';
import RepairPdf from './component/PDF Editor/RepairPdf';
import RotatePdf from './component/PDF Editor/RotatePdf';
import ComparePdf from './component/Optimize PDF/ComparePdf';
import CompressPdf from './component/Optimize PDF/CompressPdf';
import MergePdf from './component/Optimize PDF/MergePdf';
import SplitPdf from './component/Optimize PDF/SplitPdf';
import CheckPdfSign from './component/PDF Security/CheckPdfSign';
import ProtectPdf from './component/PDF Security/ProtectPdf';
import UnlockPdf from './component/PDF Security/UnlockPdf';
import SignPdf from './component/PDF Security/SignPdf';
import DigitalSignature from './component/PDF Security/DigitalSignature';
import ForgetPassword from './component/Auth/ForgetPassword';
import VerifyOTP from './component/Auth/VerifyOTP';
import UpdatePassword from './component/Auth/UpdatePassword';
import { OCR } from './Pages/OCR/OCR';


function App() {

  return (
    <>
        <NavBar/>
        <div className='body'>
          <Routes>
            <Route path='/' index exact element={<Home/>} />
            <Route path='/about' element={<AboutPage/>} />
            <Route path='/Features' element={<FeaturePage/>} />
            <Route path='/Products' element={<ProductPage/>} />
            <Route path='/Pricing' element={<PricingPage/>} />
            <Route path='/Contact-us' element={<ContactPage/>} />
            <Route path='/Solution-for-business' element={<BusinessSolutionPage/>} />
            <Route path='/Solution-for-education' element={<EducationSolutionPage/>} />
            <Route path='/Optical-character-recognition' element={<ProtectedRoute element={<OCR />} />} />
            <Route path='/SignIn' element={<SignInPage/>} />
            <Route path='/SignUp' element={<SignUpPage/>} />

            {/* Protected routes */}
            <Route path="/Api-Integration" element={<ProtectedRoute element={<DeveloperAPIPage />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<UserProfilePage />} />} />
            <Route path="/forget-password" element={<ProtectedRoute element={<ForgetPassword />} />} />
            <Route path="/verify-otp-code" element={<ProtectedRoute element={<VerifyOTP />} />} />
            <Route path="/update-password" element={<ProtectedRoute element={<UpdatePassword />} />} />
            
            {/* Converters */}
            <Route path="/pdf_to_word" element={<ProtectedRoute element={<PDFToWord />} />} />
            <Route path="/pdf_to_excel" element={<ProtectedRoute element={<PDFToExcel />} />} />
            <Route path="/pdf_to_ppt" element={<ProtectedRoute element={<PdfToPpt />} />} />
            <Route path="/pdf_to_jpg" element={<ProtectedRoute element={<PdfToJpg />} />} />
            <Route path="/pdf_to_jpeg" element={<ProtectedRoute element={<PdfToJpeg />} />} />
            <Route path="/pdf_to_png" element={<ProtectedRoute element={<PdfToPNG />} />} />
            <Route path="/pdf_to_bmp" element={<ProtectedRoute element={<PdfToBmp />} />} />
            <Route path="/pdf_to_csv" element={<ProtectedRoute element={<PdfToCsv />} />} />
            <Route path="/csv_to_pdf" element={<ProtectedRoute element={<CsvToPdf />} />} />
            <Route path="/image_to_pdf" element={<ProtectedRoute element={<ImagesToPdf />} />} />
            <Route path="/ppt_to_pdf" element={<ProtectedRoute element={<PptToPDF />} />} />
            <Route path="/excel_to_pdf" element={<ProtectedRoute element={<ExcelToPDF />} />} />
            <Route path="/word_to_pdf" element={<ProtectedRoute element={<WordToPDF />} />} />
            <Route path="/add_watermark" element={<ProtectedRoute element={<AddWatermark />} />} />
            <Route path="/add_page" element={<ProtectedRoute element={<AddPage />} />} />
            <Route path="/remove_page" element={<ProtectedRoute element={<RemovePage />} />} />
            <Route path="/extract_pdf" element={<ProtectedRoute element={<ExtractPdf />} />} />
            <Route path="/organize_pdf" element={<ProtectedRoute element={<OrganizePdf />} />} />
            <Route path="/repair_pdf" element={<ProtectedRoute element={<RepairPdf />} />} />
            <Route path="/rotate_pdf" element={<ProtectedRoute element={<RotatePdf />} />} />
            <Route path="/compare_pdf" element={<ProtectedRoute element={<ComparePdf />} />} />
            <Route path="/compress_pdf" element={<ProtectedRoute element={<CompressPdf />} />} />
            <Route path="/merge_pdf" element={<ProtectedRoute element={<MergePdf />} />} />
            <Route path="/split_pdf" element={<ProtectedRoute element={<SplitPdf />} />} />
            <Route path="/verify_digital_signature" element={<ProtectedRoute element={<CheckPdfSign />} />} />
            <Route path="/protect_pdf" element={<ProtectedRoute element={<ProtectPdf />} />} />
            <Route path="/unlock_pdf" element={<ProtectedRoute element={<UnlockPdf />} />} />
            <Route path="/digital_signature" element={<ProtectedRoute element={<DigitalSignature />} />} />
            <Route path="/sign_pdf" element={<ProtectedRoute element={<SignPdf />} />} />
          </Routes>
        </div>
        <Footer/>
    </>
  );
}

export default App;

const isAuthenticated = () => {
  return !!localStorage.getItem('doc-user');
};

export const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/SignIn" />;
};
