require("dotenv").config();
const jwt = require("jsonwebtoken");
const authentication = async (req, res, next) => {
  let { token } = req.headers;
  if (!token) {
    return res.send({ msg: "token not available", state: "NOT OK" });
  }
  //   console.log(token);
  let decoded = jwt.verify(token, process.env.JWT);
  //   console.log(decoded);
  if (decoded) {
    req.userID = decoded.id;
    next();
    // return res.send({ decoded });
  } else {
    return res.send({ msg: "user not authorized", state: "NOT OK" });
  }
};

module.exports = 
    authentication
