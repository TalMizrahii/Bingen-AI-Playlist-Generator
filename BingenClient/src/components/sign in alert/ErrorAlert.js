import React, {useEffect, useState} from 'react';
import Alert from 'react-bootstrap/Alert';
import './ErrorAlert.css';

const ErrorAlert = () => {
    // Set a state for the alert. If true, the alert will be shown.
    const [show, setShow] = useState(true);
    // Set a timer to hide the alert after several seconds.
    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`fixed-alert-container ${show ? '' : 'fadeOut'} `}
             onClick={() => setShow(false)}>
            {show && (
                <Alert
                    variant="danger"
                    onClose={() => setShow(false)}
                    className="custom-alert" // Add a custom class for your alert
                    style={show ? {} : {opacity: 0, transition: 'opacity 0.3s ease-in-out'}}
                >
                    <h4>New with Bingen?</h4>
                    <p>Sign in to spotify and start generating!</p>
                </Alert>
            )}
        </div>
    );
};

export default ErrorAlert;
