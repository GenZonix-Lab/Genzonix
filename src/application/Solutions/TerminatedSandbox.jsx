import React, {useEffect, useState} from 'react'
import { fetchAuthSession } from 'aws-amplify/auth';
const subscriptionApi = `https://yn5xuarjc7.execute-api.ap-south-1.amazonaws.com/3alim/services/subscription`
const TerminatedSandbox = () => {
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
    //get termination data
    const [services, setServices] = useState([]);
    useEffect(() => {
        const fetchSubscription = async () => {
            try{
                const token=await getToken();
                const response = await fetch(subscriptionApi,{
                    method:"GET",
                    headers:{
                        'Authorization': `Bearer ${token}`,
                    }
                })
                if(!response.ok) throw Error("data not received properly, Please reload again")
                const data = await response.json()
                setServices(data)
            }
            catch (err){
                console.error("Error fetching subscription data:", err);
                return;
            }
        }
        fetchSubscription()
    },[])
  return (
    <>
    <div className="container">
        <div className="row">
            {services.map((service, index) => {
                // Format the deletion date for display
                let formattedDate = '';
                if (service.deletion_at) {
                    const receivedTime = service.deletion_at;
                    const utcDate = new Date(receivedTime + 'Z');   // 'Z' marks it as UTC
                    const localDate = new Date(utcDate.toLocaleString('en-US', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }));
                    formattedDate = localDate.toLocaleString();
                }
                return (
                    <div className="col-md-4" key={index} style={{display: service.status === "terminated"? '': 'none'}}>
                        <div className="card mb-3">
                            <div className="card-body bg-dark">
                                <h5 className="card-title">{service.vendor} - {service.status}</h5>
                                <p className="card-text">Services: 
                                    {service.services.map(element=>(
                                        <ul className='list' style={{listStyle:'circle'}}>
                                            <li key={element}>{element}</li>
                                        </ul>
                                    ))}</p>
                                <p className="card-text">Terminated at: {formattedDate}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
    </>
  )
}

export default TerminatedSandbox