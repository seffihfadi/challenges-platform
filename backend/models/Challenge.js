import {model, Schema, Types} from 'mongoose'

const challengeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    min: 5,
    max: 250,
    default: ''
  },
  author: {
    type: Types.ObjectId,
    ref: 'User'
  },
  
  field: {
    type: Types.ObjectId,
    ref: 'Field'
  },
  mark: {
    type: Number,
    required: true,
    default: 0
  }, 
  maxSubmittions: {
    type: Number,
    default: 3
  }, 
  assignment: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})


const Challenge = model('Challenge', challengeSchema)
export default Challenge