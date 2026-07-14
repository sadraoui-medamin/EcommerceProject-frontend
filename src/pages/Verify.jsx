import React, { useContext, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported
import { ShopContext } from './context/ShopContext';
import apiBaseUrl from '../config/api';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${apiBaseUrl}/api/order/verify`, {
        orderId, // Pass orderId and success as an object
        success,
      });
      if (response.data.success) {
        navigate('/myorders');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      navigate('/'); // Redirect to home or handle error accordingly
    }
  };

  useEffect(() => {
    if (success && orderId) {
      verifyPayment();
    }
  }, [success, orderId]);


  return (
    <section>
      <div className="min-h-[60vh] grid">
        <div className="h-24 w-24 place-self-center border-4 border-t-secondary rounded-full animate-spinAround"></div> 
      </div>
    </section>
  );
};

export default Verify;
