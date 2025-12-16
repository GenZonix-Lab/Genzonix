import React, { useState } from 'react'

const NotifyWA = ({customerData}) => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const sendWhatsAppMessage = async () => {
    setLoading(true)
    setMessage('')

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
                { "type": "text", "text": "Azeem -7" },
                { "type": "text", "text": "123456" },
                { "type": "text", "text": "Dec 13, 2025" },
                { "type": "text", "text": "Dec 13, 2025" },
              ]
            }]
          }
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('WhatsApp message sent:', data)
      setMessage('Message sent successfully!')
    } catch (error) {
      console.error('Error sending WhatsApp message:', error)
      setMessage(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
+     <div className="card-body text-center">
              <button
                className="btn btn-primary btn-lg"
                onClick={sendWhatsAppMessage}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
              {message && (
                <div className={`alert mt-3 ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
                  {message}
                </div>
              )}
            </div>
  )
}

export default NotifyWA