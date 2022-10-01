import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import React from "react";
import logo from "./../../assets/logo-black.png";
import { Button, TextField } from "@mui/material";

import validator from 'validator';
import { useState } from "react";

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
    e.preventDefault();
    const jwt_token = localStorage.getItem("jwt_token");
    if (jwt_token) {
      alert("You are already logged in.");
      navigate_to("/view-testimonial-status");
    }
    else {

      // REGISTER
      const user = {
        email: e.target.email.value,
        password: e.target.password.value,
        password_confirm: e.target.password_confirm.value,
      };

      const url = "https://backend-ecell.herokuapp.com/register";
      const init_ob = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(user),
      };
      console.log(2);
      const res = await fetch(url, init_ob);
      console.log(res)
      console.log(3);

      // SUCCESSFUL REGISTRATION
      if (res && res.ok) {
        // LOGOUT
        const url1 = "https://backend-ecell.herokuapp.com/logout"
        const init_ob1 = {
          method: "GET",
          mode: 'cors',
        }
        await fetch(url1, init_ob1)

        // lOGIN
        const url2 = "https://backend-ecell.herokuapp.com/api/login";
        const init_ob2 = {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(user),
        };
        const res = await fetch(url2, init_ob2)
        console.log(res)

        // Successful login
        if (res && res.ok) {
          const data = await res.json();
          const jwt_token = data.jwt_token;
          localStorage.setItem("jwt_token", jwt_token);

          // REGISTER THE DETAILS
          const user_details = {
            user_email: e.target.email.value,
            name: e.target.name.value,
            organisation: e.target.organisation.value,
            pass_year: e.target.pass_year.value,
            mobile_no: e.target.mobile_no.value,
          };
          const url = "https://backend-ecell.herokuapp.com/api/register/userDetails";
          const init_ob = {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "jwt_token": jwt_token,
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(user_details),
          };
          const res1 = await fetch(url, init_ob);

          // 2ND PHASE OF REGISTRATION SUCCESS
          if (res1 && res1.ok) {
            alert("Successfully Registered and logged in.");
            console.timeStamp();
            navigate_to(`/add-testimonial`);
          }
          // 2ND PHASE OF REGISTRATION not SUCCESS
          else {
            // delete the 1st phase details
            const jwt_token = localStorage.getItem('jwt_token');
            if (jwt_token) {
              const url = "https://backend-ecell.herokuapp.com/api/user/delete";
              const init_ob = {
                method: "DELETE",
                mode: 'cors',
                headers: {
                  "jwt_token": jwt_token,
                  'Access-Control-Allow-Origin': '*'
                },
              };
              const response = await fetch(url, init_ob);

              // Successful deletion
              if (response && response.ok) {
                // const data = await response.json()
                localStorage.removeItem('jwt_token'); localStorage.removeItem('role_id');
                // console.log(data)
                alert("Registration Unsuccessful. Check the details and try again.");
              }
            }

            // Login failed
            else {
              console.log("Login failed")
            }
          }
        }
        // initial registration failed
        else {
          console.log(34);
        }
      }
    }
  }


  useEffect(() => async () => {
    const jwt_token = localStorage.getItem('jwt_token');
    if (jwt_token) {
      const url = "https://backend-ecell.herokuapp.com/api/userValidation";
      const init_ob = {
        method: "GET",
        mode: "cors",
        headers: {
          "jwt_token": jwt_token,
        },
      };
      const res1 = await fetch(url, init_ob);
      if (res1 && res1.ok) {
        navigate_to("/add-testimonial");
      }
      else {
        localStorage.removeItem('jwt_token'); localStorage.removeItem('role_id');
        navigate_to("/");
        console.log("You are not logged in06.");
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
      </form>
    </div>
  );
}



export default UserRegistration;
