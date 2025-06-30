import {useState, useEffect} from 'react'
import { fetchAuthSession,fetchUserAttributes } from 'aws-amplify/auth';
import logo from '../assets/favicon.ico'
import { useNavigate } from "react-router";
const paymentApi=`https://x69g27a76e.execute-api.ap-south-1.amazonaws.com/prod/payment/`
const getToken = async () => {
  const session = await fetchAuthSession(); // await the session
  const token = session.tokens.idToken.toString(); // now you have the JWT string
  return token;
};
const PaymentGateway = () => {
    const navigate = useNavigate();
    const [attributes, setAttributes] = useState(null);
    useEffect(() => {
        const loadAttributes = async () => {
            try {
                const attrs = await fetchUserAttributes();
                setAttributes(attrs);
            } catch (err) {
                console.error('Failed to fetch attributes:', err);
            } 
        };
        setAttributes(null);
        loadAttributes();
    }, []);
    const [isRazorpayLoaded, setRazorpayLoaded] = useState(false);
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
            setRazorpayLoaded(true); // ✅ Razorpay is ready to use
        };
        document.body.appendChild(script);
    }, []);
    const [credentials, setCredentials]=useState([]);
    useEffect(()=>{
        const fetchapi=async()=>{
        try{
            const token =await getToken();
            const response = await fetch(paymentApi,{
                method:'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Cognito JWT token
                }
            })
            const data= await response.json();
            setCredentials(data)
        }catch (error){
            console.error("Error fetching payment gateway credentials:",error);
        }
        };
        fetchapi();
        },[])
    const handleClick=()=>{
        if (!isRazorpayLoaded) {
            alert('Razorpay SDK not yet loaded. Please wait.');
            return;
        }
        var options = {
            "key": "rzp_test_6n5QsvBQUThbf6", // Enter the Key ID generated from the Dashboard
            "amount": credentials.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": credentials.currency,
            "name": "GenZonix",
            "description": "Test Transaction",
            "image": logo,
            "order_id": credentials.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response){
                post_payment(response);
                navigate("/order");
            },
            "prefill": {
                "name": attributes?.name || '',
                "email": attributes?.email || '',
                "contact": attributes?.phone_number || ''
            },
            "notes": {
                "address": "Genzonix Office"
            },
            "theme": {
                "color": "#050a30"
            }
        };
        var rzp1 = new window.Razorpay(options);;
        rzp1.on('payment.failed', function (response){
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
        });
        rzp1.open();
    }

    const post_payment=async (response)=>{
        const token =await getToken();
        const res=await fetch(paymentApi,{
            method:'POST',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "razorpay_order_id":response.razorpay_order_id,
                "razorpay_payment_id":response.razorpay_payment_id,
                "razorpay_signature":response.razorpay_signature,
            })})
        const data=await res.json();
        return data;
    }
        
  return (
    <>
    <div className='text-center'>
        <button id="rzp-button1" onClick={async()=>handleClick()} className='btn-default px-3 p-2 fs-5'>Pay with Razorpay</button>
    </div>
    </>
  )
}

export default PaymentGateway