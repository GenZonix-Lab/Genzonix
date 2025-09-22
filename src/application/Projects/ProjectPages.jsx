import { NavLink, useNavigate, useOutletContext } from 'react-router-dom'
import Loading from '../../Components/Loading';
import { useEffect, useRef } from 'react';
const ProjectPages = () => {
    const {userLoading} = useOutletContext();
    const navigate = useNavigate();
        //check user auth
        const userLoadingRef = useRef(userLoading);
    
        useEffect(() => {
            userLoadingRef.current = userLoading;
        }, [userLoading]);
        useEffect(() => {
            setTimeout(() => {
            if (userLoadingRef.current) {
            navigate("/Auth");
            }
        }, 3000);
        }, [navigate]);

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
        {userLoading ? <Loading/>:
            <div>
                <div className="title"><h4 className="f-lora fs-3 p-3">Internet of Things</h4></div>
                <ul className="list-group">
                    {
                    iot_array().map((iot_project)=>{
                    return( 
                        <li className='list-group-item' key={iot_project.id}>
                            <NavLink to={iot_project.url}>
                                <p>{iot_project.project}</p>
                            </NavLink><hr />
                        </li>
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