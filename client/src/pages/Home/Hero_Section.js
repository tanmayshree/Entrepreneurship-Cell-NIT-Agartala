import './Hero.css';
import img from "./../../assets/hero-image00.png"
import React from "react";

const Hero_Section = () => {
    return (
        <>
            <div className="hero-section">
                <div className="hero-section-content">
                    <p className="hero-title">Entrepreneurship Cell</p>
                    <p className="hero-subtitle">National Institute of Technology, Agartala</p>
                </div>
                <div className="hero-section-right">
                    <img src={img} alt="" />
                </div>
            </div>
        </>
    );
}

export default Hero_Section;