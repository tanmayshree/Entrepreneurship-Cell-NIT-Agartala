import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import logo from "./../../assets/logo-black.png";
import "./form.css"
import api_url from "../../utils/global_data.js"
import jwt_decode from "jwt-decode"
var encryptor = require('simple-encryptor')("drfgbjhumuuuukyhghuygjkgt");

const ResetPassword = () => {
    let navigate_to = useNavigate();
    const handleResetPassword = async (e) => {
        e.preventDefault();
        const user = {
            "email": e.target.email.value
        }
        const url = api_url() + "api/reset";
        const init_ob = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(user),
        };

        const res = await fetch(url, init_ob).catch(() => {
            alert("Network Error");
        });

        if (res && res.ok) {
            alert("Reset Instructions sent succssfully. Please check your email.");
            navigate_to("/login");
        }
        else {
            res.json().then((d) => {
                alert(d);
            }).catch((e) => {
                console.log(e);
                alert("Something went wrong");
            })
        }
    }

    return (
        <div className="form_page_wrapper">
            <br /><br /><br />
            <form action="" onSubmit={handleResetPassword} className="form_wrapper">
                <div className="form_logo_wrapper"><img className="form_logo" src={logo} alt="" /><div className="form_logo_header">Send Password Reset Instructions</div></div>
                <TextField className="FormInput" id="standard-basic" type="email" name="email" label="Email" variant="standard" required color="warning" />
                <Button type="reset" color="warning" variant="contained">Reset</Button>
                <Button type="submit" variant="contained" color="warning">Send Reset Email</Button>
                <NavLink to="/login" style={{ color: "rgb(250, 69, 4)" }}>Have an account? Login Now</NavLink>
                <NavLink to="/register" style={{ color: "rgb(250, 69, 4)" }}>New User? Register Here</NavLink>

            </form>
        </div>
    );
}

export default ResetPassword;