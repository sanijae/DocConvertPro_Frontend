import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  width: 460px;
  padding: 40px;
  background: #ffffff;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
  position: relative;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
`;

const Price = styled.h3`
  color: #FF6B6B;
  font-weight: 700;
  font-size: 2.2rem;
  margin: 15px 0;
`;

const Description = styled.p`
  color: #3b3b3b;
  font-size: 1.1rem;
  margin: 20px 0 20px;
`;

const Offer = styled.b`
  display: block;
  color: #555;
  font-size: 1rem;
  margin-top: 25px;
`;

const SubscribeButton = styled.a`
  display: inline-block;
  padding: 15px 0;
  background-color: #FF6B6B;
  color: #fff;
  text-decoration: none;
  border-radius: 30px;
  font-size: 1.2rem;
  margin-top: 40px;
  width: 100%;
  font-weight: 500;
  transition: 0.2s ease;

  &:hover {
    background: #ff4d4d;
  }
`;

const RibbonWrap = styled.div`
  width: 150px;
  height: 150px;
  position: absolute;
  top: -10px;
  left: -10px;
  pointer-events: none;
`;

const Ribbon = styled.div`
  width: 230px;
  font-size: 0.918rem;
  text-align: center;
  padding: 8px 0;
  background: #FF6B6B;
  color: #fff;
  position: absolute;
  transform: rotate(-45deg);
  right: -17px;
  top: 29%;
`;

function PricingCard() {
  return (
    <CardContainer>
      <Title>Unlock Exclusive Content</Title>
      <Price>$29<span>/month</span></Price>
      <Description>Gain exclusive access to our premium content library. Explore and enjoy high-quality videos on your preferred devices.</Description>
      <Offer>Act fast! Offer ends on September 20, 2023.</Offer>
      <SubscribeButton href="#">Subscribe Now</SubscribeButton>
      <RibbonWrap>
        <Ribbon>Special Offer!</Ribbon>
      </RibbonWrap>
    </CardContainer>
  );
}

export default PricingCard;
