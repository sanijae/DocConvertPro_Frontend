import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import styled from 'styled-components';
import Hero from './Hero';
import { FaCheck } from "react-icons/fa";
import { Basic, Premium, Extended } from './PriceData';
import base_url from '../../Assets/API/Axios';
import { PaystackButton } from 'react-paystack';
import {useNavigate } from 'react-router-dom';
import { FormatNairaAmount } from './naira';

const PricingPageContainer = styled.div`
  padding: 50px 0px;
  background-color: #d4ebf6;
`;
const Header = styled.div`
 display: flex;
 width: 100%;
 background-color: #007bff;
 justify-content: left;
 color: #fff;
 border-radius: 10px 10px 0 0;
 flex-direction: column;
`
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-grow: 1;
  align-items: center;
  background-color: transparent;
`
const Button = styled(PaystackButton)`
 display: flex;
 flex-direction: column;
 border: none;
 padding: 20px;
 align-items: center;
 border-radius: 15px;
 color: #fff;
 font-size: 1rem;
 cursor: pointer;
 font-weight: bold;
 width: 80%;
 background-color: #6791f1;

 &:hover{
  color: #6791f1;
  border: 1px solid #007bff;
  background-color: #fff;
 }
`
const ButtonLogin = styled.button`
 display: flex;
 flex-direction: column;
 border: none;
 padding: 20px;
 align-items: center;
 border-radius: 15px;
 color: #fff;
 font-size: 1rem;
 cursor: pointer;
 font-weight: bold;
 width: 80%;
 background-color: #6791f1;

 &:hover{
  color: #6791f1;
  border: 1px solid #007bff;
  background-color: #fff;
 }
`
const Spicer = styled.div`
  flex-grow: 1;
  background-color: transparent;
`
const Wrapper = styled.div`
  padding: 20px;
  background: transparent;
`
const Sliders = styled.div`
  margin-top: 30px;
  display: flex;
  background: transparent;
  justify-content: center;

  @media screen and (max-width:900px) {
    flex-direction: column;
  }
`;

const PricingPlan = styled.div`
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "#fff")};
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  position: relative;
  width: 30em;
  margin: 0px 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media screen and (max-width:900px) {
    width: 90%;
    margin: 10px auto;
  }
`;

const PlanName = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  padding: 20px;
`;

const Price = styled.div`
  font-size: 1.3rem;
  text-align: left;
  width: 100%;
  padding: 10px;
  padding-bottom: 0px;
  font-style: italic;
  font-weight: bold;
`;
const PriceDollar = styled.div`
  font-size: 1rem;
  text-align: left;
  width: 100%;
  padding: 10px;
  padding-top: 0px;
  font-style: italic;
  color: gold;
  font-weight: bold;
`;

const FeaturesList = styled.div`
  padding: 20px;
`;
const Feature = styled.li`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 10px;
  list-style: none;
  text-decoration: none;
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

export default function PricingPage() {
  const users = JSON.parse(localStorage.getItem('doc-user'))
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const [isError, setIsError] = useState('')
  

  useEffect(() => {
    document.title = 'Pricing';
  }, []);

  useEffect(()=>{
    return(async()=>{
      try {
         await base_url.get(`/user/${users?.user?.id}`)
         .then((res)=>{
          setUser(res.data)
         }).catch((err)=>{
          console.log(err);
          setIsError(err.response.data.error)
         })
        
      } catch (error) {
        console.log(error);
        setIsError(error.message)
      }
    })
  },[users?.user?.id])
console.log(user);
  return (
    <PricingPageContainer>
      <Hero/>
      <Sliders>
        <PricingPlan>
          <Header>
            <PlanName>{Premium.title}</PlanName>
            <Price>{FormatNairaAmount(Premium.price / 100)}/M</Price>
            <PriceDollar>${Premium.dollar}/M</PriceDollar>
          </Header>
          <FeaturesList>
            {Premium.features.map((feature,i)=>{
              return(
                <Feature key={i}><FaCheck size={'13px'} />&nbsp;{feature}</Feature>
              )
            })}
          </FeaturesList>
          <Spicer></Spicer>
          <Wrapper>
            {user !== null ? (
              <>
                <PaystackPayment title={Premium.button} plan={Premium.title} price={Premium.price} user={user} setIsError={setIsError} />
                <PayPalButtonPay price={Premium.dollar} plan={Premium.title} user={user} setIsError={setIsError} />
              </>
            ) : (
              <ButtonWrapper>
                <ButtonLogin onClick={()=>navigate('/SignIn')}>Get Started now</ButtonLogin>
              </ButtonWrapper>
            )}
          </Wrapper>
        </PricingPlan>
        <PricingPlan>
          <Header>
            <PlanName>{Extended.title}</PlanName>
            <Price>{FormatNairaAmount(Extended.price / 100)}/M</Price>
            <PriceDollar>${Extended.dollar}/M</PriceDollar>
          </Header>
          <FeaturesList>
            {Extended.features.map((feature,i)=>{
              return(
                <Feature key={i}><FaCheck size={'13px'} />&nbsp;{feature}</Feature>
              )
            })}
          </FeaturesList>
          <Spicer></Spicer>
          <Wrapper>
            {user !== null ? (
              <>
                <PaystackPayment title={Extended.button} plan={Extended.title} price={Extended.price}  user={user} setIsError={setIsError}/>
                <PayPalButtonPay price={Extended.dollar} plan={Extended.title} user={user} setIsError={setIsError} />
              </>
            ) : (
              <ButtonWrapper>
                <ButtonLogin onClick={()=>navigate('/SignIn')}>Get Started now</ButtonLogin>
              </ButtonWrapper>
            )}
          </Wrapper>
        </PricingPlan>
      </Sliders>
      {isError && <Error>{isError}</Error>}
      {/* {isError && <Alert title="Error occur" message={isError} onClose={()=>setIsError('')}  />} */}
    </PricingPageContainer>
  );
}
 

function PaystackPayment ({ title, plan, price,user,setIsError }){
  const navigate = useNavigate()
  const publicKey = "pk_test_60cab5dcb337717cb0d38c5991080ae13c9d6cea";
  
  const handlePaystackSuccessAction = async(reference) => {
    // console.log('success',reference);
    try {
      const ref = reference.reference
      const paymentHistory = await base_url.get(`payment/${user?.id}/`);
      console.log(paymentHistory.data);
      if (paymentHistory.data.length !== 0) {
        const formData = new FormData();
        formData.append('user', user?.id);
        formData.append('ref_code', ref);
        formData.append('amount', price);
        formData.append('paymentSource','paystack')
        formData.append('plan', plan);
        await base_url.put(`payment_subscribe_update/${user?.id}/`, formData, {
          'headers': {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          console.log(res);
          setIsError('');
          navigate('/profile')
        }).catch((err) => {
          console.log(err);
          setIsError(err.response.data.error);
        });
      } else {
        const formData = new FormData();
        formData.append('user', user?.id);
        formData.append('ref_code', ref);
        formData.append('amount', price);
        formData.append('paymentSource','paystack')
        formData.append('plan', plan);
        await base_url.post(`payment_subscribe/`, formData, {
          'headers': {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          console.log(res);
          setIsError('');
        }).catch((err) => {
          console.log(err);
          setIsError(err.response.data.error);
        });
      }
    } catch (error) {
      console.log(error);
      setIsError(error.message);
    }
  };
  
  const componentProps = {
    email: user?.email,
    amount: price,
    publicKey,
    text: title,
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: () => { alert("Wait! You need to make this payment, don't go!!!!"); }
  };
  return (
    <ButtonWrapper>
      <Button className="paystack-button" {...componentProps} />
    </ButtonWrapper>
  );
};


function PayPalButtonPay(props) {
  const navigate = useNavigate()
  const {price,user,plan,setIsError} = props
  const paypalOptions = {
    'client-id': "AQ1ru6PBGsRLsywbjjeiJapWHzPIl9x8tu_mqQj64DKsrp_tYL0Fy7k0D6uEd_Fh4KLPAuf2lHZKqOUg",
    currency: 'USD',
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: price, // Example amount
          },
        },
      ],
    });
  };

  const onApprove = async(data, actions) => {
    // Handle successful payment
    console.log('Payment approved:', data);
    try {
      const ref = data.paymentID
      const paymentHistory = await base_url.get(`payment/${user?.id}/`);
      console.log(paymentHistory.data);
      if (paymentHistory.data.length !== 0) {
        const formData = new FormData();
        formData.append('user', user?.id);
        formData.append('paymentSource',data.paymentSource)
        formData.append('ref_code', ref);
        formData.append('amount', price);
        formData.append('plan', plan);
        await base_url.put(`payment_subscribe_update/${user?.id}/`, formData, {
          'headers': {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          console.log(res);
          setIsError('');
          navigate('/profile')
        }).catch((err) => {
          console.log(err);
          setIsError(err.response.data.error);
        });
      } else {
        const formData = new FormData();
        formData.append('user', user?.id);
        formData.append('ref_code', ref);
        formData.append('amount', price);
        formData.append('paymentSource',data.paymentSource)
        formData.append('plan', plan);
        await base_url.post(`payment_subscribe/`, formData, {
          'headers': {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          console.log(res);
          setIsError('');
        }).catch((err) => {
          console.log(err);
          setIsError(err.response.data.error);
        });
      }
    } catch (error) {
      console.log(error);
      setIsError(error.message);
    }
  };

  const onError = (err) => {
    // Handle errors
    console.error('PayPal error:', err);
    setIsError(err)
  };

 const PaypalWrapper = styled.div`
 width: 100%;
 padding: 10px;
 display: flex;
 justify-content: center;
 align-items: center;
 background-color: transparent;
 `
  const PaypalPay = styled(PayPalButtons)`
   font-size: 14px;
  `
  const styles = {
    layout: "horizontal",
    shape: 'rect',
    label: 'paypal'
  }
  return (
    <PaypalWrapper>
      <PayPalScriptProvider options={paypalOptions}>
        <PaypalPay
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
          style={styles}
        />
      </PayPalScriptProvider>
    </PaypalWrapper>
  );
}
