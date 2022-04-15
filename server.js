import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MongoDBSession from 'connect-mongodb-session';
import mongoose from 'mongoose';

const mongoDBSession = MongoDBSession(session);

const mongoURI = 'mongodb+srv://food:food@cluster0.vprdu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(mongoURI)
.then((res) => {
    console.log("MongoDB connected")
})

const store = new mongoDBSession({
    uri: mongoURI,
    collection: "mySessions",
})

const app = express();
app.use(cors());
app.use(express.json());

app.use(session({
    secret: 'key that will sign cookie',
    resave: false,
    saveUninitialized: false,
    store: store,
}))

app.get('/', (req, res) => {
    req.session.isAuth = true;
    res.send("Server is running OK.")
});

app.listen(4000);