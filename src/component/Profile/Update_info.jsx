// src/components/UserProfilePage.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import user_profile from '../../Assets/user/saj2.jpg'
import base_url from '../../Assets/API/Axios';
import { FaEdit } from 'react-icons/fa';

const UserProfilePageContainer = styled.div`
  padding: 150px 0;
  background: #f9f9f9;
`;
const Row = styled.div`
display: flex;
justify-content: space-between;
margin: 10px auto;
align-items: center;
padding: 10px;
background-color: transparent;
border-bottom: 1px solid rgba(0,0,0,.4);
`
const Column = styled.div`
display: flex;
flex-direction: column;
background: transparent;
`
const Container = styled.div`
background: transparent;
`
const Title = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(0,0,0,.4);
`;
const ProfileCard = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
`;
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    flex-direction: column;
    background: transparent;
`
const ProfileName = styled.div`
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  justify-content: right;
`;

const ProfileEmail = styled.div`
  font-size: .9rem;
  margin-bottom: 10px;
  display: flex;
  justify-content: right;
`;
const InfoTitle = styled.div`
  font-size: .9rem;
  margin-bottom: 10px;
  font-weight: bold;
`;
const InfoSubtitle = styled.div`
  font-size: .9rem;
  margin-bottom: 10px;
`;
const Icon = styled.div`
display: flex;
align-items: center;
background: transparent;
justify-content: right;
`
const EditIcon = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #007bff;
  cursor: pointer;
`
const EditProfileButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  width: 10em;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
const UserName = styled.div`
  display: flex;
  justify-content: right;
`

function UserProfilePage() {
  const users = JSON.parse(localStorage.getItem('doc-user'))
  const [user, setUser] = useState(null)


  useEffect(()=>{
    return(async()=>{
      try {
         await base_url.get(`/user/${users.user.id}`)
         .then((res)=>{
          setUser(res.data)
          console.log(res);
         }).catch((err)=>{
          console.log(err);
         })
        
      } catch (error) {
        console.log(error);
      }
    })
  },[users.user.id])

console.log(user);
  const handleEditProfile = () => {
    // Add logic to handle editing user profile
  };

  return (
    <UserProfilePageContainer>
      <ProfileCard>
       <Container>
           <Title>Basic Information</Title>
           <Row>
                <Wrapper>
                    <ProfileImage src={user?.profile_image ? user?.profile_image:user_profile} alt="Profile" />
                </Wrapper>
                <UserName>
                  <Column>
                      <ProfileName>{user?.name}</ProfileName>
                      <ProfileEmail>{user?.email}</ProfileEmail>
                      <Icon onClick={handleEditProfile}>
                        <EditIcon><FaEdit/></EditIcon>
                      </Icon>
                  </Column>
                </UserName>
            </Row>
        </Container>
        <Container>
            <Title>Other Information</Title>
            <Row>
                <Column>
                    <InfoTitle>Account security</InfoTitle>
                    <InfoSubtitle>Update your login details</InfoSubtitle>
                </Column>
                <Icon onClick={handleEditProfile}>
                  <EditIcon><FaEdit/></EditIcon>
                </Icon>
            </Row>
            <Row>
                <Column>
                    <InfoTitle>API</InfoTitle>
                    <InfoSubtitle>Get API that works. Integrate with workflows for easy access from your projects </InfoSubtitle>
                </Column>
                <Column>
                    <EditProfileButton onClick={handleEditProfile}>Get API</EditProfileButton>
                </Column>
            </Row>
            <Row>
                <Column>
                    <InfoTitle>Notification</InfoTitle>
                    <InfoSubtitle>Be the first to know our updates. Subscribes to our mailing list </InfoSubtitle>
                </Column>
                <Column>
                    <EditProfileButton onClick={handleEditProfile}>Notify Me</EditProfileButton>
                </Column>
            </Row>
            <Row>
                <Column>
                    <InfoTitle>Subscriptions</InfoTitle>
                    <InfoSubtitle>Check your subscriptions for continues access </InfoSubtitle>
                </Column>
                <Column>
                    <EditProfileButton onClick={handleEditProfile}>Check{'>>'}</EditProfileButton>
                </Column>
            </Row>
        </Container>
      </ProfileCard>
    </UserProfilePageContainer>
  );
}

export default UserProfilePage;
