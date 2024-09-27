import React from 'react'
import { useAuth } from '../store/auth';

const About = () => {
  const {user} = useAuth();
  return (
    <>
      <section className="about-section">
        <div className="about-container">
          <div className="about-text">
            <h1>{user ? `Hellow ${user.username}` : `Hellow there`}</h1>
            <h1>About Me</h1>
            <p>
            Hello, I’m Soumyadip Mukherjee, a passionate software developer with a focus on full-stack development and artificial intelligence. Currently pursuing my Master of Computer Application from the Institute of Engineering and Management, I have a CGPA of 9.46 and a solid foundation in programming languages like Java, JavaScript, Python, and experience with frameworks such as React.js and Next.js. I’m driven by a continuous desire to learn new technologies and push the boundaries of innovation, particularly in AI, where I have worked on Generative Adversarial Networks (GANs) in medical imaging. I’m eager to apply my skills in real-world software development roles and contribute to dynamic projects.
            </p>
          </div>

          <div className="about-image">
            <img src="https://placehold.co/500x300" alt="About Us Placeholder" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About
