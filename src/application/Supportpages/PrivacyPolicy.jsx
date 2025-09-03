import React from 'react'

const PrivacyPolicy = () => (
    <div className="container py-4">

    <h3 className="mb-2">Privacy Policy</h3>
    <div className="mb-4 text-muted" style={{fontSize: '1rem'}}>Effective Date: September 3, 2025</div>

        <section className="mb-4">
            <h4>1. Information We Collect</h4>
            <ul>
                <li><strong>Name</strong></li>
                <li><strong>Email address</strong></li>
                <li><strong>Phone number</strong> (if applicable)</li>
                <li><strong>Any other information you submit</strong> (e.g., via forms)</li>
            </ul>
            <h5 className="mt-3">b. Usage Data &amp; Technical Information</h5>
            <p>Automatically collected:</p>
            <ul>
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device information (OS, screen resolution, device type)</li>
                <li>Pages visited, session times, navigation paths</li>
                <li>Referrer URLs and usage metrics</li>
            </ul>
            <h5 className="mt-3">c. Cookies &amp; Tracking Technologies</h5>
            <p>
                We use cookies, local storage, and similar technologies to analyze usage, maintain sessions, and personalize your experience. You may disable cookies via your browser settings, but some features may not work properly.
            </p>
        </section>

        <section className="mb-4">
            <h4>3. How We Use Your Information</h4>
            <ul>
                <li>Provide and optimize the Service</li>
                <li>Personalize your user experience</li>
                <li>Communicate with you (updates, support)</li>
                <li>Analyze trends and user behavior</li>
                <li>Comply with legal obligations and protect against fraud</li>
            </ul>
        </section>

        <section className="mb-4">
            <h4>4. Information Sharing</h4>
            <p>We do not sell or trade your personal data. We may share data only with:</p>
            <ul>
                <li>Trusted service providers (analytics, hosting, email, etc.)</li>
                <li>Legal authorities if required by law</li>
                <li>Successors in case of merger, acquisition, or business transfer</li>
            </ul>
        </section>

        <section className="mb-4">
            <h4>5. Third-Party Links</h4>
            <p>
                Our Service may include links to external websites. We are not responsible for their privacy practices, so please review their policies.
            </p>
        </section>

        <section className="mb-4">
            <h4>6. Data Security</h4>
            <p>
                We apply reasonable security measures to protect your data. However, no method of online transmission is 100% secure.
            </p>
        </section>

        <section className="mb-4">
            <h4>7. Your Rights</h4>
            <p>Depending on your location, you may have rights to:</p>
            <ul>
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion (subject to legal retention)</li>
                <li>Withdraw consent to processing</li>
                <li>Restrict or object to processing</li>
                <li>Request data portability</li>
            </ul>
            <p>
                To exercise your rights, contact us at <a href="mailto:support@genzonix.in">support@genzonix.in</a>.
            </p>
        </section>

        <section className="mb-4">
            <h4>8. Children’s Privacy</h4>
            <p>
                Our Service is not intended for children under 13. If we discover such data has been collected, we will delete it promptly.
            </p>
        </section>

        <section className="mb-4">
            <h4>9. Data Retention</h4>
            <p>
                We retain personal data only as long as needed for the purposes outlined or as required by law.
            </p>
        </section>

        <section className="mb-4">
            <h4>10. International Data Transfer</h4>
            <p>
                Your data may be processed in countries outside your residence. We ensure appropriate safeguards are in place.
            </p>
        </section>

        <section className="mb-4">
            <h4>11. Changes to This Privacy Policy</h4>
            <p>
                We may update this policy periodically. Updates will be posted on this page with the revised “Effective Date.”
            </p>
        </section>

        <section className="mb-4">
            <h4>12. Contact Us</h4>
            <p>
                For privacy-related questions, please contact us:<br />
                <span role="img" aria-label="email">📧</span> <a href="mailto:support@genzonix.in">support@genzonix.in</a>
            </p>
        </section>
    </div>
);

export default PrivacyPolicy;