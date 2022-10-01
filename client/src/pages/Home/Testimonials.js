import React from "react";
import { NavLink } from "react-router-dom";

import './Testimonials.css'
const Testimonials = () => {
  return (
    <div style={{ marginTop: "150px" }} className='testimonial-wrapper'>
      <NavLink to="/register" style={{ border: "1px solid white", width: "fit-content", margin: "10px auto", padding: "10px" }}>Register to Continue</NavLink>
      {/* <Gallery images={IMAGES}  enableImageSelection={false} enableKeyboardInput={true} onClickImage={{}}/> */}
      This page is under construction.<br />Will be activated soon.
    </div>
  );
}

export default Testimonials;