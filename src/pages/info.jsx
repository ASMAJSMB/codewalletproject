import React from "react";
import { db } from '../firebase.js';
import './style.css';  

const Info = () => {
  return (
    <div className="info-container">
      <h1 className="page-title">Information about the Application</h1>

     
      <section className="info-section">
        <h2>Application features</h2>
        <ul>
          <li><strong>Tag Management:</strong> Easily add, modify, and delete tags.</li>
          <li><strong>Secure authentication:</strong> Connection and management of user accounts with advanced security options.</li>
          <li><strong>Responsive interface:</strong> The application adapts to all types of screens, whether on desktop, tablet, or mobile.</li>
          <li><strong>Cloud Storage :</strong>All data is stored in Firebase for secure and reliable management.</li>
        </ul>
      </section>

      
      <section className="info-section">
        <h2>Développers</h2>
        <ul>
          <li><strong> Developer:</strong> Asma Haddad - Developpeuse fullstack .</li> 
        </ul>
      </section>

     
      <section className="info-section">
        <h2>Legal Framework and Data Management</h2>
        <p>
         This application complies with the laws in force regarding the protection of personal data, in accordance with the General Data Protection Regulation (GDPR) of the European Union. The information collected by the application is used exclusively for internal operation and user management. No personal data is shared with third parties without prior consent.
        </p>
        <p>
          For more information on our privacy policy and terms of use, please refer to the appropriate sections in the app's settings.
        </p>
      </section>
    </div>
  );
};

export default Info;
