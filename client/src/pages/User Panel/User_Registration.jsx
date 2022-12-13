import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import React from "react";
import logo from "./../../assets/logo-black.png";
import { Button, TextField } from "@mui/material";
import validator from 'validator';
import { useState } from "react";
import api_url from "../../global_data.js"
import jwt_decode from "jwt-decode"

function UserRegistration() {

  let navigate_to = useNavigate();

  const style = {
    inputProps: {
      style: { textAlign: "left" },
    }
  }

  const [passwordError, setPasswordError] = useState(null);

  const handlePasswordError = (e) => {
    console.log(e.target.value);
    if (validator.isStrongPassword(e.target.value, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      setPasswordError(null)
    } else {
      setPasswordError("Must contain minimum 8 digits with an uppercase letter, a lowercase letter, a digit and a special character.")
    }
  }


  const handleRegister = async (e) => {

    // Prevent auto refreshing of the page
    e.preventDefault();
    if (passwordError) {
      alert("Please keep a check of constraints !!! ");
    }
    else {
      // Get and check for token in local storage
      const jwt_token = localStorage.getItem("jwt_token");
      if (jwt_token) {
        alert("You are already logged in.");
        navigate_to("/view-testimonial-status");
      }
      else {
        const user = {
          email: e.target.email.value,
          password: e.target.password.value,
          password_confirm: e.target.password_confirm.value,
          name: e.target.name.value,
          organisation: e.target.organisation.value,
          pass_year: e.target.pass_year.value,
          mobile_no: e.target.mobile_no.value,
        };

        const url = api_url() + "api/register";
        const init_ob = {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(user),
        };
        const res = await fetch(url, init_ob).catch((e) => {
          alert("Network Error");
        });

        if (res && res.ok) {
          alert("Successfully Registered. \nPlease check your email for confirmation link.");
          navigate_to("/login");
        }
        else {
          res.json().then((d) => {
            for (const key in d.response.errors) {
              var error = d.response.errors[key];
              break;
            }
            alert(error);
          }).catch((e) => {
            console.log(e);
            alert("Something went wrong");
          })
        }
      }
    }
  }


  useEffect(() => async () => {
    const jwt_token = localStorage.getItem('jwt_token');
    if (jwt_token) {
      try {
        var decoded = jwt_decode(jwt_token);
        console.log("decoded = ", decoded);
      }
      catch (error) {
        console.log(error);
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('role_id')
        navigate_to("/");
        console.log("You are not logged in 07.");
      }
    }
  });

  return (
    <div className="form_page_wrapper">
      <br /><br /><br />
      <form action="" onSubmit={handleRegister} className="form_wrapper">
        <div className="form_logo_wrapper"><img className="form_logo" src={logo} alt="" /><div className="form_logo_header">Register Here</div></div>
        <div className="formWrapperFields">
          <TextField className="FormInput" type="email" name="email" label="Enter your email" variant="standard" required color="warning" InputProps={style} />
        </div>

        <div className="formWrapperFields">
          <TextField className="FormInput" type="password" name="password" label="Enter your password" variant="standard" required color="warning" onChange={handlePasswordError} InputProps={style} />
          {passwordError && <p className="helperText formErrorMsg">{passwordError}</p>}
        </div>

        <div className="formWrapperFields">
          <TextField className="FormInput" type="password" name="password_confirm" label="Confirm your password" variant="standard" required color="warning" InputProps={style} />
        </div>

        <div className="formWrapperFields">
          <TextField className="FormInput" type="text" name="name" label="Enter your name" variant="standard" required color="warning" InputProps={style} />
        </div>

        <div className="formWrapperFields">
          <TextField className="FormInput" type="text" name="organisation" label="Organisation/Department" variant="standard" required color="warning" InputProps={style} />
        </div>

        <div className="formWrapperFields">
          <TextField className="FormInput" type="tel" name="mobile_no" label="Enter your Mobile No." variant="standard" required color="warning" InputProps={style} />
        </div>

        <div className="formWrapperFields">
          <TextField className="FormInput" type="number" name="pass_year" label="Enter your Passing Year" variant="standard" color="warning" step="0" InputProps={style} />
          {<p className="helperText"><i className="fa-regular fa-circle-question" /> If you are a student of NIT Agartala</p>}
        </div>

        <Button type="reset" color="warning" variant="contained">Reset</Button>
        <Button type="submit" color="warning" variant="contained">Register</Button>
        <NavLink to="/login" style={{ color: "rgb(250, 69, 4)" }}>Already have an account? Login</NavLink>
        <NavLink to="/confirm" style={{ color: "rgb(250, 69, 4)" }}>Not Confirmed Your email? Click here</NavLink>
      </form>
    </div>
  );
}



export default UserRegistration;
