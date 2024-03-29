import express from 'express';
import multer from 'multer';
import path from 'path';
import userRoutes from './routes/user.js';
import dotenv from 'dotenv'

const app = express();
dotenv.config('./env');
const PORT = process.env.PORT || 3000;

// const upload = multer({dest: "uploads/"})   // upload is a middleware, which will be used to upload files

app.use(express.json()); // for parsing json data
app.use(express.urlencoded({ extended: false })); // for parsing form data

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        return callback(null, './uploads')
    },
    filename: function (req, file, callback) {
        return callback(null, `${Date.now()}-${file.originalname}`);
    },
});


// routes
app.use('/api/user', userRoutes)





app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// different middlewares
const upload = multer({ storage });




app.get("/", (req, res) => {
    return res.status(200).send("It's working");
});

app.post('/upload', upload.single('profileImage'), (req, res) => {
    console.log(req.body);
    console.log(req.file);

    return res.redirect('/');
});

app.get('/fetch_files', (req, res) => {

});
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
