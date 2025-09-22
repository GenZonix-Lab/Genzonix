import React,{useEffect, useState} from 'react'
import { fetchAuthSession } from 'aws-amplify/auth';
import {IoMdRefreshCircle} from 'react-icons/io'
import TerminatedSandbox from './TerminatedSandbox';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const subscriptionApi = `https://yn5xuarjc7.execute-api.ap-south-1.amazonaws.com/3alim/services/subscription`
const Subscription = () => {
    //reload details
    const [reload, setReload] = useState(0);
    const handleReload=()=>{
        setReload(reload=> reload+1)
        return;
    }
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
        }
    };
    //fetch subscription details
    const [receivedTime, setReceivedTime] = useState('');               //detetion_time
    const [timeDuration, setTimeDuration] = useState(0);                //duration in minutes
    const [accountId, setAccountId] = useState('No Active Account')     //account_id
    const [username, setUsername] = useState('***************')         //awsid
    const [password, setPassword]=useState('***************')           //password
    const [services, setServices] = useState([])                        //selected services
    const [vendorLink, setVendorLink]=useState('')                      //console_login_url
    useEffect(()=>{
        const fetchSubscription=async () => {
            const token=await getToken();
            const getData = {
                method:'GET',
                headers:{
                    'Authorization': `Bearer ${token}`,
                    }
                }
            try{
                const response = await fetch(subscriptionApi,getData);
                if (!response.ok) throw Error("Data Not Received properly, Please Reload. ")
                const result = await response.json()
                result.map((data) => {
                    if (data?.status === 'active') {
                        setReceivedTime(data.deletion_at);
                        setTimeDuration(data.duration);
                        setAccountId(data.account_id);
                        setUsername(data.awsid);
                        setPassword(data.password);
                        setVendorLink(data.console_login_url);
                        setServices(data.services);
                    } else {
                        setAccountId('No Active Account');
                        setUsername('***************');
                        setPassword('***************');
                        setVendorLink('');
                        setReceivedTime('');
                        setTimeDuration(0);
                        setServices([]);
                    }
                });
            }
            catch (error){
                console.error("Error fetching subscription data", error);
            }
        }
        fetchSubscription();
    },[reload])

    //set timer interface
    const [dur_days, setdays]=useState(0);
    const [dur_hour, setHour]=useState(0);
    const [dur_minute, setMinute]=useState(0);
    const [dur_second, setSecond]=useState(0);
    useEffect(() => {
        if (!receivedTime) return;
        const utcDate = new Date(receivedTime + 'Z');   // 'Z' marks it as UTC
        const localDate = new Date(utcDate.toLocaleString('en-US', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }));

        const interval = setInterval(() => {
            const now = new Date();
            const durationMs = localDate - now;

            if (durationMs <= 0) {
                console.log("Time reached!");
                setdays(0);
                setHour(0);
                setMinute(0);
                setSecond(0);
                clearInterval(interval);
                return;
            }
            const durationSec = Math.floor(durationMs / 1000);
            const durationMin = Math.floor(durationSec / 60);
            const durationHr = Math.floor(durationMin / 60);
            const durationDay = Math.floor(durationHr / 24);
            setdays(durationDay);
            setHour(durationHr);
            setMinute(durationMin);
            setSecond(durationSec);
        }, 1000);

        return () => clearInterval(interval);
    }, [receivedTime]);

    const time = {
        days: dur_days,
        hours: dur_hour % 24,
        minutes: dur_minute % 60,
        seconds: dur_second % 60
    };
    const timing= (dur_minute/timeDuration)*100 || 0;
     
    
return (
<div className='container'>
    <div className='d-flex justify-content-between'>
        <span className='fs-4 my-3'>Session:</span>
        <div className='text-end'>
            <button className="my-3 btn btn-dark bg-transparent border-0" onClick={()=>handleReload()}><IoMdRefreshCircle size={30}/></button>
        </div>
    </div>
    <div className="progress m-3">
        <div
            className="progress-bar progress-bar-striped progress-bar-animated fs-3"
            role="progressbar"
            style={{ width: `${timing}%`,color:'#000'}}
            aria-valuenow={timing}
            aria-valuemin="0"
            aria-valuemax="100"
        >
            <div className='position-absolute end-50'>{`${Math.round(timing)}%`}</div>
        </div>
    </div>
    <div className="duration text-end">
        <strong>Duration: </strong>
        <em className='px-2'>
            {time.days?String(time.days).padStart(2, '0') + ' :':""}
            {time.hours?String(time.hours).padStart(2, '0') + ' :':""} 
            {time.minutes?String(time.minutes).padStart(2, '0')+' :':''} 
            {time.seconds?String(time.seconds).padStart(2, '0'):'0 s'}
        </em>
    </div>
    <table>
        <tbody>
            <tr className="accountId" name="accountId" id="accountId">
                <td className="subscription-label fs-6">Account ID</td>
                <td className='subscription-control fs-6 ps-3'>{accountId}</td>
            </tr>
            <tr className="username" name="username" id="username">
                <td className="subscription-label fs-6">Username</td>
                <td className='subscription-control fs-6 ps-3'>{username}</td>
            </tr>
            <tr className="password" name="password" id="password">
                <td className="subscription-label fs-6">Password</td>
                <td className='subscription-control fs-6 ps-3'>{password}</td>
            </tr>
            <tr className="services" name="services" id="services">
                <td className="subscription-label fs-6">Services</td>
                <td className='subscription-control fs-6 ps-3'>{services.length > 0 ? services.join(' | ').toUpperCase() : 'No Services Selected'}</td>
            </tr>
        </tbody>
    </table>
    <div className='text-end'>
        <span className='fs-5 me-2'>Note: </span>
        <em style={{color:'red'}}>To create a resourse using tag [CreatedBy : {username}]</em>
    </div>
    <div className='text-center my-3'>
        <a target="blank" href={vendorLink}>
            <button className='btn btn-default'>Login Page</button>
        </a>
    </div>
</div>
)
}

export default Subscription