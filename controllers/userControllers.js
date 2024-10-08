const User = require('../models/userModel')

const jwt = require('jsonwebtoken')

const createtoken = (_id) =>{
   return jwt.sign({_id},process.env.SECRET,{expiresIn: '1d'})

}



const loginUser = async (req,res)=>{
     
      const {email , password} = req.body
      try{
          const user = await User.login(email,password)
          
          const token = createtoken(user._id)
          res.status(200).json({email,token})

       }catch(error){
           res.status(400).json({error: error.message})
       }
       
   
}


const singupUser = async (req,res) =>{
       
       const {email,password} = req.body

       try{
          const user = await User.signup(email,password)
          
          const token = createtoken(user._id)
          res.status(200).json({email,token})

       }catch(error){
           res.status(400).json({error: error.message})
       }
       
}

module.exports = {singupUser ,loginUser}