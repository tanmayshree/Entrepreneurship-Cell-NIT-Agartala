import { useEffect } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import React from "react";
import validator from 'validator';
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import logo from "./../../assets/logo-black.png";
import "./form.css"
import api_url from "../../global_data.js"
import jwt_decode from "jwt-decode"
var encryptor = require('simple-encryptor')("drfgbjhumuuuukyhghuygjkgt");


const ResetPasswordHandler = () => {
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

    const ResetPassword_handler = async (e) => {
        e.preventDefault();
        if(passwordError){
            alert("Please keep a check of constraints !!! ");  
        }
        else{
            const user = {
                "password": e.target.password.value,
                "password_confirm": e.target.password_confirm.value
            }
            const reset_token = window.location.search.split("=")[1];
            const url = api_url() + "api/reset";
            const init_ob = {
                method: "POST",
                mode: "cors",
                headers: {
                    "reset_token": reset_token,
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(user),
            };
    
            const res = await fetch(url, init_ob).catch(() => {
                alert("Network Error");
            });
    
            if (res && res.ok) {
                alert("Password reset successfully.");
                navigate_to("/login");
            }
            else {
                res.json().then((d) => {
                    alert(d);
                }).catch(() => {
                    alert("Something went wrong.");
                })
            }
        }
    }

    return (
        <div className="form_page_wrapper">
            <br /><br /><br />
            <form action="" onSubmit={ResetPassword_handler} className="form_wrapper">
                <div className="form_logo_wrapper"><img className="form_logo" src={logo} alt="" /><div className="form_logo_header">Send Password Reset Instructions</div></div>
                <div className="formWrapperFields">
                    <TextField className="FormInput" type="password" name="password" label="Enter your password" variant="standard" required color="warning" onChange={handlePasswordError} InputProps={style} />
                    {passwordError && <p className="helperText formErrorMsg">{passwordError}</p>}
                </div>
                <TextField className="FormInput" id="standard-basic" type="password" name="password_confirm" label="Password_Confirm" variant="standard" required color="warning" />
                <Button type="reset" color="warning" variant="contained">Reset Form</Button>
                <Button type="submit" variant="contained" color="warning">Reset Password</Button>
                <NavLink to="/login" style={{ color: "rgb(250, 69, 4)" }}>Have an account? Login Now</NavLink>
                <NavLink to="/register" style={{ color: "rgb(250, 69, 4)" }}>New User? Register Here</NavLink>

            </form>
        </div>
    );
}

export default ResetPasswordHandler;