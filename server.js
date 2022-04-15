import express from 'express';
import cors from 'cors'
import userController from './controller/user-controller.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server is running OK.")
});

// Add controller here
userController(app)

app.listen(4000);