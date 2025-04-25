import React from 'react'

const Contact = () => {
  return (
    <>
      <div className="container contact my-5" id="contact">
        <div className="container">
          <div className="title text-center"><h2>Contact <span>Me!</span></h2></div>
          <form action="#" method="POST">
            <div className="form-group px-xl-5 mx-xl-5 mb-3">
              <label htmlFor="name"><h4>Name</h4></label>
              <input type="text" name="name" className="form-control portfolio-contact-form" required />
            </div>
            <div className="form-group px-xl-5 mx-xl-5 mb-3">
              <label htmlFor="email"><h4>Email</h4></label>
              <input type="email" name="email" className="form-control portfolio-contact-form" required />
            </div>
            <div className="form-group px-xl-5 mx-xl-5 mb-3">
              <label htmlFor="message"><h4>Message</h4></label>
              <textarea name="message" className="form-control portfolio-contact-form" rows="5" required></textarea>
            </div>
            <div className="text-center p-3"><button type="submit" className="send-btn">Send</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Contact