import React from 'react'
import { NavLink } from 'react-router-dom'
const Policy = () => {
  return (
    <>
    <div className='container mt-3'>
        <h3>🛡️ Warranty Policy</h3>
        <ol className='fs-4'>
            <li>Warranty Duration
                <ul className='fs-5'>
                    Most products come with a 7-day replacement warranty from the date of delivery, unless otherwise mentioned on the product page.
                </ul>
            </li>
            <li>Coverage - warranty covers:
                <ul className='fs-5'>
                    <li>Manufacturing defects</li>
                    <li>Items damaged during transit (must be reported within 24 hours of delivery)</li>
                    <li>Non-functional components upon arrival</li>
                </ul>
            </li>
            <li>Exclusions - Warranty does not cover:
                    <ul className='fs-5'>
                        <li>Physical damage due to mishandling</li>
                        <li>Burnt, broken, or water-damaged items</li>
                        <li>Damage due to incorrect power supply or wiring</li>
                        <li>DIY errors or modified boards/components</li>
                    </ul>
            </li>
            <li>Warranty Claim Process
                <ul className='fs-5'>
                    <li>Contact our support team with your order ID, a clear photo/video of the defect, and a description of the issue.</li>
                    <li>After verification, we will provide a replacement or store credit.</li>
                    <li>Return shipping (in some cases) may be borne by the customer.</li>
                </ul>
            </li>
        </ol>
        <hr />
        <h3>🔄 Return & Replacement Policy</h3>
        <ol className='fs-4'>
            <li>Return Eligibility
                <ul className='fs-5'>
                    <li>Returns are accepted only for defective or wrong items received.</li>
                    <li>Requests must be made within 7 days of delivery.</li>
                </ul>
            </li>
            <li>Non-Returnable Items
                <ul className='fs-5'>
                    <li>Used or soldered components</li>
                    <li>Custom or special order kits</li>
                    <li>Software or digital downloads</li>
                </ul>
            </li>
            <li>How to Request a Return
                <ul className='fs-5'>
                    <li>Email us at <NavLink to={'mailTo:support@genzonix.in'}><span>support@genzonix.in</span></NavLink> with:
                        <ul className='fs-6'>
                            <li>Order ID</li>
                            <li>Issue details with photos/videos</li>
                        </ul>
                    </li>
                    <li>Once approved, we’ll guide you through the return/replacement steps.</li>
                </ul>
            </li>
            <li>Refund Process
                <ul className='fs-5'>
                    <li>Refunds are issued as store credit, replacement, or original payment reversal (if applicable).</li>
                    <li>Processing may take 3–7 business days after inspection.</li>
                </ul>
            </li>
        </ol>
        <hr />
        <h3>📦 Shipping Damage</h3>
        <ul className='fs-5'>
            <li>If your item arrives physically damaged, inform us within 24 hours.</li>
            <li>Keep the original packaging and share clear photos/videos of the damage.</li>
        </ul>
    </div>
    </>
  )
}

export default Policy