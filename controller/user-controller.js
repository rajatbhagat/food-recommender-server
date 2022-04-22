import userModel from '../models/user_model.js';
import { updateDaoUser } from '../dao/user_dao.js';
import bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';
import nutritionistModel from '../models/nutritionist_model.js';
const SECRET_KEY = 'FOOD';
const userController = (app) => {
    app.get('/api/users', findAllUsers);
    // app.get('/api/users/:uid', findUserById);
    app.post('/api/users/createUser', createUser);
    app.post('/api/users/loginUser', loginUser);
    app.put('/api/users/:uid', updateUser);
    app.post('/api/users/addRecipe',addRecipe);
}



const addRecipe = async (req,res) => {
    console.log("ADD RECIPE CONTROLLER")
    const updatedUser = req.body;
    const userId = updatedUser['_id'];
    console.log(updatedUser)
    console.log(userId)
    const out = updateDaoUser(userId,updatedUser);
    console.log(out);
    res.send(200);
}

const updateUser = async (req, res) => {
    console.log("Starting update user")
    const userId = req.params['uid'];
    const updatedUser = req.body;
    console.log(updatedUser)
    console.log(userId)
    const out = updateDaoUser(userId,updatedUser);
    console.log(out);
    res.send(200);
  }
   

// const deleteUser = (req, res) => {
//     const userId = req.params['uid'];
//     users = users.filter(usr =>
//       usr._id !== userId);
//     res.send(200);
//    }

const createUser = async (req, res) => {
    const newUser = req.body;
    let responseUser;
    console.log(newUser);
    if(newUser.userType===undefined || newUser.userType==='user') {
      responseUser = userModel.create(newUser);
    }
    else {
      responseUser = nutritionistModel.create(newUser);
    }

    res.send(responseUser);
   }

const loginUser = async (req, res) => {
  const loggedInUser = req.body;
  // const hashedPwd = await CryptoJS.AES.encrypt(loggedInUser.password, SECRET_KEY);
  // console.log("Pwd", hashedPwd)
  const dbDetails = await userModel.find({email: loggedInUser.email});
  // let bytes  = CryptoJS.AES.decrypt(dbDetails.password, SECRET_KEY);
  // let decryptedPwd = bytes.toString(CryptoJS.enc.Utf8);
  console.log(dbDetails[0].password)
  console.log(loggedInUser.password)
  if (dbDetails && dbDetails[0].password === loggedInUser.password) {
    return res.send(dbDetails[0]);
  } else {
    return res.send("User Not Found");
  }
}
   

// const findUserById = (req, res) => {
//     const userId = req.params.uid;
//     const user = users.find(u => u._id === userId);
//     res.json(user);
//    }   

const findAllUsers = (req,res) => {
    const type = req.query.type;
 if(type) {
   res.json(findUsersByType(type));
   return;
 }
    res.json(users)
}

// const findUsersByType = (type) => {
    
//     return users.filter(user => type===user.type)
// }

export default userController;
