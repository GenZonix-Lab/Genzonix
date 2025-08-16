import React, { useEffect, useState } from 'react'
import PaymentGateway from '../Payment/PaymentGateway';
import Subscription from './Subscription';
import Videos from './Videos';
import { fetchAuthSession } from 'aws-amplify/auth';
import ShowAlert from "../../Components/ShowAlert";
import { ThreeDot } from 'react-loading-indicators';
const serviceApi='https://yn5xuarjc7.execute-api.ap-south-1.amazonaws.com/3alim/services'
const awsApi='https://yn5xuarjc7.execute-api.ap-south-1.amazonaws.com/3alim/services/aws'
const subscriptionApi = `https://yn5xuarjc7.execute-api.ap-south-1.amazonaws.com/3alim/services/subscription`
const CloudSandbox = () => {
    const [alert,setAlert]=useState('');
    const [trig,setTrig]=useState(0);
    const [vendor,setVendor]=useState('aws')
    const [serviceRes,setServiceRes]=useState([]);
    const [awsServiceList,setAwsServiceList] = useState([]);
    const gcpServiceList = [];
    const azureServiceList = [];
    const [selectedServices, setSelectedServices] = useState([]);
    const [duration,setDuration] = useState(0)
    const [status, setStatus]=useState(false)
    const [serviceList, setServiceList] = useState([]);
    const [subscriptionStatus,setSubscriptionStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const getToken = async () => {
        try{
        const session = await fetchAuthSession(); // await the session
        const token = session.tokens.idToken.toString(); // now you have the JWT string
        if (!token) {
            console.warn("User session not found. Redirecting to auth...");
            throw new Error("No idToken found in session");
        }else{ setLoading(true)}
        return token;
        }catch(err){
        console.error("Error getting token:", err);
        window.location.href = "/Auth";
        }
    };
    
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(awsApi);
            const data = await res.json();
            setAwsServiceList(data);
            setServiceList(data);
        };
        fetchData();
    }, []);

    useEffect(() => {
            const fetchSubscription = async () => {
                const token=await getToken();
                const response = await fetch(subscriptionApi,{
                    method:"GET",
                    headers:{
                        'Authorization': `Bearer ${token}`,
                    }
                })
                const data = await response.json()
                console.log(data)
                data.map( element => {
                    setSubscriptionStatus(element.status)
                    if(element.status === "active"){
                        console.log(element.account_id)
                        setReceivedTime(element.deletion_at)
                        setTimeDuration(element.duration)
                        setAccountId(element.account_id)
                        setUsername(element.awsid)
                        setPassword(element.password)
                        setVendorLink(element.console_login_url)
                    }
                })
            }
            fetchSubscription()
        },[])
    const handleVendor = (e) => {
        const selectedVendor = e.target.value
        setVendor(selectedVendor)
        setSelectedServices([]);
        console.log(selectedVendor)
        if(selectedVendor === 'gcp'){
            setServiceList(gcpServiceList);
        }else if(selectedVendor === 'azure'){
            setServiceList(azureServiceList);
        }
        else{
            setServiceList(awsServiceList);
        }
    }
    const handleServices = (event) => {
        const { value, checked } = event.target;

        let updatedServices = checked
        ? [...selectedServices, value]
        : selectedServices.filter(item => item !== value);

        setSelectedServices(updatedServices);
        setStatus(false);
    };



    const handleStatus = async()=>{
        setTrig(Date.now())
        try{
            const token =await getToken();
            const res=await fetch(serviceApi,{
                method:'POST',
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    "services":selectedServices,
                    "duration":duration,
                    "vendor":vendor
                })})
            const data=await res.json();
            console.log(data);
            if(data.status == 'success'){
                setServiceRes(data.items);
                selectedServices.length > 0 ? setStatus(true) : setStatus(false)
            }else if(data === 'Internal Server Error, Order amount less than minimum amount allowed'){
                throw 'select Services and duration'
            }
        } catch (e) {
            if (e === 'select Services and duration'){
                setAlert("Please select services and duration");
            }else{
                setAlert("An error occurred while processing your request.");
            }
            console.error("Error in handleStatus:", e);
        }
    }

    const serviceCost=serviceList
    .filter(service => selectedServices.includes(service.services.toLowerCase()))
    .reduce((sum, service) => sum + parseFloat(service.cost), 0)
    .toFixed(2) 

    const price=duration!=0 && selectedServices.length!==0?(duration/9) * parseFloat(serviceCost):0;
  return (
    <>
    <ShowAlert
            message={alert}
            triggerKey={trig}
            type="info"
            duration={3000}
            redirectText=''
            redirectPath=''
          />
    <div className='container' style={{maxWidth:'1000px'}}>
        {loading ?
        <div>
            <div>
                <Videos />
            </div>
        {subscriptionStatus === "active" ?(
            <div className="subscription">
                <Subscription/>
            </div>
        ):''}
        <div className='vendor mx-auto py-3'>
            <label htmlFor="vendor" className='form-label fs-4'>Choose the cloud service provider</label>
            <select className='form-control' name="vendor" id="vendor" defaultValue="aws" onChange={handleVendor}>
                <option value="aws">Amazon Web Services (AWS)</option>
                <option value="gcp">Google Cloud Platform (GCP)</option>
                <option value="azure">Microsoft Azure</option>
            </select>
        </div>
        <div className="services mx-auto py-3">
            <div htmlFor="service" className="form-label fs-4 mt-3">Services</div>
            <div className="row">
            {serviceList && serviceList.length > 0 ? 
                (serviceList.map(service => (
                <div key={service.services} className='d-flex align-content-center col-6 col-sm-4 col-lg-3'>
                <input
                    type="checkbox"
                    className="me-1"
                    id={service.services.toLowerCase()}
                    name="service"
                    value={service.services.toLowerCase()}
                    onChange={handleServices}
                    checked={selectedServices.includes(service.services.toLowerCase())}
                />
                <label htmlFor={service.services.toLowerCase()} className='px-lg-2'>{service.services}</label>
                </div>
            ))):(
                <div>We’re working to make this service available shortly. Thank you for your patience.</div>
            )}
            </div>
        </div>
        <div className="duration mx-auto py-3">
            <label htmlFor="duration" className='form-label fs-4 mt-3'>Duration</label>
            <select name="duration" id="duration" className="form-control" onChange={(e)=>{setDuration(e.target.value);setStatus(false)}}>
                <option value="0">0 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1 hour 30 minutes</option>
                <option value="120">2 hours</option>
                <option value="180">3 hours</option>
                <option value="240">4 hours</option>
                <option value="300">5 hours</option>
                <option value="360">6 hours</option>
                <option value="420">7 hours</option>
                <option value="480">8 hours</option>
                <option value="540">9 hours</option>
                <option value="600">10 hours</option>
                <option value="660">11 hours</option>
                <option value="720">12 hours</option>
                <option value="1440">1 Day</option>
                <option value="2880">2 Days</option>
                <option value="4320">3 Days</option>
            </select>
        </div>
        <div className="price">
            <div className="text-end">
                <samp className='me-xl-5 p-2'>
                    <strong >Price Estimation: </strong>
                    {price.toFixed(2)}
                </samp>
            </div>
        </div>
        <div className="payment-detail mx-auto py-3">
            <hr />
            {selectedServices && selectedServices.length > 0 && status ?
            (
            <div>
                <h5>Proceed to Pay</h5>
                <PaymentGateway 
                    order_id={serviceRes.orderid}
                    amount={serviceRes.cost} 
                    currency="INR" 
                    solution_kit="cloud"
                />
            </div>
            ):(
            <div className="text-center">
                <button className='btn-default p-2 fw-100' onClick={()=>handleStatus()}>
                    click here to proceed
                </button>
            </div>
            )
            }
        </div>
        </div> :
        <div className="text-center m-5 p-5">
            <ThreeDot variant="bounce" color="#cae8ff" size="200px" text="please wait" textColor="#549acf" />
        </div>}
    </div>
    </>
  )
}

export default CloudSandbox