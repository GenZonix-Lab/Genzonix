import React, { useState } from 'react'
import '@aws-amplify/ui-react/styles.css'
import './NotifyForm.css'

const NotifyForm = () => {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        educationType: '', // 'college' or 'school'
        degree: '',
        otherDegree: '',
        otherCourse: '',
        year: '',
        collegeName: '',
        class: '',
        schoolName: '',
        whatsappNumber: '',
        projectIdea: '',
        referenceVideoLink: ''
    })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleEducationTypeChange = (e) => {
    const value = e.target.value
    setFormData(prev => ({
      ...prev,
      educationType: value,
      degree: '',
      otherDegree: '',
      otherCourse: '',
      year: '',
      collegeName: '',
      class: '',
      schoolName: ''
    }))
    if (errors.educationType) {
      setErrors(prev => ({
        ...prev,
        educationType: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.educationType) {
      newErrors.educationType = 'Please select education type'
    }

    if (formData.educationType === 'college') {
      if (!formData.degree) newErrors.degree = 'Degree is required'
      if (formData.degree === 'others') {
        if (!formData.otherDegree.trim()) {
          newErrors.otherDegree = 'Please enter your degree'
        }
        if (!formData.otherCourse.trim()) {
          newErrors.otherCourse = 'Please enter your course'
        }
      }
      if (!formData.year) newErrors.year = 'Year is required'
      if (!formData.collegeName.trim()) {
        newErrors.collegeName = 'College name is required'
      }
    } else if (formData.educationType === 'school') {
      if (!formData.class) newErrors.class = 'Class is required'
      if (!formData.schoolName.trim()) {
        newErrors.schoolName = 'School name is required'
      }
    }

    if (!formData.whatsappNumber.trim()) {
      newErrors.whatsappNumber = 'WhatsApp number is required'
    } else if (!/^\d{10}$/.test(formData.whatsappNumber.replace(/\D/g, ''))) {
      newErrors.whatsappNumber = 'Please enter a valid 10-digit WhatsApp number'
    }

    if (!formData.projectIdea.trim()) {
      newErrors.projectIdea = 'Project idea is required'
    }

    // Reference Video Link is optional - only validate if provided
    if (formData.referenceVideoLink.trim() && !isValidUrl(formData.referenceVideoLink)) {
      newErrors.referenceVideoLink = 'Please enter a valid URL'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (url) => {
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }
  const handleNotify = async(data) => {
    console.log(data)
    setLoading(true)
    setMessage('')
    const userName = `Name: ${formData.name} - WhatsApp Number: ${formData.whatsappNumber}`;
    const details = formData.educationType === 'school' ? `${formData.educationType} : ${formData.schoolName} class : ${formData.class}` : (formData.degree !== 'others') ? `${formData.educationType}: ${formData.collegeName}, degree: (${formData.degree}), Year: ${formData.year}` : `${formData.educationType} : ${formData.collegeName}, degree: ${formData.otherDegree} in ${formData.otherCourse} Year: ${formData.year}`;

    try {
      const response = await fetch('https://graph.facebook.com/v22.0/877649195440375/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_WA_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "messaging_product": "whatsapp",
          "to": "919487048924",
          "type": "template",
          "template": {
            "name": "form_v2",
            "language": { "code": "en_US" },
            "components": [{
              "type": "body",
              "parameters": [
                { "type": "text", "text": userName},
                { "type": "text", "text": details},
                { "type": "text", "text": formData.projectIdea},
                { "type": "text", "text": formData.referenceVideoLink || 'N/A' }
              ]
            }]
          }
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const responseData = await response.json()
      console.log('WhatsApp message sent:', responseData)
      setMessage('Message sent successfully!')

      // Reset form after successful submission
      setTimeout(() => {
      setFormData({
          name: '',
          educationType: '',
          degree: '',
          otherDegree: '',
          otherCourse: '',
          year: '',
          collegeName: '',
          class: '',
          schoolName: '',
          whatsappNumber: '',
          projectIdea: '',
          referenceVideoLink: ''
        })
        setSubmitted(false)
        setMessage('')
      }, 2000)

    } catch (error) {
      console.error('Error sending WhatsApp message:', error)
      setMessage(`Error: ${error.message}`)
      setSubmitted(false)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Filter out empty values from formData
      const filteredData = Object.entries(formData).reduce((acc, [key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          acc[key] = value
        }
        return acc
      }, {})

      setSubmitted(true)
      // Send WhatsApp notification
      handleNotify(filteredData)
    }
  }

  return (
    <div className="notify-form-container">
      <div className="notify-form-wrapper">
        <h2 className="mb-4 fw-bold text-dark">
          <i className="bi bi-rocket-takeoff me-2"></i>Project Submission Form
        </h2>
        {submitted && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <i className="bi bi-check-circle-fill me-2"></i>
            <strong>Success!</strong> Form submitted successfully. Thank you for your submission.
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3 text-start">
            <label htmlFor="name" className="form-label fw-600">
              <i className="bi bi-person-fill me-2 text-primary"></i>Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            />
            {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
          </div>

          {/* Education Type */}
          <div className="mb-3 text-start">
            <label className="form-label fw-600">
              <i className="bi bi-mortarboard-fill me-2 text-primary"></i>Education Type *
            </label>
            <div className="d-flex gap-5 ms-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="educationType"
                  id="educationCollege"
                  value="college"
                  checked={formData.educationType === 'college'}
                  onChange={handleEducationTypeChange}
                />
                <label className="form-check-label" htmlFor="educationCollege">
                  College
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="educationType"
                  id="educationSchool"
                  value="school"
                  checked={formData.educationType === 'school'}
                  onChange={handleEducationTypeChange}
                />
                <label className="form-check-label" htmlFor="educationSchool">
                  School
                </label>
              </div>
            </div>
            {errors.educationType && <div className="invalid-feedback d-block">{errors.educationType}</div>}
          </div>

          {/* College Section */}
          {formData.educationType === 'college' && (
            <>
              <div className="mb-3 text-start">
                <label htmlFor="degree" className="form-label fw-600">
                  <i className="bi bi-book-fill me-2 text-primary"></i>Degree *
                </label>
                <select
                  id="degree"
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  className={`form-select ${errors.degree ? 'is-invalid' : ''}`}
                >
                  <option value="">Select Degree</option>
                  <optgroup label="B.E. (Bachelor of Engineering)">
                    <option value="BE-Mechanical">B.E. - Mechanical Engineering</option>
                    <option value="BE-ECE">B.E. - Electronics & Communication Engineering</option>
                    <option value="BE-CSE">B.E. - Computer Science Engineering</option>
                    <option value="BE-Civil">B.E. - Civil Engineering</option>
                    <option value="BE-Electrical">B.E. - Electrical Engineering</option>
                    <option value="BE-Production">B.E. - Production Engineering</option>
                    <option value="BE-Biomedical">B.E. - Biomedical Engineering</option>
                  </optgroup>
                  <optgroup label="B.Tech (Bachelor of Technology)">
                    <option value="BTech-Mechanical">B.Tech - Mechanical Engineering</option>
                    <option value="BTech-ECE">B.Tech - Electronics & Communication Engineering</option>
                    <option value="BTech-CSE">B.Tech - Computer Science Engineering</option>
                    <option value="BTech-Civil">B.Tech - Civil Engineering</option>
                    <option value="BTech-Electrical">B.Tech - Electrical Engineering</option>
                    <option value="BTech-IT">B.Tech - Information Technology</option>
                    <option value="BTech-Aeronautical">B.Tech - Aeronautical Engineering</option>
                  </optgroup>
                  <optgroup label="B.Sc. (Bachelor of Science)">
                    <option value="BSc-Physics">B.Sc. - Physics</option>
                    <option value="BSc-Chemistry">B.Sc. - Chemistry</option>
                    <option value="BSc-Mathematics">B.Sc. - Mathematics</option>
                    <option value="BSc-CS">B.Sc. - Computer Science</option>
                    <option value="BSc-Biology">B.Sc. - Biology</option>
                  </optgroup>
                  <optgroup label="B.C.A. (Bachelor of Computer Applications)">
                    <option value="BCA">B.C.A. - Computer Applications</option>
                  </optgroup>
                  <optgroup label="M.E. (Master of Engineering)">
                    <option value="ME-Mechanical">M.E. - Mechanical Engineering</option>
                    <option value="ME-ECE">M.E. - Electronics & Communication Engineering</option>
                    <option value="ME-CSE">M.E. - Computer Science Engineering</option>
                    <option value="ME-Power">M.E. - Power Systems</option>
                  </optgroup>
                  <optgroup label="M.Tech (Master of Technology)">
                    <option value="MTech-Mechanical">M.Tech - Mechanical Engineering</option>
                    <option value="MTech-ECE">M.Tech - Electronics & Communication Engineering</option>
                    <option value="MTech-CSE">M.Tech - Computer Science Engineering</option>
                    <option value="MTech-IT">M.Tech - Information Technology</option>
                  </optgroup>
                  <optgroup label="M.Sc. (Master of Science)">
                    <option value="MSc-Physics">M.Sc. - Physics</option>
                    <option value="MSc-Chemistry">M.Sc. - Chemistry</option>
                    <option value="MSc-Mathematics">M.Sc. - Mathematics</option>
                    <option value="MSc-CS">M.Sc. - Computer Science</option>
                  </optgroup>
                  <option value="others">Others</option>
                </select>
                {errors.degree && <div className="invalid-feedback d-block">{errors.degree}</div>}
              </div>

              {formData.degree === 'others' && (
                <>
                  <div className="mb-3 text-start">
                    <label htmlFor="otherDegree" className="form-label fw-600">
                      <i className="bi bi-pencil-fill me-2 text-primary"></i>Enter Degree *
                    </label>
                    <input
                      type="text"
                      id="otherDegree"
                      name="otherDegree"
                      value={formData.otherDegree}
                      onChange={handleInputChange}
                      placeholder="e.g., B.Sc in Physics, Diploma in IT"
                      className={`form-control ${errors.otherDegree ? 'is-invalid' : ''}`}
                    />
                    {errors.otherDegree && <div className="invalid-feedback d-block">{errors.otherDegree}</div>}
                  </div>

                  <div className="mb-3 text-start">
                    <label htmlFor="otherCourse" className="form-label fw-600">
                      <i className="bi bi-book-fill me-2 text-primary"></i>Enter Course *
                    </label>
                    <input
                      type="text"
                      id="otherCourse"
                      name="otherCourse"
                      value={formData.otherCourse}
                      onChange={handleInputChange}
                      placeholder="e.g., Computer Science, Mechanical Engineering"
                      className={`form-control ${errors.otherCourse ? 'is-invalid' : ''}`}
                    />
                    {errors.otherCourse && <div className="invalid-feedback d-block">{errors.otherCourse}</div>}
                  </div>
                </>
              )}

              <div className="mb-3 text-start">
                <label htmlFor="year" className="form-label fw-600">
                  <i className="bi bi-calendar-event me-2 text-primary"></i>Year *
                </label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className={`form-select ${errors.year ? 'is-invalid' : ''}`}
                >
                  <option value="">Select Year</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                </select>
                {errors.year && <div className="invalid-feedback d-block">{errors.year}</div>}
              </div>

              <div className="mb-3 text-start">
                <label htmlFor="collegeName" className="form-label fw-600">
                  <i className="bi bi-building me-2 text-primary"></i>College Name *
                </label>
                <input
                  type="text"
                  id="collegeName"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleInputChange}
                  placeholder="Enter your college name"
                  className={`form-control ${errors.collegeName ? 'is-invalid' : ''}`}
                />
                {errors.collegeName && <div className="invalid-feedback d-block">{errors.collegeName}</div>}
              </div>
            </>
          )}

          {/* School Section */}
          {formData.educationType === 'school' && (
            <>
              <div className="mb-3 text-start">
                <label htmlFor="class" className="form-label fw-600">
                  <i className="bi bi-book-half me-2 text-primary"></i>Class *
                </label>
                <select
                  id="class"
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                  className={`form-select ${errors.class ? 'is-invalid' : ''}`}
                >
                  <option value="">Select Class</option>
                  <option value="3">Class 3</option>
                  <option value="4">Class 4</option>
                  <option value="5">Class 5</option>
                  <option value="6">Class 6</option>
                  <option value="7">Class 7</option>
                  <option value="8">Class 8</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                </select>
                {errors.class && <div className="invalid-feedback d-block">{errors.class}</div>}
              </div>

              <div className="mb-3 text-start">
                <label htmlFor="schoolName" className="form-label fw-600">
                  <i className="bi bi-building me-2 text-primary"></i>School Name *
                </label>
                <input
                  type="text"
                  id="schoolName"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                  placeholder="Enter your school name"
                  className={`form-control ${errors.schoolName ? 'is-invalid' : ''}`}
                />
                {errors.schoolName && <div className="invalid-feedback d-block">{errors.schoolName}</div>}
              </div>
            </>
          )}

          {/* WhatsApp Number */}
          <div className="mb-3 text-start">
            <label htmlFor="whatsappNumber" className="form-label fw-600">
              <i className="bi bi-chat-left-text me-2 text-primary"></i>WhatsApp Number *
            </label>
            <input
              type="tel"
              id="whatsappNumber"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleInputChange}
              placeholder="Enter 10-digit WhatsApp number"
              className={`form-control ${errors.whatsappNumber ? 'is-invalid' : ''}`}
            />
            {errors.whatsappNumber && <div className="invalid-feedback d-block">{errors.whatsappNumber}</div>}
          </div>

          {/* Project Idea */}
          <div className="mb-3 text-start">
            <label htmlFor="projectIdea" className="form-label fw-600">
              <i className="bi bi-lightbulb me-2 text-primary"></i>Project Idea *
            </label>
            <textarea
              id="projectIdea"
              name="projectIdea"
              value={formData.projectIdea}
              onChange={handleInputChange}
              placeholder="Describe your project idea in detail..."
              rows="5"
              className={`form-control ${errors.projectIdea ? 'is-invalid' : ''}`}
            />
            {errors.projectIdea && <div className="invalid-feedback d-block">{errors.projectIdea}</div>}
          </div>

          {/* Reference Video Link */}
          <div className="mb-3 text-start">
            <label htmlFor="referenceVideoLink" className="form-label fw-600">
              <i className="bi bi-play-circle me-2 text-primary"></i>Reference Video Link <span className="text-muted">(Optional)</span>
            </label>
            <input
              type="url"
              id="referenceVideoLink"
              name="referenceVideoLink"
              value={formData.referenceVideoLink}
              onChange={handleInputChange}
              placeholder="https://example.com/video (optional)"
              className={`form-control ${errors.referenceVideoLink ? 'is-invalid' : ''}`}
            />
            {errors.referenceVideoLink && <div className="invalid-feedback d-block">{errors.referenceVideoLink}</div>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-notify btn-lg w-100 fw-bold mt-4"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Sending...
              </>
            ) : (
              <>
                <i className="bi bi-send-fill me-2"></i>
                Submit
              </>
            )}
          </button>
          {message && (
                <div className={`alert mt-3 ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
                  {message}
                </div>
              )}
        </form>
      </div>
    </div>
  )
}

export default NotifyForm