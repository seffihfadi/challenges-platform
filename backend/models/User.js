import {model, Schema, Types} from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'fullname is required'],
    match: [/^(?=.{4,18}$)[a-zA-Z]+ [a-zA-Z]+$/, "{VALUE} is not a valid fullname"]
  },
  email: {
    type: String,
    required: [true, 'eamil is required'],
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "{VALUE} is not a valid gmail"]
  },
  password: {
    type: String,
    required: [true, 'password is required']

  },
  role: {
    type: String,
    enum: ['admin', 'author', 'participant'],
    default: 'participant'
  },
  motivation: {
    type: String,
    min: 5,
    max: 250,
    default: ''
  }, 
  points: {
    type: Number,
    default: 0
  },
  field: {
    type: Types.ObjectId,
    ref: 'Field'
  },
  isValid: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },

}, {
  timestamps: true
})


userSchema.pre('save', async function(next) {
  if (!this.isModified('password')){
    return next()
  }else {
    // encrypt password 
    const salt = bcrypt.genSaltSync(10)
    const hashPass = bcrypt.hashSync(this.password, salt)
    this.password = hashPass
    next()

  }
})


const User = model('User', userSchema)
export default User