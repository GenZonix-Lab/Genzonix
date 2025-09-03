import React, { useEffect, useState } from 'react'
import { fetchAuthSession } from 'aws-amplify/auth';

import PaymentGateway from '../Payment/PaymentGateway';
import Subscription from './Subscription';
import Videos from './Videos';
import Vendor from './Vendor';
import Services from './Services';

import ShowAlert from "../../Components/ShowAlert";
import Duration from './Duration';
import Paymentbutton from './Paymentbutton';
import Loading from '../../Components/Loading';
import { useNavigate, useOutletContext } from 'react-router-dom';

const subscriptionApi = `https://yn5xuarjc7.execute-api.ap-south-1.amazonaws.com/3alim/services/subscription`
const awsApi='https://yn5xuarjc7.execute-api.ap-south-1.amazonaws.com/3alim/services/aws'

const CloudSandbox = () => {
    const [alert,setAlert]=useState('');
    const [trig,setTrig]=useState(0);
    const [vendor,setVendor]=useState('aws')    
    const [selectedServices, setSelectedServices] = useState([]);
    const [duration,setDuration] = useState(0)
    const [status, setStatus]=useState(false)
    const [serviceList, setServiceList] = useState([]);
    
    const [servicesLoading, setServicesLoading] = useState(true);
    const [awsServiceList,setAwsServiceList] = useState([]);
    const gcpServiceList = [];
    const azureServiceList = [];
    const { userLoading} = useOutletContext();

    const navigate = useNavigate();
    //fetch services
    useEffect(() => {
        if(userLoading) return;
        const fetchData = async () => {
            try{
                const res = await fetch(awsApi);
                const data = await res.json();
                setAwsServiceList(data);
                setServiceList(data);
            } finally {
                setServicesLoading(false);
            }
        };
        fetchData();
    }, [userLoading]);
    //get Token
    const getToken = async () => {
        try{
        const session = await fetchAuthSession(); // await the session
        const token = session.tokens.idToken.toString(); // now you have the JWT string
        if (!token) {
            console.warn("User session not found. Redirecting to auth...");
            throw new Error("No idToken found in session");
        }
        return token;
        }catch(err){
        console.error("Error getting token:", err);
        navigate("/Auth");
        }
    };

    //Actived subscription details
    const [subscriptionStatus,setSubscriptionStatus] = useState(false);
    useEffect(() => {
        const fetchSubscription = async () => {
            if(userLoading) return navigate("/Auth");
            try{
                const token=await getToken();
                const response = await fetch(subscriptionApi,{
                    method:"GET",
                    headers:{
                        'Authorization': `Bearer ${token}`,
                    }
                })
                if (!response.ok) throw Error("Data Not Received properly, Please Reload. ")
                const data = await response.json()
                data.map( element => {
                    if(element.status === "active"){
                        setSubscriptionStatus(true);
                    }else if(element.status === "terminated"){
                        setSubscriptionStatus(false);
                    }
                })
            } catch (error) {
                console.error("Error fetching subscription:", error);
            }
            
        }
        fetchSubscription()
        },[])
    const handleServices = (event) => {
        const { value, checked } = event.target;
        let updatedServices = checked
        ? [...selectedServices, value]
        : selectedServices.filter(item => item !== value);
        
        setSelectedServices(updatedServices);
        setStatus(false);
    };

    

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
    {servicesLoading || userLoading ? <Loading/> :
        <div className='container'>
            {!subscriptionStatus ?
            <div>
                <Vendor 
                setVendor={setVendor}
                setSelectedServices={setSelectedServices}
                setServiceList={setServiceList}
                awsServiceList={awsServiceList}
                gcpServiceList={gcpServiceList}
                azureServiceList={azureServiceList}
            />
            <Services 
                serviceList={serviceList}
                handleServices={handleServices}
                selectedServices={selectedServices}
            />
            <Duration
                setStatus={setStatus}
                setDuration={setDuration}
            />
            <Paymentbutton
                price={price}
                selectedServices={selectedServices}
                status={status}
                setTrig={setTrig}
                setAlert={setAlert}
                duration={duration}
                vendor={vendor}
                setStatus={setStatus}
            />
            </div> :
            <Subscription /> 
            }
            <hr />
            <Videos />
        </div>
}
    </>
  )
}

export default CloudSandbox
