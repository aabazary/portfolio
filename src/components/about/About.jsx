// AboutMe.jsx
import { motion } from "framer-motion";
import "./about.css";
import Skills from "../skills/Skills";       
import Credentials from "../credentials/Credentials"; 


const About = () => {
  return (
    <div className="aboutme-page">
      <div className="aboutme">
        <div className="aboutme-left">
          <h1 className="aboutme-title">About Me</h1>
          <p className="aboutme-description">
            I am a passionate full stack developer with a strong foundation in
            building modern web applications. I enjoy crafting efficient,
            scalable, and user-friendly solutions and am always eager to learn
            new technologies.
          </p>
          <a href="/resume.pdf" download className="download-resume">
            Download Resume
          </a>
        </div>
        <div className="aboutme-right">
          <motion.img
            src="/akon.jpg"  
            alt="Your Profile"
            className="aboutme-photo"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
          />
        </div>
      </div>
      <Credentials />
      <Skills />
    </div>
  );
};
export default About;