import React, { useEffect, useState } from 'react';
import { Nav, Container, Logo, DropButton, NavLinks, DropdownContent, NavAuth, MenuButton,Links, 
  ListItems, Title, Icon, User, UserProfileImage, LogoutButton,NameWrapper, UserTitle } from './Style-NavBar';
import { CgMenuGridO } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom';
import useMediaQuery from './useMedia';
import user_profile_image from '../../Assets/user/user_profile.png'
import base_url, { host_url } from '../../Assets/API/Axios';




const Navbar = () => {
  const users = JSON.parse(localStorage.getItem('doc-user'))
  const [user, setUser] = useState(null)
  const [showMenu,setShowMenu] =  useState(false)
  const [showSubMenu,setShowSubMenu] =  useState(false)
  const [profileImage,setProfileImage] = useState(null)
  const isDesktop = useMediaQuery('(min-width: 800px)');
  const isMobile = useMediaQuery('(max-width: 800px)');
  const navigate = useNavigate()

  useEffect(()=>{
    return(async()=>{
      try {
         await base_url.get(`/user/${users?.user?.id}`)
         .then((res)=>{
          setUser(res.data)
          var imgLink = host_url + res.data.profile_image
          setProfileImage(imgLink)
          // console.log(imgLink);
         }).catch((err)=>{
          console.log(err);
         })
        
      } catch (error) {
        console.log(error);
      }
    })
  },[users?.user?.id,profileImage])

  // console.log(profileImage)

  const handleLogout =()=>{
    try {
      localStorage.removeItem('doc-user')
      setShowMenu(!false)
      window.location.reload()
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Nav>
      <Container>
        <Logo href="/">DocConvertPro</Logo>
        <NavLinks showMenu = {showMenu}>
          {isDesktop && <>
          <Links onClick={()=>setShowSubMenu(!showSubMenu)}><Icon><CgMenuGridO/></Icon>&nbsp;All Tools</Links>
          <ListItems showSubMenu={showSubMenu}>
            <DropdownContent>
              <Title>Convert from PDF</Title>
              <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/pdf_to_word">PDF to Word</Link></li>
              <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/pdf_to_excel">PDF to Excel</Link></li>
              <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/pdf_to_ppt">PDF to PPT</Link></li>
              <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/pdf_to_csv">PDF to CSV</Link></li>
              <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/pdf_to_jpg">PDF to JPG</Link></li>
              <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/pdf_to_png">PDF to PNG</Link></li>
            </DropdownContent>
            <DropdownContent>
              <Title>Convert to PDF</Title>
              <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/word_to_pdf">Word to PDF</Link></li>
              <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/excel_to_pdf">Excel to PDF</Link></li>
              <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/ppt_to_pdf">PPT to PDF</Link></li>
              <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/csv_to_pdf">CSV to PDF</Link></li>
              <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/image_to_pdf">Image to PDF</Link></li>
             {/* <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/images_to_pdf">Images folder to PDF</Link></li> */}
              {/* <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/bmp_to_pdf">Bitmap to PDF</Link></li>  */}
              {/* <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/web_to_pdf">Web Page to PDF</Link></li> */}
            </DropdownContent>
            <DropdownContent>
              <Title>Organize PDF</Title>
              <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/extract_pdf">Extract PDF</Link></li>
              {/* <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/remove_page">Remove PDF Page</Link></li> */}
              <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/add_page">Add PDF Page</Link></li>
              <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/remove_page">Remove PDF Page</Link></li>
              <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/rotate_pdf">Rotate PDF Page</Link></li>
              <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/repair_pdf">Repair PDF</Link></li>
              <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/add_watermark">Add PDF Watermark</Link></li>
            </DropdownContent>
            <DropdownContent> 
              <Title>PDF optimizer</Title>
              <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/merge_pdf">Merge PDF</Link></li>
              {/* <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/compare_pdf">Compare PDF</Link></li> */}
              <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/split_pdf">Split pdf</Link></li>
              <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/compress_pdf">Compress PDF</Link></li>
            </DropdownContent>
            <DropdownContent>
              <Title>Secure PDF</Title>
              <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/digital_signature">Digital Signature</Link></li>
              <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/unlock_pdf">Unlock PDF</Link></li>
              <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/protect_pdf">Protect PDF</Link></li>
              {/* <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/sign_pdf">Sign PDF</Link></li> */}
              <li onClick={()=>setShowSubMenu(!showSubMenu)}><Link to="/verify_digital_signature">Verify digital sign</Link></li>
            </DropdownContent>
          </ListItems>
          <DropButton><Link to="/Optical-character-recognition">OCR</Link></DropButton>
          <DropButton><Link to="/Features">Feature</Link></DropButton>
          <DropButton><Link to="/Pricing">Pricing</Link></DropButton>
          <DropButton><Link to="/Api-Integration">API</Link></DropButton>
          </>}
          {isMobile && <>
            <DropButton onClick={()=>setShowMenu(!showMenu)}><Link to="/">Home</Link></DropButton>
            <DropButton onClick={()=>setShowMenu(!showMenu)}><Link to="/Optical-character-recognition">OCR</Link></DropButton>
            <DropButton onClick={()=>setShowMenu(!showMenu)}><Link to="/Products">Products</Link></DropButton>
            <DropButton onClick={()=>setShowMenu(!showMenu)}><Link to="/Features">Features</Link></DropButton>
            <DropButton onClick={()=>setShowMenu(!showMenu)}><Link to="/Pricing">Pricing</Link></DropButton>
            <DropButton onClick={()=>setShowMenu(!showMenu)}><Link to="/Api-Integration">API</Link></DropButton>
            <DropButton onClick={()=>setShowMenu(!showMenu)}><Link to="/Contact-us">Contact</Link></DropButton>
            <DropButton onClick={handleLogout}>Logout</DropButton>
          </>}
        </NavLinks>
        <NavAuth> 
          <MenuButton onClick={()=>setShowMenu(!showMenu)}>Menu</MenuButton>
          {user ? 
          <User>
            {!isMobile && 
            <NameWrapper>
              <UserTitle>{user?.name}</UserTitle>
              <li><LogoutButton onClick={handleLogout}>Logout</LogoutButton></li>
            </NameWrapper>}
            <UserProfileImage onClick={()=>navigate('/Profile')} src={user?.profile_image ? profileImage : user_profile_image} />
          </User> 
           : 
          <li><Link to="/SignIn">Sign In</Link></li>
          }
        </NavAuth>
      </Container>
    </Nav>
  );
};

export default Navbar