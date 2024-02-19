import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

mongoose.connect('mongodb+srv://AlexiusTatius:EPotsFC317I5iU0S@cluster0.kn9rdvg.mongodb.net/User_Authentication')

const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    email: {    
        type: String,
        required: true,
        unique: true
    }, 
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


// static signup method (hashing of password)
UserSchema.statics.signup = async function (email, username, password) {

    // validation
    if(!email || !username || !password){
        throw Error ("All fields must be filled");
    }
    if(!validator.isEmail(email)){
        throw Error ("Email is not valid");
    }
    if(!validator.isStrongPassword(password)){
        throw Error ("Password not strong enough");
    }
    if (username.length < 3 || username.length > 20) {
        throw Error ("Username too short or too long");
    }

    // Check for allowed characters (alphanumeric with underscores)
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        throw Error ("Username cannot be other than alphanumeric with underscores");
    }
    


    const exists = await this.findOne({ email })
    if (exists){
        throw Error('Email already in use');
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, username, password: hash });
    return user; 

}
// if email already exists, then throw an error

UserSchema.statics.login = async function(email, username, password){
    if(!email || !username || !password){
        throw Error ("All fields must be filled");
    }
    // no need for other checks if you've created an account you shall sign in.
    const user = await this.findOne({ email });
    if(!user){
        throw Error('Incorrect email');
    }
    const match = await bcrypt.compare(password, user.password); //user.password is the hashed one
    if(!match){
        throw Error('Invalid Log in credentials');
    }
    return user;
}

const User = mongoose.model('User', UserSchema)
export default User;


// We are defining the structure for the user document.
/*
    Mongoose won't allow you to save document to the database unless they adhere to the structure defined in the schema.
    This means that if you try to save a document with a field that is not defined in the schema, Mongoose will throw an error.
*/

