import UserModel from '../Model/userModel.js'
import jwt from 'jsonwebtoken';



const createToken = (_id)=>{
    return jwt.sign({_id}, process.env.SECRET, { expiresIn:'3d' })
}

// login user
export const loginUser = async (req,res) =>{

    const{email,password} = req.body

    

    try{
        const user = await UserModel.login(email,password)
        
        //Create a Token
        const token = createToken(user._id)

        res.status(200).json({email,token})
    }catch(error){
        res.status(400).json({email: error.message})
    }
}

//Signup User
export const signupUser = async (req,res) =>{
    const {email, password} = req.body

    
    try{
        const user = await UserModel.signup(email,password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email,token})
    }catch(error){
        res.status(400).json({error:error.message})
    }

    
}

