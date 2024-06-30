const { default: mongoose } = require('mongoose')
const Notes = require('../models/Notes')
const User = require('../models/userModel');
const getNote = async(req,res)=>{
    const {id} = req.params
    const notes = await Notes.findById(id)
    if(!notes){
        return res.status(404).json({
            error:"NO such a note"
        })
    }
    res.status(200).json(notes)
}

const deleteNote = async(req,res)=>{

      const {id} = req.params
      if(!mongoose.Types.ObjectId.isValid(id)){
          return res.status(404).json({error: "no such data"})
      }
      const notes = await Notes.findOneAndDelete({_id:id})
       if(!notes){
        return res.status(404).json({
            error:"NO such a note"
        })
    }
    res.status(200).json(notes)
}



const getNotes = async (req, res) => {
    const user_id = req.user._id
    const notes = await Notes.find({ user_id }).sort({createdAt:-1})
    res.status(200).json(notes)
} 
//create



const create = async (req, res) => {
    const { title, date, note } = req.body;
    let emptyFields = []
    if(!title){
        emptyFields.push('title')
    }
    if(!date){
        emptyFields.push('date')
    }
    if(!note){
        emptyFields.push('note')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({
            error:'please fill in all the fields',emptyFields
        })
    }
    try {
        const user_id = req.user._id
        const workout = await Notes.create({ title, date, note,user_id});
        res.status(201).json(workout);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create a new workout' });
    }
} 

const update = async(req,res) =>{
    const {id} = req.params
      if(!mongoose.Types.ObjectId.isValid(id)){
          return res.status(404).json({error: "no such data"})
      }
    const notes = await Notes.findByIdAndUpdate({_id:id},{
        ...req.body
    })
    if(!notes){
        return res.status(404).json({
            error:"NO such a note"
        })
    }
    const updatenotes = await Notes.findById(id)
    res.status(200).json(updatenotes)

}

//get a single workout



module.exports = {
    getNote,
    getNotes,
    create,
    deleteNote,
    update
}

