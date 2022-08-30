import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe('pk_test_51IwoBgSHiDEFfnV9bDSLU3XBsUs0TrhexPXrELopPNf4jht900ic4VjBbeAmnPuKyjMSHk288ApUSSLZcPnfMfDH00h08lXnCE');
  }

  return stripePromise;
}

export default getStripe;