import adminModel from "../models/admin_model.js";

const adminController = (app) => {
  app.post("/api/admin/loginUser", loginAdmin);
//   app.put("/api/users/:uid", updateUser);
};


const loginAdmin = async (req, res) => {
  try {
  const loggedInUser = req.body;
  console.log("")
  const dbDetails = await adminModel.find({ email: loggedInUser.email });
  console.log(dbDetails);
  if (dbDetails.length != 0 
    && dbDetails[0].password === loggedInUser.password) {
    return res.send(dbDetails[0]);
  } else {
    return res.send("fail");
  }
} catch (err) {
  console.log("error while logging in as admin", req.body)
  console.log(err)
}
};

export default adminController;
