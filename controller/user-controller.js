import userModel from '../models/user_model.js';
import bcrypt from 'bcryptjs';

const userController = (app) => {
    app.get('/api/users', findAllUsers);
    app.get('/api/users/:uid', findUserById);
    app.post('/api/users/createUser', createUser);
    // app.delete('/api/users/:uid', deleteUser);
    // app.put('/api/users/:uid', updateUser);
}

// const updateUser = (req, res) => {
//     const userId = req.params['uid'];
//     const updatedUser = req.body;
//     users = users.map(usr =>
//       usr._id === userId ?
//       updatedUser :
//       usr);
//     res.send(200);
//    }
   

// const deleteUser = (req, res) => {
//     const userId = req.params['uid'];
//     users = users.filter(usr =>
//       usr._id !== userId);
//     res.send(200);
//    }
   

const createUser = async (req, res) => {
    const newUser = req.body;
    console.log("Server: ",req.body);
    // let user = await userModel.findOne(newUser.name)
    // console.log("User",user)
    // if(user) {
    //     return res.send(400);
    // }

    const hashedPwd = await bcrypt.hash(newUser.password, 12);
    newUser.password = hashedPwd; 
    const responseUser = userModel.create(newUser);

    res.send(responseUser);
   }
   

const findUserById = (req, res) => {
    const userId = req.params.uid;
    const user = users.find(u => u._id === userId);
    res.json(user);
   }   

const findAllUsers = (req,res) => {
    const type = req.query.type;
 if(type) {
   res.json(findUsersByType(type));
   return;
 }
    res.json(users)
}

const findUsersByType = (type) => {
    
    return users.filter(user => type===user.type)
}

export default userController;