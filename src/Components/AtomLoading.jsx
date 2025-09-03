import React from 'react'
import { Atom } from 'react-loading-indicators'

const AtomLoading = () => {
  return (
    <div className="text-center m-5">
        <Atom color="#8488df" size="large" text="Please wait..." textColor="#ff00df" />
    </div>
  )
}

export default AtomLoading