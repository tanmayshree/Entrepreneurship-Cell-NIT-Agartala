import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api_url from "../../utils/global_data.js"
import jwt_decode from "jwt-decode"
import validateToken from "../../utils/validateToken.js";


const UserDashboard = () => {
  const [row, setRow] = useState([]);
  let navigate_to = useNavigate();

  const [dashboardData, setDashboardData] = React.useState(false);

  const handleLogout = async (event) => {
    event.preventDefault();
    alert("You are logged out.");
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('role_id')
    navigate_to("/testimonials");
  }

  const getData = async () => {

    if (validateToken()) {
      const url = api_url() + "api/get/userDashboard";
      const init_obj = {
        method: "GET",
        mode: "cors",
        headers: {
          "jwt_token": localStorage.getItem("jwt_token"),
          'Access-Control-Allow-Origin': '*'
        },
      };
      const res = await fetch(url, init_obj).catch(() => {
        alert("Network Error");
      });
      if (res && res.ok) {
        res.json().then((d) => {
          setRow(d);
          if (d.length) {
            setDashboardData(true);
          }
        }).catch((e) => {
          alert("Something went wrong");
        })
      }
      else {
        alert("You are not authorised to view this page.");
        navigate_to("/view-pending-testimonial-status");
      }
    }
    else {
      if (localStorage.getItem("jwt_token")) {
        alert("Session time out.")
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('role_id');
      }
      else {
        alert("You must login to view this page.");
      }
      navigate_to("/login");
    }
  }
  useEffect(() => {
    getData()
  }, []);

  if (dashboardData) {
    return (
      <div className="dashboard_wrapper">
        <Button type="submit" color="warning" variant="contained" onClick={handleLogout}>Logout</Button>&nbsp;&nbsp;
        <Button type="submit" color="warning" variant="contained" onClick={() => navigate_to("/add-testimonial")}>Add Feedback</Button>
        <br /><br /><br />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">

            <TableHead>
              <TableRow>
                <TableCell>Sl. No.</TableCell>
                <TableCell>Timestamp</TableCell>
                <TableCell>Feedback</TableCell>
                <TableCell>Validation Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {row.map((r, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left">{r.timestamp}</TableCell>
                  <TableCell align="left">{r.feedback}</TableCell>
                  <TableCell align="left">{r.validation_status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
  else
    return (
      <div className="dashboard_wrapper">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">

            <TableHead>
              <TableRow>
                <TableCell>Sl. No.</TableCell>
                <TableCell>Timestamp</TableCell>
                <TableCell>Feedback</TableCell>
                <TableCell>Validation Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>Loading.</TableCell>
                <TableCell>Loading.</TableCell>
                <TableCell>Loading.</TableCell>
                <TableCell>Loading.</TableCell>
              </TableRow>
            </TableBody>


          </Table>
        </TableContainer>
      </div>
    );
};

export default UserDashboard;


