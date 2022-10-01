import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import React from "react";
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import logo from "./../../assets/logo-black.png";
import "./form.css"
var encryptor = require('simple-encryptor')("drfgbjhumuuuukyhghuygjkgt");

const UserLogin = () => {
      let navigate_to = useNavigate();

      const handleLogin = async (e) => {
            e.preventDefault();
            const jwt_token = localStorage.getItem("jwt_token");
            if (jwt_token) {
                  alert("You are already logged in.");
                  navigate_to("/add-testimonial")
            } else {
                  const user = {
                        email: e.target.email.value,
                        password: e.target.password.value,
                  };
                  const url = "https://backend-ecell.herokuapp.com/api/login";
                  const init_ob = {
                        method: "POST",
                        mode: "cors",
                        headers: {
                              "Content-Type": "application/json",
                              'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify(user),
                  };

                  const res = await fetch(url, init_ob)
                  console.log(res)
                  console.log("wscrfgvbyh");
                  if (res && res.ok) {
                        const data = await res.json();
                        const jwt_token = data.jwt_token;
                        const role_id = encryptor.encrypt(data.role_id);
                        console.log(role_id)
                        localStorage.setItem("jwt_token", jwt_token);
                        localStorage.setItem("role_id", role_id);
                        if (data.role_id === 0 || data.role_id === 1) {
                              navigate_to("/view-pending-testimonial-status");
                        }
                        else {
                              navigate_to("/add-testimonial");
                        }
                  }
                  else {
                        alert("Invalid Email or Password.");
                  }
            }
      };

      useEffect(() => async () => {
            const jwt_token = localStorage.getItem('jwt_token')
            if (jwt_token) {
                  const role_id = encryptor.decrypt(localStorage.getItem('role_id'))
                  let url;
                  if (role_id === 0 || role_id === 1) {
                        url = "https://backend-ecell.herokuapp.com/api/adminValidation";
                  }
                  else {
                        url = "https://backend-ecell.herokuapp.com/api/userValidation";
                  }
                  const init_ob = {
                        method: "GET",
                        mode: "cors",
                        headers: {
                              "jwt_token": jwt_token,
                              'Access-Control-Allow-Origin': '*'
                        },
                  };
                  console.log("first")
                  const res1 = await fetch(url, init_ob);
                  if (res1 && res1.ok) {
                        console.log("Previous Login Success01")
                        console.log(role_id)
                        if (role_id === 0 || role_id === 1) {
                              navigate_to("/view-pending-testimonial-status");
                        }
                        else {
                              navigate_to("/add-testimonial");
                        }
                  }
                  else {
                        localStorage.removeItem('jwt_token'); localStorage.removeItem('role_id')
                        navigate_to("/")
                        console.log("You are not logged in03.")
                  }
            }
      }, []);

      return (
            <div className="form_page_wrapper">
                  <br /><br /><br />
                  <form action="" onSubmit={handleLogin} className="form_wrapper">
                        <div className="form_logo_wrapper"><img className="form_logo" src={logo} alt="" /><div className="form_logo_header">Login Here</div></div>
                        <TextField className="FormInput" id="standard-basic" type="email" name="email" label="Email" variant="standard" required color="warning" />
                        <TextField className="FormInput" id="standard-basic" type="password" name="password" label="Password" variant="standard" required color="warning" />
                        <Button type="reset" color="warning" variant="contained">Reset</Button>
                        <Button type="submit" variant="contained" color="warning">Login</Button>
                        <NavLink to="/register" style={{ color: "rgb(250, 69, 4)" }}>New User? Register Here</NavLink>
                  </form>
            </div>
      );
}

export default UserLogin;