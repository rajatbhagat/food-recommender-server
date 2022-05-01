import userModel from '../models/user_model.js';
import { updateDaoUser } from '../dao/user_dao.js';
import nutritionistModel from '../models/nutritionist_model.js';
import adminModel from '../models/admin_model.js';

const userController = (app) => {
	app.get('/api/', findAllUsers);
	app.get("/api/users/name/:name", searchUsersByName);
	app.get('/api/users/:uid', findUserById);
	app.get("/api/nutritionist/", findApprovedNutrionists);
	app.get('/api/nutritionist/reqeusts', nutriotionistRequestsPending);
	app.put("/api/nutritionist/reqeusts/approve/:uid/:adminEmail", nutritionistRequestApprove);
	app.put("/api/admin/reqeusts/approve/:uid/:nutriEmail", updatedAdminApprovedDetails);
	app.delete("/api/nutritionist/reqeusts/decline/:uid", nutriotionistRequestDeny);
	app.post('/api/users/createUser', createUser);
	app.post('/api/users/loginUser', loginUser);
	app.put('/api/users/:uid', updateUser);
	app.post('/api/users/addRecipe',addRecipe);
	app.post('/api/users/addUserMeal',addUserMeal)
    app.post('/api/users/adduseringredients',addUserIngredient)
    app.delete('/api/users/')
}

const searchUsersByName = async(req, res) => {
	const name = req.params.name;
	console.log("SEARCHING FOR " + name);
	const re = new RegExp("^.*" + name + ".*$"); 
	console.log(re)
	const out = await userModel.find({name:{'$regex' : re, '$options' : 'i'}});
	console.log(out);
	res.send(out);
}


const addRecipe = async (req,res) => {
		
	const updatedUser = req.body;
	const userId = updatedUser['_id'];
	const out = updateDaoUser(userId,updatedUser);
	res.send(200);
}

const addUserMeal = async (req,res) => {
    const updatedUser = req.body;
    const userId = updatedUser['_id'];
    const out = updateDaoUser(userId,updatedUser);
    res.send(200);
}

const addUserIngredient = async (req,res) => {
    const updatedUser = req.body;
    const userId = updatedUser['_id'];
    const out = updateDaoUser(userId,updatedUser);
    res.send(200);
}

const updateUser = async (req, res) => {
	const userId = req.params['uid'];
	const updatedUser = req.body;
	const out = await updateDaoUser(userId,updatedUser);
	if (out) {
			res.send(out);
	} else {
			res.sendStatus(404);
	}
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
	if(loggedInUser.userType==="nutritionist") {
		const dbNutritionist = await nutritionistModel.find({email: loggedInUser.email});
		if (dbNutritionist.length!=0 && dbNutritionist[0].password === loggedInUser.password) {
			return res.send(dbNutritionist[0]);
		} else {
			return res.send("fail");
		}
	}

	const dbDetails = await userModel.find({email: loggedInUser.email});
	console.log(dbDetails);
	if (dbDetails.length!=0 && dbDetails[0].password === loggedInUser.password) {
		const userDetails = dbDetails[0];
		userDetails.password = null;
		return res.send(dbDetails[0]);
	} else {
		return res.send("fail");
	}
}
	 
const findUserById = async (req, res) => {
	const uid = req.params['uid']
	const response = await userModel.find({ _id: uid });
	res.send(response)
}

const findAllUsers = (req,res) => {
		const type = req.query.type;
 if(type) {
	 res.json(findUsersByType(type));
	 return;
 }
		res.json(users)
};

const nutriotionistRequestsPending = async (req, res) => {
	const requestsToApprove = await nutritionistModel.find({access: false});
	console.log(requestsToApprove);
	res.send(requestsToApprove);
}

const nutritionistRequestApprove = async (req, res) => {
	const idToApprove = req.params['uid'];
	const adminEmail = req.params["adminEmail"];
	// console.log("updating nutritionist table")
	// console.log(idToApprove)
	// console.log(adminEmail);
	const response = await nutritionistModel.updateOne({_id: idToApprove}, {$set:{access: true, approvedBy: adminEmail}})
	res.send(response);
}

const nutriotionistRequestDeny = async (req, res) => {
	const idToApprove = req.params["uid"];
	const response = await nutritionistModel.remove({ _id: idToApprove },);
	res.send(response);
};

const updatedAdminApprovedDetails = async(req, res) => {
	const adminId = req.params["uid"];
	const nutriEmail = req.params["nutriEmail"];
	const dbDetails = await adminModel.find({_id: adminId});
	let details = []
	if (dbDetails.length > 0) {
		details = dbDetails[0].approvedNutritionist;
		if (details.includes(nutriEmail)) {
			res.send("Already approved hence not added")
		}
	}
	console.log(nutriEmail);
	const response = await adminModel.findByIdAndUpdate({_id: adminId}, {$push: {approvedNutritionist: nutriEmail}});
	console.log(response);
	res.send(response)
}

const findApprovedNutrionists = async (req, res) => {
	const approvedList = await nutritionistModel.find({ access: true });
	console.log(approvedList);
	res.send(approvedList);
}

// const findUsersByType = (type) => {
		
//     return users.filter(user => type===user.type)
// }

export default userController;
