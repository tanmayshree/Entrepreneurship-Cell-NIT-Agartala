import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// function createData(sl_no, timestamp, feedback, validation_status) {
//   return { sl_no, timestamp, feedback, validation_status };
// }


const UserDashboard = () => {
  const [row, setRow] = useState([]);
  // var rows = [];
  let navigate_to = useNavigate();

  const [dashboardData, setDashboardData] = React.useState(false);

  const handleLogout = async (event) => {
    event.preventDefault();
    const jwt_token = localStorage.getItem('jwt_token')
    if (jwt_token) {
      const url = "https://backend-ecell.herokuapp.com/logout"
      const init_ob = {
        method: "GET",
        mode: 'cors',
      }
      await fetch(url, init_ob)
      localStorage.removeItem('jwt_token'); localStorage.removeItem('role_id')
      navigate_to("/testimonials");
      console.log("Succesfully Logged Out")
    }
    else {
      console.log("You are not logged in 01.")
    }
  }

  const getData = async () => {
    console.log("randobhj");
    const jwt_token = localStorage.getItem('jwt_token')
    if (jwt_token) {
      const url = "https://backend-ecell.herokuapp.com/api/userValidation";
      const init_ob = {
        method: "GET",
        mode: "cors",
        headers: {
          "jwt_token": jwt_token,
          'Access-Control-Allow-Origin': '*'
        },
      };
      const res1 = await fetch(url, init_ob);
      if (res1 && res1.ok) {
        res1.json().catch(() => {
          navigate_to("/")
          console.log("You are not logged in 07.")
          localStorage.removeItem('jwt_token'); localStorage.removeItem('role_id')
          // Add navigate option
        }
        )
        const url1 = "https://backend-ecell.herokuapp.com/api/get/userDashboard";
        const init_ob1 = {
          method: "GET",
          mode: "cors",
          headers: {
            "jwt_token": jwt_token,
            'Access-Control-Allow-Origin': '*'
          },
        };
        const res2 = await fetch(url1, init_ob1);
        res2.json().then((d) => {

          setRow(d);
          console.log(row);
          setDashboardData(true);
        })
        /*
                fetch(url1, init_ob1)
                  .then(response => { return (response.json()) })
                  .then((data) => {
                    setRow(data);
                    console.log(data);
                    setDashboardData(true);
                  })
                  */
      }
      else {
        navigate_to("/")
        console.log("You are not logged in 02.")
      }
    }
    else {
      navigate_to("/")
      console.log("You are not logged in05.")
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


