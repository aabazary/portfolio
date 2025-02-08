// AboutMe.jsx
import { motion } from "framer-motion";
import "./about.css";
import Skills from "../skills/Skills";       
import Credentials from "../credentials/Credentials"; 


const About = () => {
  return (
    <motion.div 
      className="aboutme-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div 
        className="aboutme"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div className="aboutme-left">
          <motion.h1 
            className="aboutme-title"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 1 }}
          >
            About Me
          </motion.h1>
          <motion.p 
            className="aboutme-description"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
With a background in both entrepreneurship and technology, I bring a unique perspective to full-stack development. For ten years, I successfully ran an auto service business, where I developed strong problem-solving skills and a knack for efficient management. Now, as a passionate developer, I craft responsive and scalable web applications, constantly seeking new challenges and learning opportunities.
          </motion.p>
          <motion.a 
            href="/resume.pdf" 
            download 
            className="download-resume"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Download Resume
          </motion.a>
        </motion.div>
        <motion.div 
          className="aboutme-right"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src="/akon.jpg"
            alt="Your Profile"
            className="aboutme-photo"
            whileHover={{ scale: 1.05 }}
          />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Credentials />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        <Skills />
      </motion.div>
    </motion.div>
  );
};

export default About;
