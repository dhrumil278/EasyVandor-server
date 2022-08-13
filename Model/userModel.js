import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from 'validator';

const userSchema = mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true,
            // unique:true
        }
    }
)

// static signup Method
userSchema.statics.signup = async function ( email, password ) {
    
    console.log(email,password)
    
    //validation
    if(!email || !password){
        throw Error('All the Field must be Filled..!!')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not Valid.!')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong Enough.!')
    }
    
    const exists = await this.findOne({ email })

    if(exists){
        throw Error('Email already in use')
    }
    
    // convert password into a hash password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash})

    return user
}

// static login method

userSchema.statics.login = async function (email, password){
    if(!email || !password){
        throw Error('All Fields must be filled.!')
    }
    
    const user = await this.findOne({email})

    if(!user){
        throw Error('Incorrect Email.!')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect Password.!')
    }

    return user
}

const UserModel = mongoose.model('User', userSchema)

export default UserModel ;