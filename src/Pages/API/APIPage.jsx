
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import bgImage from '../../Assets/Images/large-triangles.png'
import base_url from '../../Assets/API/Axios';
import ApiDocumentation from './ApiDocs';
import { Link } from 'react-router-dom';

const DeveloperAPIPageContainer = styled.div`
  padding: 50px 0;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  color: #fff;
`;

const HeroContainer = styled.div`
  text-align: center;
  padding-top: 130px;
  /* padding: 100px 0; */

  @media screen and (max-width:700px) {
    padding: 130px 20px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  /* margin-bottom: 20px; */
`;

const HeroDescription = styled.p`
  font-size: 1.5rem;
`;

// const Continer = styled.div`
// display: flex;
// justify-content: center;
// align-items: center;
// margin: 30px auto;
// background-color: #fff;
// color: rgba(0,0,0,.6);
// `
// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: 10px;
//   width: 80%;
//   `
// const FeaturesContainer = styled.div`
//   padding: 50px 0;
//   background-color: transparent;
// `;

// const CodeWrapper = styled.div`
// padding: 10px;
// margin: 10px auto;
// background-color: #000;
// color: #fff;
// `
// const Row = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 10px;
// `
// const Header = styled.div`
//   font-size: 18px;
//   font-weight: bold;
//   padding: 10px;
// `
// const codes = styled.div`
//   font-size: 16px;
//   font-weight: bold;
//   padding: 10px;
// `
// const Text = styled.div`
//   font-size: 15px;
//   padding: 10px;
// `
const LinkWrapper = styled.div`
  margin: 30px auto;
`
const LinkButton = styled(Link)`
  list-style-type: none;
  text-decoration: none;
  background-color: #007bff;
  color: #fff;
  padding: 15px 30px;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #fff;
    color: #0056b3;
  }
`;
const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 15px 30px;
  font-size: 1.2rem;
  border: none;
  margin: 30px auto;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #fff;
    color: #0056b3;
  }
`;
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

function DeveloperAPIPage() {
  const users = JSON.parse(localStorage.getItem('doc-user'))
  const [user, setUser] = useState(null)
  const [isError, setIsError] = useState('')
  const [apiKey, setApiKey] = useState('');
  const [userPlan, setUserPlan] = useState(null)

  useEffect(() => {
    document.title = 'API Docs';
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await base_url.get(`/user/${users?.user?.id}`);
        setUser(res.data);
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
        if (userPlan?.plan_name !==  'Extended'){
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

  const handleCreateApiKey = async () => {
    try {
      await base_url.post('create_api_key/'+user?.id)
      .then((res)=>{
        setApiKey(res.data)
        console.log(res.data);
      }).catch((err)=>{
        console.log(err);
        setIsError(err.response.data.error);
      })
    } catch (err) {
      setIsError('An error occurred while generating the API key');
    }
  };

  return (
    <>
    {!apiKey ?
    <DeveloperAPIPageContainer>
      <HeroContainer>
        <HeroTitle>Supercharge Your Applications with Our Developer API</HeroTitle>
        <HeroDescription>Unlock the full potential of your applications by integrating our powerful API, enabling seamless document management capabilities.</HeroDescription>
        {userPlan?.plan_name === 'Extended' && <Button onClick={handleCreateApiKey}>Get your API now</Button>}
        {isError && <Error>{isError}</Error>}
        {userPlan?.plan_name !== 'Extended' &&
        <LinkWrapper>
          <LinkButton to='/Pricing'>Upgrade your plan</LinkButton>
        </LinkWrapper>}
      </HeroContainer>
    </DeveloperAPIPageContainer>
    :
    <ApiDocumentation api_key={apiKey.key}/>
    }
    </>
  );
}

export default DeveloperAPIPage;
