import { Button, TextareaAutosize } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./../../assets/logo-black.png";
import api_url from "../../utils/global_data.js"
import jwt_decode from "jwt-decode"
import validateToken from "../../utils/validateToken.js";


const FeedbackEntry = () => {

  let navigate_to = useNavigate();

  const handleFeeedbackEntry = async (e) => {
    e.preventDefault();
    if (validateToken()) {
      const feedback_details = {
        feedback: e.target.feedback.value,
        validation_status: false
      };
      const url = api_url() + "api/addUserTestimonial";
      const init_ob = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "jwt_token": localStorage.getItem('jwt_token')
        },
        body: JSON.stringify(feedback_details),
      };
      const res1 = await fetch(url, init_ob);
      if (res1 && res1.ok) {
        alert("Feedback Submitted. Your feedback will appear after approval.");
        navigate_to("/view-testimonial-status")
      }
      else {
        if (localStorage.getItem("jwt_token")) {
          alert("Session time out.");
          localStorage.removeItem('jwt_token');
          localStorage.removeItem('role_id');
          navigate_to("/login");
        }
        else {
          alert("You must login to view this page.");
          navigate_to("/login");
        }

      }
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    const jwt_token = localStorage.getItem('jwt_token');
    if (jwt_token) {
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('role_id');
      navigate_to("/testimonials");
    }
  }
  useEffect(() => () => {
    if (! validateToken()) {
      if (localStorage.getItem("jwt_token")) {
        alert("Session time out.");
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('role_id');
      }
      else{
        alert("You must login to view this page.");
      }
      navigate_to("/login");
    }
  });
  
  return (
    <>
      <br /><br /><br />
      <Button type="submit" color="warning" variant="contained" onClick={() => navigate_to("/view-testimonial-status")}>View Dashboard</Button>&nbsp;&nbsp;
      <Button type="submit" color="warning" variant="contained" onClick={handleLogout}>Logout</Button>
      <form action="" className="form_wrapper" onSubmit={handleFeeedbackEntry}>
        <div className="form_logo_wrapper"><img className="form_logo" src={logo} alt="" /><div className="form_logo_header">Enter your feedback below</div></div>
        <TextareaAutosize
          minRows={3}
          className="FormInput"
          name="feedback"
          aria-label="empty textarea"
          placeholder="Write your message here"
          style={{ width: 225, height: 260, border: "2px solid rgb(162, 90, 162)" }}
          required
        />
        <Button type="submit" color="warning" variant="contained">Submit</Button>
      </form>

    </>
  );
};

export default FeedbackEntry;
