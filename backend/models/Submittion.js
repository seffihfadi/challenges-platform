import {model, Schema, Types} from 'mongoose'

const submittionSchema = new Schema({
  participent: {
    type: Types.ObjectId,
    ref: 'User'
  },
  challenge: {
    type: Types.ObjectId,
    ref: 'Challenge'
  },
  submittion: {
    type: String,
    min: 5,
    max: 250,
    required: true
  }, 
  status: {
    type: String,
    enum: ['pending', 'judging', 'accepted', 'rejected'],
    default: 'pending'
  },
  points: {
    type: Number,
    default: 0
  },
  hint: {
    type: String,
    max: 250,
  }
}, {
  timestamps: true
})


const Submittion = model('Submittion', submittionSchema)
export default Submittion