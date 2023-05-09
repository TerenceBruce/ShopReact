import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Navigate, useNavigate } from 'react-router-dom';


const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    
    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);

      // Send the payment method to your server to create a charge
      
      // Assuming the payment was successful, redirect to the PaymentSuccess component
      Navigate("/PaymentSuccess");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};
export default PaymentForm;