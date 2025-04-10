import React from 'react'
import { NavLink } from 'react-router-dom'

const Projects = () => {
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
        <div className="title text-center"><h2 className="p-3">IOT PROJECTs</h2></div>
        <ul className="list-group">
            {
            iot_array().map((iot_project)=>{
            return( 
                <li className='list-group-item' key={iot_project.id}><NavLink to={iot_project.url}><h2>{iot_project.project}</h2></NavLink><hr /></li>
            )})
            }
        </ul>
    </div>
    <hr />
    </>
  )
}

export default Projects