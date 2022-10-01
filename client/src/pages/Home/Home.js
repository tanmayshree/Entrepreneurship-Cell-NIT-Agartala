import About from './About';
import HeroSection from './Hero_Section';
import './Home.css';
import Message from './Message';
import React from "react";

const Home = () => {
   return (
      <div className="Home">
         <HeroSection />
         <About />
         <Message />
      </div>
   );
}

export default Home;