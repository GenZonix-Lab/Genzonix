import React from 'react'
import Subscription from './Subscription'
import TerminatedSandbox from './TerminatedSandbox'

const SubscriptionDetails = () => {
  return (
    <>
    <div className='container' style={{maxWidth:'1000px'}}>
        <h2>Subscription Details</h2>
        <Subscription/>
        <TerminatedSandbox/>
    </div>
    </>
  )
}

export default SubscriptionDetails