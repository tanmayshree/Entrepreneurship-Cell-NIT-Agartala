import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../User Panel/form.css";
import api_url from "../../utils/global_data.js"
import validateToken from "../../utils/validateToken";

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
      }

      const handleStatusUpdate = async (event, id, validation_status) => {
            if (validateToken()) {

                  const updateDetails = {
                        "id": id,
                        "validation_status": validation_status
                  }
                  const url = api_url() + "api/updateTestimonialValidationStatus";
                  const init_obj = {
                        method: "PUT",
                        mode: "cors",
                        headers: {
                              "Content-Type": "application/json",
                              "jwt_token": localStorage.getItem("jwt_token"),
                              // "id": id,
                              // "validation_status": validation_status,
                              'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify(updateDetails),
                  };
                  const res = await fetch(url, init_obj);
                  if (res && res.ok) {
                        res.json().then(() => {
                              navigate_to("/view-pending-testimonial-status");
                              if (validation_status === 1) alert("Feedback Approved.");
                              else if (validation_status === 2) alert("Feedback Rejected.");
                              setDummy({});
                        }).catch(() => {
                              alert("Something went wrong.");
                        })
                  }

                  window.location.reload(true);
            }
            else {
                  if (localStorage.getItem("jwt_token")) {
                        alert("Session time out.");
                        localStorage.removeItem('jwt_token');
                        localStorage.removeItem('role_id');
                  }
                  else {
                        alert("You must login to view this page.");
                  }
                  navigate_to("/login");
            }

      }


      const getData = async () => {
            if (validateToken()) {
                  const url = api_url() + "api/admin/getPendingTestimonials";
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
                        navigate_to("/view-testimonial-status");
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
            getData();
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


