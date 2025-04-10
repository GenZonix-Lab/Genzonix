import React from 'react'


const Help = () => {
  return (
    <div className='container py-5'>
      <p className='text-muted'>Support At Genzonix, we are committed to providing you with the best support for your DIY kits and projects. Whether you have questions about setting up your IoT devices, troubleshooting issues, or need guidance on cloud and AI computer vision projects, we’re here to help!</p>
      
      <h2 className="mt-4">Contact Support</h2>
      <p>If you need assistance, feel free to reach out to our support team. We are available to answer your queries and resolve issues as quickly as possible.</p>
      <ul className="list-group">
        <li className="list-group-item list-group-item-primary"><strong>Support Hours:</strong> Monday to Friday, 9:00 AM to 6:00 PM IST</li>
        <li className="list-group-item list-group-item-primary"><strong>Email:</strong> info@genzonix.com</li>
        <li className="list-group-item list-group-item-primary"><strong>Phone:</strong> +91 7358903892</li>
        <li className="list-group-item list-group-item-primary"><strong>Live Chat:</strong> Available on our website during business hours</li>
      </ul>
  
      <h2 className="mt-4">Frequently Asked Questions (FAQs)</h2>
      <p>Before reaching out, check our FAQ section for quick answers to common queries. We have compiled guides on product setup, troubleshooting steps, and best practices for using our DIY kits.</p>
      <a href="/support" className="btn btn-link">Visit our FAQ Page</a>
  
      <h2 className="mt-4">Community Support</h2>
      <p>Join our growing community of makers and tech enthusiasts! Share your projects, ask for advice, and collaborate with like-minded individuals.</p>
      <ul className="list-group">
        <li className="list-group-item list-group-item-primary"><a href="#" className="btn btn-link">Community Forum</a></li>
        <li className="list-group-item list-group-item-primary">
          Follow us on <a href="https://www.instagram.com/genzonixofficial/" className="bi bi-instagram btn btn-link" style={{color:"#050a30",textDecoration:"underline dotted"}}> Instagram</a>, and   <a href="http://www.linkedin.com/in/genzonix" className="btn btn-link bi bi-linkedin" style={{color:"#050a30",textDecoration:"underline dotted"}}>  LinkedIn</a> for updates and discussions.
        </li>
      </ul>
  
      <h2 className="mt-4">Warranty & Returns</h2>
      <p>We stand by the quality of our products. If you experience any issues with your kit, check our warranty and return policies.</p>
      <a href="#" className="btn btn-link" style={{color:"#cae8ff",textDecoration:"underline dotted"}}>Read Warranty & Returns Policy</a>
  
      <h2 className="mt-4">Technical Resources</h2>
      <p>Explore our knowledge base, documentation, and tutorials to get the most out of your Genzonix DIY kits.</p>
      <a href="#" className="btn btn-link" style={{color:"#cae8ff",textDecoration:"underline dotted"}}>Access Technical Resources</a>
  
      <p className="mt-4">If you need further assistance, don’t hesitate to contact us. We’re here to support you at every step of your learning journey!</p>
    </div>
  )
}

export default Help