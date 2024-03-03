import Field from '../models/Field.js'
import User from '../models/User.js'
import ROLES from '../utils/config/roles.js'


// field controllers

export const createChallengeField = async (req, res, next) => {
  const {fieldName, startsIn, endsIn} = req.body
  try {
    if (!fieldName || !startsIn || !endsIn) {
      res.status(401)
      throw new Error('you must enter all required fields')
    }

    const field = await Field.findOne({name: fieldName})
    if (field) {
      res.status(403)
      throw new Error(`${fieldName} field already exists`)
    }

    const newField = await Field.create({name: fieldName, startsIn, endsIn})
    if (!newField) {
      res.status(500)
      throw new Error('an error was accured, please try later')
    }

    res.status(200).json({message: `field of ${newField.name} created successfuly`})
  } catch (error) {
    next(error)
  }
}

export const updateChallengeField = async (req, res, next) => {
  const { fieldID } = req.params
  const {fieldName, startsIn, endsIn} = req.body
  try {
    const field = await Field.findById(fieldID)
    if (!field) {
      res.status(404)
      throw new Error('field does not exist')
    }

    if (!fieldName || !startsIn || !endsIn) {
      res.status(401)
      throw new Error('you must enter all required fields')
    }

    const newFieldVersion = {
      name: fieldName || field.name,
      startsIn: startsIn || field.startsIn,
      endsIn: endsIn || field.endsIn,
    }

    await field.updateOne(newFieldVersion)
    await field.save()

    res.status(200).json({message: `field updated successfuly`})
  } catch (error) {
    next(error)
  }
}

export const deleteChallengeField = async (req, res, next) => {
  const { fieldID } = req.params
  try {
    const field = await Field.findById(fieldID)
    if (!field) {
      res.status(404)
      throw new Error('field does not exist')
    }
    await field.deleteOne()
    res.status(200).json({message: `${field.name} field deleted successfuly`})
  } catch (error) {
    next(error)
  }
}


export const getChallengeField = async (req, res, next) => {
  const { fieldID } = req.params
  try {
    const field = await Field.findById(fieldID).populate(['participents'])
    if (!field) {
      res.status(404)
      throw new Error('field does not exist')
    }
    
    res.status(200).json(field)
  } catch (error) {
    next(error)
  }
}

export const getChallengeFields = async (req, res, next) => {
  try {
    const fields = await Field.find().populate(['participents', 'challenges'])
    res.status(200).json(fields)
  } catch (error) {
    next(error)
  }
}


// users controllers

export const handleParticipantsStatus = async (req, res, next) => {
  const participantsIDs = req.body.users  
  let setTo = req.body.setTo
  
  try {
    if(!['accepted', 'rejected'].includes(setTo)) {
      res.status(400)
      throw new Error('submit a valid data')
    }
    const participants = await User.updateMany({_id: {$in: participantsIDs}}, {$set: {status: setTo}})
    res.status(200).json({message: `${participants.modifiedCount} participants have been ${setTo}`})
  } catch (error) {
    next(error)
  }
}


export const handleRoles = async (req, res, next) => {
  const authorsIDs = req.body.users  // assuming reseaving array of ObjectId
  let setTo = req.body.setTo
  try {
    setTo = !ROLES.atp.includes(setTo) ? ROLES.participant[0] : setTo;
    const authors = await User.updateMany({_id: {$in: authorsIDs}}, {$set: {role: setTo}})
    res.status(200).json({message: `${authors.modifiedCount} users have been set to ${setTo}`})

  } catch (error) {
    next(error)
  }
}