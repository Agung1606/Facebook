import express from 'express';
import expressAsyncErros from 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import multer from 'multer';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import authRouter from './routes/auth.js';
import userRouter from './routes/users.js';
import postRouter from './routes/posts.js';
import verifyToken from './middleware/auth.js';
import { createPost } from './controllers/posts.js';


// import User from './models/User.js';
// import Post from './models/Post.js';
// import { users, posts } from './data/index.js';

/* CONFIGURATION */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config(); // use this to access secret variable inside .env file
expressAsyncErros;
const app = express(); // express js
app.use(express.json());
app.use(helmet()); // securing HTTP headers. It sets up various HTTP headers to prevent attacks like Cross-Site-Scripting(XSS), clickjacking, etc.
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));
app.use(morgan("common")); // morgan is a Node.js and Express middleware to log HTTP requests and errors, and simplifies the process.
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());  // CORS stands for Cross-Origin Resource Sharing. It allows us to relax the security applied to an API.
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE */
const storage = multer.diskStorage({
    // whenever the user upload file it will be placed in public/assets
    destination: function(req, file, cb) {
        cb(null, 'public/assets');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage }); // if we wanna upload file we can use this variable

/* ROUTES WITH FILE */
app.use('/api/v1/posts/newPost', verifyToken, upload.single('picture'), createPost);

/* ROUTES */
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', verifyToken, userRouter);
app.use('/api/v1/posts', verifyToken, postRouter);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 8001;
const hostName = 'localhost';

mongoose.set('strictQuery', true); // to prevent deprecation warning
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);

    app.listen(PORT, hostName, () => console.log(`Server is listening on port ${PORT}...`));
}).catch((error) => console.error(`${error} did not found`))