// src/components/UserProfilePage.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import user_profile from '../../Assets/user/user_profile.png'
import base_url, { host_url } from '../../Assets/API/Axios';
import { FaEdit } from 'react-icons/fa';
import { InfoModal, SupportMessageModal, UpdatePasswordModal,DeleteModal } from './Modal';
import { useNavigate } from 'react-router-dom';

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
const Error = styled.div`
  background: transparent;
  color: red;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px auto;
  padding: 10px;
`

function UserProfilePage() {
  const users = JSON.parse(localStorage.getItem('doc-user'))
  const [user, setUser] = useState(null)
  const [userPlan, setUserPlan] = useState(null)
  const [profileImage,setProfileImage] = useState(null)
  const [showInfo, setShowInfo] = useState(false)
  const [apiKey, setApiKey] = useState('');
  const [isError, setIsError] = useState('')
  const [showUpdatePass, setShowUpdatePass] = useState(false)
  const [showSupport, setShowSupport] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const navigate = useNavigate()


  useEffect(() => {
    document.title = 'My Profile';
  }, []);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await base_url.get(`/user/${users?.user?.id}`);
        setUser(res.data);
        const imgLink = host_url + res.data.profile_image;
        setProfileImage(imgLink);
        console.log(imgLink);
      } catch (error) {
        console.log(error);
      }
    };

    if (users?.user?.id) {
      fetchUserData();
    }
  }, [users?.user?.id]);

  useEffect(() => {
    const fetchUserPlan = async () => {
      try {
        if (user?.plan) {
          const res = await base_url.get(`/plan/${user.plan}`);
          setUserPlan(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserPlan();
  }, [user?.plan]);

  useEffect(()=>{
    return(async()=>{
      try {
        if (userPlan?.plan_name ===  'Extended'){
          await base_url.get(`/get_api_key/${user?.id}`)
          .then((res)=>{
            setApiKey(res.data)
            // console.log(res.data);
          }).catch((err)=>{
            console.log(err);
            // setIsError(err.response.data.error)
          })
        }
      } catch (error) {
        console.log(error);
        setIsError(error.message)
      }
    })
  },[user])

  // console.log(userPlan?.plan_name);
  
  return (
    <UserProfilePageContainer>
      <ProfileCard>
      {isError && <Error>{isError}</Error>}
       <Container>
           <Title>Basic Information</Title>
           <Row>
                <Wrapper>
                    <ProfileImage src={user?.profile_image ? profileImage : user_profile} alt="Profile"/>
                </Wrapper>
                <UserName>
                  <Column>
                      <ProfileName>{user?.name}</ProfileName>
                      <ProfileEmail>{user?.email}</ProfileEmail>
                      <Icon onClick={()=>setShowInfo(true)}>
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
                    <InfoSubtitle>Update your password</InfoSubtitle>
                </Column>
                <Icon onClick={()=>setShowUpdatePass(!showUpdatePass)} >
                  <EditIcon><FaEdit/></EditIcon>
                </Icon>
            </Row>
            <Row>
                <Column>
                    <InfoTitle>API</InfoTitle>
                    <InfoSubtitle>Get API that works. Integrate with workflows for easy access from your projects </InfoSubtitle>
                </Column>
                <Column>
                    {userPlan?.plan_name !== 'Extended' ?
                    <EditProfileButton onClick={()=>navigate('/Pricing')}>Upgrade</EditProfileButton>
                    :
                    <EditProfileButton onClick={()=>navigate('/Api-Integration')}>API Docs</EditProfileButton>
                  }
                </Column>
            </Row>
            <Row>
                <Column style={{width:'100%'}}>
                    <InfoTitle>Subscriptions</InfoTitle>
                    <InfoSubtitle> Your current plan &nbsp; <strong>{userPlan?.plan_name}</strong> </InfoSubtitle>
                    {userPlan?.plan_name === 'Free' || userPlan?.plan_name === 'Premium' ?
                    <>
                     <InfoSubtitle>Upgrade your plan to enjoy limitless documents manipulation without</InfoSubtitle>
                     <EditProfileButton style={{width:'100%'}} onClick={()=>navigate('/Pricing')}>Upgrade now{'>>'}</EditProfileButton>
                    </>
                  :null}
                </Column>
            </Row>
            {userPlan?.plan_name === 'Extended' &&
            <Row>
                <Column style={{width:'100%'}}>
                    <InfoTitle>Support</InfoTitle>
                    <InfoSubtitle> Our support team is available monday to friday to get you out from doubt or any issues from using our tools</InfoSubtitle>
                    {/* <InfoSubtitle>Contact us now </InfoSubtitle> */}
                    <EditProfileButton style={{width:'100%'}} onClick={()=>setShowSupport(!showSupport)}>Contact us now</EditProfileButton>
                </Column>
            </Row>}
            <Row>
              <EditProfileButton style={{width:'100%', background:'red',fontSize:'1.5em'}} 
              onClick={()=>setShowDelete(!showDelete)}>Delete my account</EditProfileButton>
            </Row>
        </Container>
      </ProfileCard>
      {showInfo && <InfoModal setOpen={setShowInfo} open={showInfo}  />}
      {showSupport && <SupportMessageModal setOpen={setShowSupport} open={showSupport}  />}
      {showDelete && <DeleteModal setOpen={setShowDelete} open={showDelete}  />}
      {showUpdatePass && <UpdatePasswordModal setOpen={setShowUpdatePass} open={showUpdatePass}  />}
    </UserProfilePageContainer>
  );
}

export default UserProfilePage;
