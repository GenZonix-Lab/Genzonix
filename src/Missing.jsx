import React from 'react'
import { Link } from 'react-router-dom'
import { BsQuestion } from 'react-icons/bs'
import { CiSquareQuestion } from "react-icons/ci";
import { IoMdArrowDropright } from "react-icons/io";

const Missing = () => {
  return (
    <div className='container'>
        <div className="m-auto text-center">
            <div className="d-grid justify-content-center p-5">
                <div className='me-2'>
                    <CiSquareQuestion 
                        size={200}
                    />
            
                </div>
            <div>
                <h1 style={{color:"#fff700ff"}}>Looking for something?</h1>
                <p className='fs-3'>We're sorry. The Web address you entered is not a functioning page on our site.</p>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <h4><IoMdArrowDropright />
                            <strong>Go to Genzonix.in's <Link to={"/"} style={{
                                    textDecoration: "underline",
                                    color: "#ff9900"
                                }}>Home</Link> Page
                            </strong>
                        </h4>
                    </li>
                </ul>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Missing