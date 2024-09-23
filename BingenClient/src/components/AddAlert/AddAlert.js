import React, {useEffect, useState} from 'react';
import Alert from 'react-bootstrap/Alert';
import './AddAlert.css';
const AddAlert = ({setShowAddAlert}) => {
    // Set the alert to show or not based on the show state.
    const [show, setShow] = useState(true);
    // Set a timer to hide the alert again.
    const timer = setTimeout(() => {
        setShow(false);
        setShowAddAlert(false);
    }, 5000);

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
                    <div className="alert__text">
                        <h4>Great!</h4>
                        <p>Your playlist added successfully to your account.</p>
                    </div>
                </Alert>
            )}
        </div>
    );
};

export default AddAlert;
