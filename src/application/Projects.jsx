import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { fetchAuthSession } from 'aws-amplify/auth';
import { ThreeDot } from 'react-loading-indicators';
const Projects = () => {
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        const getToken = async () => {
            try{
                const session = await fetchAuthSession(); // await the session
                const token = session.tokens.idToken.toString(); // now you have the JWT string
                if (!token) {
                    throw new Error("No idToken found in session");
                }
                else{ setLoading(true)}
                return token;
            }catch(err){
                window.location.href = "/Auth";
            }
        };
        getToken();
    },[])
    //IoT Project list
    const iot_array=()=>[
        {
            id:'1',
            project:'CHANGE LED COLOR AND ON/OFF LED THROUGH BLUETOOTH',
            url: '/GZXP24001'
        },
        {
            id:'2',
            project:'SMART PARKING EMAIL-NOTIFICATION SYSTEM',
            url: '/GZXP24002' 
        },
         {
            id:'3',
            project:'SMART SECURITY INDICATION AND EMAIL NOTIFICATION SYSTEM',
            url: '/GZXP24003'
        },
        {
            id:'4',
            project:'SMART HOME AUTOMATION SYSTEM',
            url: '/GZXP24004'
        },
        {
            id:'5',
            project:'VOICE COMMAND THROUGH HOME AUTOMATION SYSTEM',
            url: '/GZXP24005'
        },
    ]
  return (
    <>
    <div className="container">
        {loading ?
        <div>
            <div className="title text-center"><h2 className="p-3">IOT PROJECTs</h2></div>
            <ul className="list-group">
                {
                iot_array().map((iot_project)=>{
                return( 
                    <li className='list-group-item' key={iot_project.id}><NavLink to={iot_project.url}><h2>{iot_project.project}</h2></NavLink><hr /></li>
                )})
                }
            </ul>
        </div>:
        <div className='text-center m-5 p-5'>
            <ThreeDot variant="bounce" color="#cae8ff" size="200px" text="please wait" textColor="#549acf" />
        </div>}
    </div>
    <hr />
    </>
  )
}

export default Projects