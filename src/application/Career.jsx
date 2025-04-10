import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaFileUpload } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
const Career = () => {
/*   const navigate = useNavigate()

  useEffect(() => {
    window.open("https://forms.gle/QEQCW7uBg242nzWv5", "_blank")
  }, [navigate])

   */
  return (
    <>
    <div className="container width-100">
      <h1>Job application form</h1>
      <p><b>Genzonix</b> is a forward-thinking company specializing in developing and distributing STEM DIY kits, designed to empower learners and enthusiasts with hands-on experience in cutting-edge technologies. Our projects span <b>IoT, Cloud Computing,</b> and <b>AI-powered Computer Vision</b>, enabling users to explore and innovate in these domains.</p>
      <h3>Job Role Overview</h3>
      <p>As a part of the Genzonix team, your role will involve:</p>
      <ul>
        <li>Designing and Developing DIY Kits: Conceptualize and create interactive kits featuring sensors like ADXL345, IoT modules, and AI tools.</li>
        <li>Product Innovation: Stay updated with technological trends to enhance kit functionality and user experience.</li>
        <li>Customer Support: Assist users with troubleshooting and project guidance.</li>
        <li>Content Creation: Develop instructional materials, tutorials, and demo projects for users to maximize kit utility.</li>
        <li>Collaboration: Work with cloud platforms (e.g., AWS with Route 53) to integrate server-based solutions into products.</li>
      </ul>
      <p>This is a dynamic opportunity to shape the future of tech learning while contributing to the growing ecosystem of STEM innovation.</p>

      <form action="/submit" method='post'>
        <div className="form-group ">
          <label htmlFor="Name">Full Name</label>
          <input type="text" name="Name" id="Name" required />
        </div>
        <div className="form-group">
          <label htmlFor="Email">Email</label>
          <input type="email" name="Email" id="Email" required />
        </div>
        <div className="form-group">
          <label htmlFor="Phone">Phone Number</label>
          <input type="tel" name="Phone" id="Phone" required />
        </div>
        <div className="form-group">
          <label htmlFor="Role">Role</label>
          <select name="Role" id="Role" required>
            <option value="Intern">Intern</option>
            <option value="Full-Time">Full-Time</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="Experience">Experience</label>
          <input type="number" name="Experience" id="Experience" required />
        </div>
        <div className="form-group">
          <label htmlFor="Location">Location</label>
          <input type="text" name="Location" id="Location" required />
        </div>
        <div className="form-group">
          <label htmlFor="Skills">Skills</label>
          <input type="text" name="Skills" id="Skills" required />
        </div>
        <div className="form-group">
          <label htmlFor="Education">Education</label>
          <input type="text" name="Education" id="Education" required />
        </div>
        <div className="form-group">
        <FaFileUpload
            type='file'
            name='resume'
            id='Resume'
            style={{ cursor: 'pointer', 
              fontSize: '2em',
              display: 'flex',
            }}
            required/>
          <label htmlFor="Resume" style={{
            display: 'flex', 
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '1.5em',
          }}>Upload Resume</label>
          
          <input type="file" name="Resume" id="Resume" required />
        </div>
        <div className="form-button">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    </>
  )
}

export default Career