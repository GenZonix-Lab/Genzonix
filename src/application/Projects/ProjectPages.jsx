import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom'
import { fetchAuthSession } from 'aws-amplify/auth';
import { ThreeDot } from 'react-loading-indicators';
import Loading from '../../Components/Loading';
const ProjectPages = () => {
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate()
    const {userLoading} = useOutletContext();
    useEffect(()=>{
        const fetchLoad = async () => {
            if (userLoading) return navigate("/Auth")
            setLoading(false)
        }
        fetchLoad();
    },[userLoading])
    //IoT Project list
    const iot_array=()=>[
        {
            id:'1',
            project:'CHANGE LED COLOR AND ON/OFF LED THROUGH BLUETOOTH',
            url: 'Gzxp24001'
        },
        {
            id:'2',
            project:'SMART PARKING EMAIL-NOTIFICATION SYSTEM',
            url: 'Gzxp24002' 
        },
         {
            id:'3',
            project:'SMART SECURITY INDICATION AND EMAIL NOTIFICATION SYSTEM',
            url: 'Gzxp24003'
        },
        {
            id:'4',
            project:'SMART HOME AUTOMATION SYSTEM',
            url: 'Gzxp24004'
        },
        {
            id:'5',
            project:'VOICE COMMAND THROUGH HOME AUTOMATION SYSTEM',
            url: 'Gzxp24005'
        },
    ]
  return (
    <>
    <div className="container">
        {loading ? <Loading/>:
            <div>
                <div className="title"><h4 className="f-lora fs-3 p-3">Internet of Things</h4></div>
                <ul className="list-group">
                    {
                    iot_array().map((iot_project)=>{
                    return( 
                        <li className='list-group-item' key={iot_project.id}><NavLink to={iot_project.url}><p>{iot_project.project}</p></NavLink><hr /></li>
                    )})
                    }
                </ul>
            </div>
        }
    </div>
    </>
  )
}

export default ProjectPages