import React from 'react'

const Faq = () => {
  const userid='ba23ndedhhh'
  const questioner_name='Azeem Ahamed'
  return (
    <>
    <div className='container'>
      <nav className="mt-3">
        <form className="d-flex justify-content-center">
          <input className=" form-control" type="search" placeholder="Search your Doubt" aria-label="Search" />
          <button className="btn btn-default ms-2" type="submit">Search</button>
        </form><hr />
        <form className='mt-2 ' action="handleQuestions" method='POST'>
          <div className="form-label">Your Questions</div>
          <div ><textarea className="form-control" name="Questions" id="question" cols="30"></textarea></div>
          <div className='d-flex justify-content-center'><button className='btn btn-default m-2' type='submit'><em>Submit</em></button></div>
        </form><hr />
      </nav>
      <div className="display">
        <div className="question d-flex justify-content-between">
          <div><h5>What is IOT?</h5></div>
          <div className="questioner text-muted" key={userid}>
            – {questioner_name}
          </div>  
        </div>
        <div className="answer">
          <li className='list-group-item'>Iot stands for Internet Of Things. When a device has a internet to analyze the device performance is known as IoT.</li>
        </div>
      </div>
    </div>
    </>
  )
}

export default Faq