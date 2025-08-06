import React,{useEffect, useState} from 'react'
import { fetchAuthSession } from 'aws-amplify/auth';
import {IoMdRefreshCircle} from 'react-icons/io'
import TerminatedSandbox from './TerminatedSandbox';
const subscriptionApi = `https://yn5xuarjc7.execute-api.ap-south-1.amazonaws.com/3alim/services/subscription`
const Subscription = () => {
    const [dur_hour, setHour]=useState(0);
    const [dur_minute, setMinute]=useState(0);
    const [dur_second, setSecond]=useState(0);
    const [receivedTime, setReceivedTime] = useState('');
    const [timeDuration, setTimeDuration] = useState(0);
    const [accountId, setAccountId] = useState('No Active Account')            //account_id
    const [username, setUsername] = useState('***************')       //awsid
    const [password, setPassword]=useState('***************')                //password
    const [vendorLink, setVendorLink]=useState('')      //console_login_url

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
        window.location.href = "/Auth";
        }
    };
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
            data.map( element => {
                if(element.status === "active"){
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
    useEffect(() => {
        if (!receivedTime) return;
        const utcDate = new Date(receivedTime + 'Z');   // 'Z' marks it as UTC
        const localDate = new Date(utcDate.toLocaleString('en-US', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }));

        const interval = setInterval(() => {
            const now = new Date();
            const durationMs = localDate - now;

            if (durationMs <= 0) {
                console.log("Time reached!");
                setHour(0);
                setMinute(0);
                setSecond(0);
                clearInterval(interval);
                return;
            }
            const durationSec = Math.floor(durationMs / 1000);
            const durationMin = Math.floor(durationSec / 60);
            const durationHr = Math.floor(durationMin / 60);
            setHour(durationHr);
            setMinute(durationMin);
            setSecond(durationSec);
        }, 1000);

        return () => clearInterval(interval);
    }, [receivedTime]);

    const time = {
        hours: dur_hour,
        minutes: dur_minute % 60,
        seconds: dur_second % 60
    };
    const timing= (dur_minute/timeDuration)*100 || 0;

    
return (
    <>
        <div className='container' style={{maxWidth:'1000px'}}>
            <div className='d-flex justify-content-between'>
                <span className='fs-4 my-3'>Session:</span>
                <div className='text-end'>
                    <button className="my-3 btn btn-dark bg-transparent border-0" onClick={()=>{window.location.reload()}}><IoMdRefreshCircle size={30}/></button>
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
                <em className='px-2'>{time.hours?String(time.hours).padStart(2, '0') + ' :':""} {time.minutes?String(time.minutes).padStart(2, '0')+' :':''} {time.seconds?String(time.seconds).padStart(2, '0'):'0 s'}</em>
            </div>
            <table>
                <tbody>
                    <tr className="accountId" name="accountId" id="accountId">
                        <td className="subscription-label fs-5">Account ID</td>
                        <td className='subscription-control fs-5 ps-3'>{accountId}</td>
                    </tr>
                    <tr className="username" name="username" id="username">
                        <td className="subscription-label fs-5">Username</td>
                        <td className='subscription-control fs-5 ps-3'>{username}</td>
                    </tr>
                    <tr className="password" name="password" id="password">
                        <td className="subscription-label fs-5">Password</td>
                        <td className='subscription-control fs-5 ps-3'>{password}</td>
                    </tr>
                </tbody>
            </table>
            <div className='text-end'>
                <span className='fs-5 me-2'>Note: </span>
                <em style={{color:'red'}}>To create a resourse using tag [CreatedBy : {username}]</em>
            </div>
            <div className='text-center mt-3'>
                <a target="blank" href={vendorLink}>
                <button className='btn btn-default'>Login Page</button>
            </a>
            </div>
        </div>
        <hr />
    </>
)
}

export default Subscription