const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

const validator = require('validator')
const Schema = mongoose.Schema


const userSchema = new Schema({
    email:{
       type:String,
       required:true,
       unique:true
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.statics.signup = async function(email,password){
      

    if(!email || !password){
        throw Error('All Fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Please enter a valid email')
    }
   if (!validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })) {
        throw Error('Password is weak. It must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol.');
    }
    const exists = await this.findOne({ email })
 

    if(exists){
        throw Error('email already exists')
    }
    
    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email,password: hash})
    
    return user
}
userSchema.statics.login = async function(email,password){
     if(!email || !password){
        throw Error('All Fields must be filled')
    }
    const user = await this.findOne({ email })
 

    if(!user){
        throw Error('Incorrect email')
    }
    
    const match = await bcrypt.compare(password,user.password)

    if(!match){
        throw Error('Incorrect password')
    }
    return user

}
module.exports = mongoose.model('user',userSchema)