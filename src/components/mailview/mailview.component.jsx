import React from "react";
import './mailview.styles.css';

const EmailView = ({ email }) => {
    if (!email) {
        return <div className="email-view">Select an email to read</div>;
      }
    return (
    <div className="email-view">
        <div className="email-details">
            <h2>{email.subject}</h2>
            <p><strong>From:</strong> {email.from}</p>
            <p><strong>Address:</strong> {email.address}</p>
            <p><strong>Date:</strong> {email.time}</p>
        </div>
        <div className="email-content">
            {email.message}
        </div>
    </div>
    );
};

export default EmailView;