import React from 'react';

export function NairaPrice({ amount }) {
  const formattedAmount = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(amount);

  return (
    <span>
      {formattedAmount}
    </span>
  );
}
//&#x20A6;
export function FormatNairaAmount(nairaAmount) {
    const formattedAmount = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(nairaAmount);
  
    return formattedAmount.replace(/\.00$/, ''); // Remove .00 from the end
  }
  const nairaAmount = 5000;
console.log(FormatNairaAmount(nairaAmount))
  
export  function NairaToKobo(nairaAmount) {
    return nairaAmount * 100;
  }

export  function KoboToNaira(koboAmount) {
    return koboAmount / 100;
  }
  
