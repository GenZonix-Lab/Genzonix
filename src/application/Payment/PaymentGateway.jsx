import {useState, useEffect} from 'react'
import ShowAlert from '../../Components/ShowAlert'
import { fetchAuthSession,fetchUserAttributes } from 'aws-amplify/auth';
import { useNavigate } from "react-router";

const paymentApi = 'https://yn5xuarjc7.execute-api.ap-south-1.amazonaws.com/3alim/payment/'

const PaymentGateway = ({amount, currency, order_id,solution_kit}) => {
    const navigate = useNavigate();
    const getToken = async () => {
      const session = await fetchAuthSession(); // await the session
      const token = session.tokens.idToken.toString(); // now you have the JWT string
      return token;
    };
    const [alert,setAlert] = useState('');
    const [trig,setTrig]= useState(0);
    const [isRazorpayLoaded, setRazorpayLoaded] = useState(false);
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

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
            setRazorpayLoaded(true); // ✅ Razorpay is ready to use
        };
        document.body.appendChild(script);
    }, []);

    const handleClick=()=>{
        setTrig(Date.now())
        if (!isRazorpayLoaded) {
            setAlert('Razorpay SDK not yet loaded. Please wait.');
            return;
        }
        var options = {
            "key": "rzp_live_DOfOZNUrGFkLMo", // Enter the Key ID generated from the Dashboard
            "amount": amount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": currency || "INR",
            "name": "GenZonix",
            "description": `Genzonix uses Razorpay to offer secure, fast, and reliable payments via UPI, cards, net banking, and wallets.`,
            "image": "https://www.genzonix.in/assets/favicon-DB_nvQ7f.png",
            "order_id": order_id, //Order Id Generated from item list.
            "handler": function (response){
                post_payment(response);
                setAlert("Payment Successful");
                if(solution_kit == 'cloud'){
                    navigate("/subscription");
                }else if(solution_kit == 'products'){
                    navigate("/order");
                }
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
        var razorpay = new window.Razorpay(options);;
        razorpay.on('payment.failed', function (response){
                setAlert(response.error.code);
                setAlert(response.error.description);
                setAlert(response.error.source);
                setAlert(response.error.step);
                setAlert(response.error.reason);
                setAlert(response.error.metadata.order_id);
                setAlert(response.error.metadata.payment_id);
        });
        razorpay.open();
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
                "solution_kit":solution_kit,
                "razorpay_order_id":response.razorpay_order_id,
                "razorpay_payment_id":response.razorpay_payment_id,
                "razorpay_signature":response.razorpay_signature,
            })})
        const data=await res.json();
        setAlert(data);
        return data;
    }
    return (
        <>
        <div className='text-center'>
            <ShowAlert
                message={alert}
                triggerKey={trig}
                type="warning"
                duration={2000}
                redirectText=""
                redirectPath=""
            />
            <button id="rzp-button1" onClick={async()=>handleClick()} className='btn-default px-3 p-2 fs-5'>
                <img src="https://framerusercontent.com/images/CU1m0xFonUl76ZeaW0IdkQ0M.png" alt="" style={{height:'40px'}}/>
                Pay with Razorpay</button>
        </div>
        </>
    )
}

export default PaymentGateway