import { useState } from 'react'
import PaymentGateway from '../Payment/PaymentGateway';
import { useNavigate } from 'react-router-dom';
import { fetchAuthSession } from 'aws-amplify/auth';
const serviceApi='https://yn5xuarjc7.execute-api.ap-south-1.amazonaws.com/3alim/services'

const Paymentbutton = ({price,selectedServices,status,setTrig,setAlert,duration,vendor,setStatus}) => {
    const navigate=useNavigate();
    //get token id
    const getToken = async () => {
    try {
        const session = await fetchAuthSession();
        const idToken = session?.tokens?.idToken?.toString();
        if (!idToken) throw new Error("No idToken found in session");
        return idToken;
    } catch (err) {
        console.error("Error getting token:", err);
    }
    };
    //post services
    const [credentials,setCredentials]=useState([]);
    const handleStatus = async()=>{
            if (selectedServices.length === 0 || duration<30) {
                setTrig(Date.now())
                setAlert("Please Select Services and duration");
                setStatus(false);
                return;
            }
            const postData = {
                "services":selectedServices,
                "duration":duration,
                "vendor":vendor
            }
            const token =await getToken();
            const methodObject = {
                method:'POST',
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(postData)
            } 
            try {
                const response = await fetch(serviceApi,methodObject)
                const data= await response.json();
                if(data.status == 'success'){
                    setCredentials(data.items);
                    selectedServices.length > 0 ? setStatus(true) : setStatus(false)
                } else {
                    throw new Error(data);
                }
            }catch (error) {
                setAlert("Error fetching services. Please try again.");
                setStatus(false);
            }
        }
  return (
    <div>
        <div className="price">
            <div className="text-end">
                <samp className='me-xl-5 p-2'>
                    <strong >Price Estimation: </strong>
                    {price.toFixed(2)}
                </samp>
            </div>
        </div>
        <div className="payment-detail mx-auto py-3">
            {selectedServices && selectedServices.length > 0 && status ?
            (
            <div>
                <h5>Proceed to Pay</h5>
                <PaymentGateway 
                    order_id={credentials.orderid}
                    amount={credentials.cost} 
                    currency="INR" 
                    solution_kit="cloud"
                    checkout="checkout"
                />
            </div>
            ):(
            <div className="text-center">
                <button className='btn-default p-3 fs-4 fw-100' onClick={()=>handleStatus()}>
                    click here to proceed
                </button>
            </div>
            )
            }
        </div>
    </div>
  )
}

export default Paymentbutton