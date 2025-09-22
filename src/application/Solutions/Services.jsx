import React from 'react'

const Services = ({serviceList,handleServices,selectedServices}) => {
  return (
    <>
        <h3 htmlFor="service" className="form-label fs-4 mt-3">Services</h3>
        <div className="row">
        {serviceList && serviceList.length > 0 ? 
            (serviceList.map(service => (
                <div key={service.service} className='p-2 col-12 col-sm-6 col-lg-4 col-xl-3'>
                    <button 
                    type="button"
                    className="btn btn-default text-start w-100"
                    value={service.service.toLowerCase()}
                    style={
                        selectedServices.includes(service.service.toLowerCase())
                        ? { backgroundColor: '#549acf', color: 'white', border: '1px solid #549acf' }
                        : { backgroundColor: 'white', color: '#549acf', border: '1px solid #549acf'}
                        
                    }
                    >
                    <input
                        type="checkbox"
                        className="me-1 d-none"
                        id={service.service.toLowerCase()}
                        name={service.service.toLowerCase()}
                        value={service.service.toLowerCase()}
                        onChange={handleServices}
                        tabIndex={0}
                        checked={selectedServices.includes(service.service.toLowerCase())}
                    />
                    <label htmlFor={service.service.toLowerCase()} style={{cursor:"pointer"}} className='px-lg-2 w-100'>{service.service}</label>
                    </button>
                </div>
            ))):(
                <em>We’re working to make this service available shortly. Thank you for your patience.</em>
            )}
        </div>
    </>
  )
}

export default Services