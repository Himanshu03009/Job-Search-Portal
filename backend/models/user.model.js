import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  fullname:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  phoneNumber:{
    type:Number,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  role:{
    type:String,
    enum:['student','recruiter'],
    required:true
  },
  profile:{
    bio: {
    type: String,
    trim: true
  },
  skills: [{
    type: String,
    trim: true
  }],
  resume: {
    type: String,  // yahan resume ka file path ya URL store karenge
    required: false,
  },
  resumeOriginalName: {
    type: String,
    required: false,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: false
  },
  profilePhoto: {
    type: String,
    default: ""  // empty string better hai instead of space
  }
  },

},{timestamps:true});
export const User = mongoose.model('User', userSchema);