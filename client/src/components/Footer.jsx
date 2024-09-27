import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-row">
            <div className="footer-column">
              <h3>Company@soumya</h3>
              <ul>
                <li><a href="/about">About Me</a></li>
                <li><a href="/careers">phone-###</a></li>
                <li><a href="/contact">mail-###</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Services</h3>
              <ul>
                <li><a href="/web-development">Frontend/Backend</a></li>
                <li><a href="/app-development"> Software Enginner</a></li>
                <li><a href="/marketing">AIML Engineer</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Profile Links</h3>
              <div className="social-icons">
                <a href="https://www.linkedin.com/in/soumya-mukherjee-dob19092001/" target="_blank" rel="noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://github.com/Soumya-mukherjee131" target="_blank" rel="noreferrer">
                <i className="fab fa-github"></i>
                </a>
                
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 Soumya#Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
