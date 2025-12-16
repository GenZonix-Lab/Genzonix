import React, {useState} from 'react'

const InitialProgress = () => {
    const [timing, setTiming] = useState(0);
    const [msg, setMsg] = useState('Form Submitted');

    // Dummy timing update for demonstration
    const handleProgress = (progress,messageInfo) => {
        setMsg(messageInfo);
        setTiming(progress);
    }


    return (
        <div>
            <h5 className='text-start mb-3 ms-2'>Workflow:</h5>
            <div className="position-relative m-4">
                <div className="progress position-relative" style={{height:"6px", top:"-3px"}}>
                    <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        style={{ width: `${timing}%`}}
                        aria-valuenow={timing}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                    </div>
                </div>
                <button 
                    onClick={()=>handleProgress(0,'Form Submitted')}
                    type="button" 
                    className={`position-absolute top-0 translate-middle btn btn-sm rounded-pill ${timing>=0?'btn-primary':'btn-secondary'}`} 
                    style={{width: '2rem', height:'2rem', left: '0%'}}
                >
                    1
                </button>
                <button 
                    onClick={()=>handleProgress(20,'Cost Estimation')}
                    type="button" 
                    className={`position-absolute top-0 translate-middle btn btn-sm rounded-pill ${timing >= 20 ?'btn-primary':'btn-secondary'}`} 
                    style={{width: '2rem', height:'2rem', left: '20%'}}
                >
                    2
                </button>
                <button 
                    onClick={()=>handleProgress(40,'Order Confirmation')}
                    type="button" 
                    className={`position-absolute top-0 translate-middle btn btn-sm rounded-pill ${timing>=40?'btn-primary':'btn-secondary'}`} 
                    style={{width: '2rem', height:'2rem', left: '40%'}}
                >
                    3
                </button>
                <button 
                    onClick={()=>handleProgress(60,'Production Started')}
                    type="button" 
                    className={`position-absolute top-0 translate-middle btn btn-sm rounded-pill ${timing>=60?'btn-primary':'btn-secondary'}`} 
                    style={{width: '2rem', height:'2rem', left: '60%'}}
                >
                    4
                </button>
                <button 
                    onClick={()=>handleProgress(80,'Order Delivery')}
                    type="button" 
                    className={`position-absolute top-0 translate-middle btn btn-sm rounded-pill ${timing>=80?'btn-primary':'btn-secondary'}`} 
                    style={{width: '2rem', height:'2rem', left: '80%'}}
                >
                    5
                </button>
                <button 
                    onClick={()=>handleProgress(100,'Doubt Clarification')}
                    type="button" 
                    className={`position-absolute top-0 translate-middle btn btn-sm rounded-pill ${timing>=100?'btn-primary':'btn-secondary'}`} 
                    style={{width: '2rem', height:'2rem', left: '100%'}}
                >
                    6
                </button>
            </div>
            <div className='text-start fs-6 mb-3 ms-2'>
                {msg}
            </div>
        </div>
    )
}

export default InitialProgress