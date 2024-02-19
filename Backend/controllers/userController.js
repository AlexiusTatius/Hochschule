import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '5d'})
}


// login user
const loginUser = async (req, res) => {
    const {email, username, password} = req.body;
    try{
        const user = await User.login(email, username, password);
        console.log(user._id)

        // create a token
        const token = createToken(user._id);

        res.status(200).json({email, token});
    }catch(error){
        res.status(400).json({error: error.message});
    }
}




// signup user
const signupUser = async (req, res) => {
    const {email, username, password} = req.body;
    console.log(req.body);
    try{
        const user = await User.signup(email, username, password);
        console.log(user._id)

        // create a token
        const token = createToken(user._id);

        res.status(200).json({email, token});
    }catch(error){
        res.status(400).json({error: error.message})
    }
    
}


export {signupUser, loginUser} 


/*
    The function of user controller is to handle the logic for the user routes.
    The controller functions are exported and used in the user routes.
*/

