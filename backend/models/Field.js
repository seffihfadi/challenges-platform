import {model, Schema, Types} from 'mongoose'

const challengeFieldSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true,
    max: 200
  },
  participents: [{
    type: Types.ObjectId,
    ref: 'User'
  }],
  challenges: [{
    type: Types.ObjectId,
    ref: 'Challenge'
  }],
  startsIn: {
    type: Date,
  },
  endsIn: {
    type: Date,
  }
}, {
  timestamps: true
})


const Field = model('Field', challengeFieldSchema)
export default Field