import styled from 'styled-components';

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
`;
export const DropButton = styled.button`
  border: none;
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 10px;
  background-color: transparent;
  color: #333;
  font-size: 1em;

  &:hover{
    color: #007bff;
    border-bottom: 1px solid #007bff;
    }
    a{
        list-style: none;
        text-decoration: none;
        background-color: transparent;
        color: #333;

        &:hover{
            color: #007bff;
        }
    }

    @media screen and (max-width:800px){
        background-color: transparent;
        margin: 10px auto;
        padding-left: 30px;
        width: 100%;

        &:hover{
        color: #007bff;
        border-bottom: none;
        }
    }
`;
export const Title = styled.div`
font-size: 16px;
font-weight: bold;
`
export const DropdownContent = styled.ul`
  width: fit-content;
  max-width: 300px;
  padding: 1em;
  list-style: none;
  background-color: rgba(255, 255, 255, 0.9);

  li{
    text-decoration: none;
    text-align: left;
    width: 100%;
    padding: 10px;
    margin-top: 5px;

    &:hover{
      background-color: #007bff;
      color: #fff;
    }
  }
  a{
        list-style: none;
        text-decoration: none;
        color: #333;
        padding: 10px;
        font-size: 12px;
        font-weight: bold;

        &:hover{
          color: #fff;
        }
    }

  @media screen and (max-width:1000px) {
    width: fit-content;
    max-width: 300px;
    padding: 1em;
    list-style: none;
    background-color: rgba(255, 255, 255, 0.9);
  }
  @media screen and (max-width:800px) {
    display: ${({showSubMenu})=>(showSubMenu ? 'block':'none')};
    position: static;
    width: 100%;
    max-width: 300px;
    padding: 10px;
    list-style: none;
    background-color: red;

    li{
        text-decoration: none;
        text-align: left;
        padding: 10px;
        width: 100%;
        margin: 10px auto;
    }
  }
  
`;

export const ListItems = styled.li`
    text-align: left;
    padding: 10px;
    width: fit-content;
    text-decoration: none;
    list-style: none;
    color: #333;
    background-color: #fff;
    position: absolute;
    z-index: 1000;
    top: 100%;
    left: 0;
    right: 0;
    display: ${({showSubMenu})=>(showSubMenu ? 'flex':'none')};
    justify-content: space-around;
    width: 100%;

    @media screen and (max-width:800px) {
        padding: 0px;
        &:hover {
        color: #007bff;
        display: none;
        /* ${DropdownContent}{
         display: none;
        } */
    }
    }
`
export const Links = styled.button`
  border: none;
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 10px;
  background-color: transparent;
  position: relative;
  color: #333;
  font-size: 1em;

    &:hover {
        color: #007bff;
        border-bottom: 1px solid #007bff;
        ${ListItems}{
         display: ${({showSubMenu})=>(showSubMenu ? 'flex':'none')};
        }
    }

    @media screen and (max-width:800px){
        background-color: transparent;
        margin: 10px auto;
        padding-left: 30px;
        width: 100%;
    }
`;
export const NavLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  
  @media screen and (max-width:1100px) {
      position: absolute;
      top: 4.25em; 
      left: 0;
      right: 0;
      width: 100%;
      height: fit-content;
      background-color: #fff; 
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
      z-index: 1000;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  @media screen and (max-width:800px) {
      position: absolute;
      top: 5.05em; 
      left: 0;
      right: 0;
      width: 100%;
      height: fit-content;
      background-color:#fff; 
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
      z-index: 1000;
      display: ${({showMenu})=>(showMenu ? 'flex': 'none')};
      justify-content: left;
      flex-direction: column;
  }
`;

export const NavAuth = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  background: transparent;
  display: flex;
  align-items: center;

  li {
    padding: 0px;
    a{
        list-style: none;
        width: 100%;
        text-decoration: none;
        background-color: #007bff;
        color: #fff;
        padding: 10px;
    }
  }
`;

export const MenuButton = styled.div`
  display: none;
  padding: 10px;
  font-size: 18px;
  align-items: center;
  background-color: #fff;
  color: #007bff;
  margin-left: 10px;
  cursor: pointer;

  @media screen and (max-width: 800px) {
    display: block;
  }
`;
export const LogoutButton = styled.div`
  display: block;
  font-size: 15px;
  align-items: center;
  background-color: transparent;
  color: #007bff;
  margin-top: 2px;
  cursor: pointer;
`;

export const Icon = styled.div`
  background: transparent;
  font-weight: bold;
  font-size: 1.2em;
  display: flex;
  align-items: center;
`
export const User = styled.div`
  display: flex;
  align-items: center;
  background-color: transparent;
`
export const UserProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`
export const NameWrapper = styled.div`
display: flex;
flex-direction: column;
margin-right: 5px;
background-color: transparent;
`
export const UserTitle = styled.div`
font-size: 12px;
color: #000;
text-align: center;
background-color: transparent;
` 