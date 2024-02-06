import React from 'react';
import './emaillist.styles.css';

const EmailList = ({ emails, onEmailSelect, selectedEmailId }) => {
  return (
    <div className="email-list">
      {emails.map(email => {
        // Determine if the email is read
        const isRead = email.read === "true";
        const isActive = email.id === selectedEmailId;

        return (
          <div 
            key={email.id} 
            className={`email-item ${isRead ? 'read' : 'unread'} ${isActive ? 'active' : ''}`}
            onClick={() => onEmailSelect(email.id)}
          >
            <div className="email-from">{email.from}</div>
            <div className="email-subject">{email.subject}</div>
            <div className="email-time">{email.time}</div>
          </div>
        );
      })}
    </div>
  );
};

export default EmailList;
