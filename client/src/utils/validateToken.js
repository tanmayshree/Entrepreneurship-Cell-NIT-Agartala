import jwt_decode from "jwt-decode";

const validateToken = () => {

  const jwt_token = localStorage.getItem("jwt_token");
  if (jwt_token) {
    try {
      var decoded = jwt_decode(jwt_token);
      console.log("decoded = ", decoded);

      let currentDate = new Date();

      if (decoded.exp * 1000 < currentDate.getTime()) {
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      // alert("Previous Login has expired. Please login again");
      // localStorage.removeItem("jwt_token");
      // localStorage.removeItem("role_id");
      // navigate_to("/login");
      return false
    }
  } else {
    return false;
  }
};

export default validateToken;
