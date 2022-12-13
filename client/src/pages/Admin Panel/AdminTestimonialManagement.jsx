import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../User Panel/form.css";
import api_url from "../../global_data.js"

const AdminTestimonialManagement = () => {
      const [row, setRow] = useState([]);
      const [dummy, setDummy] = useState();
      let navigate_to = useNavigate();

      const [dashboardData, setDashboardData] = useState(false);

      const handleLogout = async (event) => {
            event.preventDefault();
            localStorage.removeItem('jwt_token');
            localStorage.removeItem('role_id')
            navigate_to("/testimonials");
            console.log("Succesfully Logged Out")
      }

      const handleStatusUpdate = async (event, id, validation_status) => {
            // event.preventDefault();
            console.log(id)
            const jwt_token = localStorage.getItem('jwt_token')
            if (jwt_token) {
                  const url = api_url() + "api/adminValidation";
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
                              localStorage.removeItem('jwt_token');
                              localStorage.removeItem('role_id');
                              // Add navigate option
                        }
                        )
                        const updateDetails = {
                              "id": id,
                              "validation_status": validation_status
                        }
                        const url1 = api_url() + "api/updateTestimonialValidationStatus";
                        const init_ob1 = {
                              method: "PUT",
                              mode: "cors",
                              headers: {
                                    "Content-Type": "application/json",
                                    "jwt_token": jwt_token,
                                    "id": id,
                                    "validation_status": validation_status,
                                    'Access-Control-Allow-Origin': '*'
                              },
                              body: JSON.stringify(updateDetails),
                        };
                        const res2 = await fetch(url1, init_ob1);
                        res2.json().then(() => {
                              navigate_to("/view-pending-testimonial-status");
                              if (validation_status === 1) alert("Feedback Approved.");
                              else if (validation_status === 2) alert("Feedback Rejected.");
                              setDummy({});
                        })
                        window.location.reload(true);
                  }
                  else {
                        navigate_to("/")
                        localStorage.removeItem('jwt_token');
                        localStorage.removeItem('role_id');
                        console.log("You are not logged in 02.")
                  }
            }
      }


      const getData = async () => {
            console.log("aaaaaaaaaaaaarandobhj");
            const jwt_token = localStorage.getItem('jwt_token')
            if (jwt_token) {
                  const url = api_url() + "api/adminValidation";
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
                        const url1 = api_url() + "api/admin/getPendingTestimonials";
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
            if (row.length != 0) {
                  return (
                        <div className="dashboard_wrapper">
                              <Button type="submit" color="warning" variant="contained" onClick={handleLogout}>Logout</Button>&nbsp;&nbsp;
                              <br /><br /><br />
                              <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">

                                          <TableHead>
                                                <TableRow>
                                                      <TableCell>Sl. No.</TableCell>
                                                      <TableCell>Timestamp</TableCell>
                                                      <TableCell>Name</TableCell>
                                                      <TableCell>Email</TableCell>
                                                      <TableCell>Feedback</TableCell>
                                                      <TableCell>Organisation</TableCell>
                                                      <TableCell>Action (Approve/Reject)</TableCell>
                                                </TableRow>
                                          </TableHead>


                                          <TableBody>
                                                {row.map((row, index) => (
                                                      <TableRow
                                                            key={row.id}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                      >
                                                            <TableCell component="th" scope="row">
                                                                  {index + 1}
                                                            </TableCell>
                                                            <TableCell align="left">{row.timestamp}</TableCell>
                                                            <TableCell align="left">{row.name}</TableCell>
                                                            <TableCell align="left">{row.email}</TableCell>
                                                            <TableCell align="left">{row.feedback}</TableCell>
                                                            <TableCell align="left">{row.organisation}</TableCell>
                                                            <TableCell align="left" style={{ "display": "flex" }}>
                                                                  <Button type="submit" color="warning" variant="contained" onClick={(event) => handleStatusUpdate(event, row.id, 1)}><i className="fa-solid fa-check" /></Button>
                                                                  &nbsp;
                                                                  <Button type="submit" color="warning" variant="contained" onClick={(event) => handleStatusUpdate(event, row.id, 2)}><i className="fa-solid fa-xmark" /></Button>
                                                            </TableCell>
                                                      </TableRow>
                                                ))}
                                          </TableBody>
                                    </Table>
                              </TableContainer>
                        </div>
                  );
            }
            else {
                  return (
                        <div className="dashboard_wrapper">
                              <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">

                                          <TableHead>
                                                <TableRow>
                                                      <TableCell>Sl. No.</TableCell>
                                                      <TableCell>Timestamp</TableCell>
                                                      <TableCell>Name</TableCell>
                                                      <TableCell>Email</TableCell>
                                                      <TableCell>Feedback</TableCell>
                                                      <TableCell>Organisation</TableCell>
                                                      <TableCell>Action (Approve/Reject)</TableCell>
                                                </TableRow>
                                          </TableHead>

                                          <TableBody>
                                                <TableRow>
                                                      <TableCell></TableCell>
                                                      <TableCell></TableCell>
                                                      <TableCell align="right">No</TableCell>
                                                      <TableCell>Pending</TableCell>
                                                      <TableCell>Testimonials</TableCell>
                                                      <TableCell></TableCell>
                                                      <TableCell></TableCell>
                                                </TableRow>
                                          </TableBody>


                                    </Table>
                              </TableContainer>
                        </div>
                  );
            }
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
                                                <TableCell>Name</TableCell>
                                                <TableCell>Email</TableCell>
                                                <TableCell>Feedback</TableCell>
                                                <TableCell>Organisation</TableCell>
                                                <TableCell>Action (Approve/Reject)</TableCell>
                                          </TableRow>
                                    </TableHead>

                                    <TableBody>
                                          <TableRow>
                                                <TableCell>Loading.</TableCell>
                                                <TableCell>Loading.</TableCell>
                                                <TableCell>Loading.</TableCell>
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

export default AdminTestimonialManagement;


