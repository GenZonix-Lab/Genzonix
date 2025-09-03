import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollToTop from './ScrollToTop';

const ShowAlert = ({
    message = '',
    triggerKey = '',
    type = 'success', // 'success' | 'error' | 'info' | 'warning'
    duration = 2000,
    redirectText = '',
    redirectPath = '',
}) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), duration);
      return () => clearTimeout(timer);
    }
  }, [triggerKey, message, duration]);

  // Map alert types to Bootstrap classes
  const alertClassMap = {
    success: 'alert-success',
    error: 'alert-danger',
    warning: 'alert-warning',
    info: 'alert-info',
  };

  const alertClass = alertClassMap[type] || 'alert-success';

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`alert ${alertClass} position-fixed top-0 start-50 translate-middle-x d-flex justify-content-between align-items-center px-4 py-3`}
          style={{ zIndex: 9999, minWidth: '300px', maxWidth: '90%' }}
          role="alert"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.4 }}
        >
          {message && <p>{message}</p>} 

          {redirectText && redirectPath && (
            <div
              className="ms-4 px-2 py-1 border rounded"
              style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
              onClick={() => navigate(redirectPath)}
            >
                <em>{redirectText} &#8594;</em>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};


export default ShowAlert;
