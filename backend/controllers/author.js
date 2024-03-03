import Challenge from "../models/Challenge.js";
import Field from '../models/Field.js'
import fs from 'fs/promises'
import deleteFiles from "../utils/deleteFiles.js";
import URLs from "../utils/config/urls.js";
import ROLES from "../utils/config/roles.js";
// import cloudinary from "../utils/cloudinary.js";

// challenges controllers

export const createChallenge = async (req, res, next) => {
  const { challengeName, description, mark, maxSubmittions, field } = req.body;
  const assignment = req.file;
  const { _id: authorSessionID } = req.user;

  try {
    if (!assignment || !description || !mark || !maxSubmittions || !challengeName || !field) {
      return res.status(400).json({ message: 'missing data, fill in all required fields' });
    }

    if (assignment.mimetype !== 'application/pdf') {
      return res.status(400).json({ message: 'invalid file type. only PDF files are allowed' });
    }

    const fieldExists = await Field.findById(field);
    if (!fieldExists) {
      return res.status(400).json({ message: 'this field does not exist' });
    }

    const challengeExists = await Challenge.findOne({ name: challengeName });
    if (!!challengeExists) {
      return res.status(401).json({ message: `${challengeName} already exists` });
    }

    const underChallengeName = challengeName.replace(/ /g, "_") + '_challenge.pdf'
    const filePath = `${URLs.challangeUpload}/${underChallengeName}`;

    await fs.rename(assignment.path, filePath);

    deleteFiles(`${URLs.challangeUpload}/`, '_')

    await Challenge.create({
      mark,
      field,
      description,
      maxSubmittions,
      name: challengeName,
      assignment: underChallengeName,
      author: authorSessionID,
    });

    return res.json({ message: `${challengeName} challenge created successfully` });
  } catch (error) {
    next(error);
  }
};

export const updateChallenge = async (req, res, next) => { // not tested 
  // the author can update the desc, mark and maxSub 
  // else delete challenge and create another one

  const { challengeID } = req.params;
  const { description, mark, maxSubmittions, challengeName } = req.body;
  const { _id: authorSessionID } = req.user;
  
  try {
    const challenge = await Challenge.findOne({_id: challengeID, author: authorSessionID});
    // console.log('mark', challenge)
    if (!challenge) {
      res.status(400)
      throw new Error('this challenge does not exist')
    }

    const newChallenge = {
      mark: mark || challenge.mark,
      name: challengeName || challenge.name,
      description: description || challenge.description,
      maxSubmittions: maxSubmittions || challenge.maxSubmittions,
    }

    await challenge.updateOne(newChallenge);
    await challenge.save()

    res.status(200).json({message: `${challenge.name} updated successfuly`})

  } catch (error) {
    next(error);
  }
};

export const deleteChallenge = async (req, res, next) => {
  const { challengeID } = req.params;
  
  try {
    const challenge = await Challenge.findById(challengeID)
    if (!challenge) {
      res.status(404)
      throw new Error('challenge does not exist')
    }
    await challenge.deleteOne()
    res.status(200).json({message: `${challenge.name} challenge deleted successfuly`})
  } catch (error) {
    next(error);
  }
};

export const getChallenge = async (req, res, next) => {
  const { challengeID } = req.params;
  
  try {
    const challenge = await Challenge.findById(challengeID).populate('author', 'fullname')
    if (!challenge) {
      res.status(404)
      throw new Error('challenge does not exist')
    }
    
    res.status(200).json(challenge)
  } catch (error) {
    next(error);
  }
};

export const getChallenges = async (req, res, next) => {
  const {fieldID} = req.params
  const {field: userFieldID, role, _id: sessionID} = req.user
  try {
    if (ROLES.tp.includes(role) && userFieldID.toString() !== fieldID.toString()) {
      res.status(403)
      throw new Error('unuthorized to see other challenges')
    }



    if (role === ROLES.author[0]) {
      const authorChallenges = await Challenge.find({author: sessionID}).populate({
        path: 'author', 
        select: 'fullname'
      })
      return res.status(200).json(authorChallenges)
    }

    const field = await Field.findById(fieldID).populate({
      path: 'challenges',
      populate: { path: 'author', select: 'fullname' }
    });
    
    if (!field) {
      res.status(400)
      throw new Error('challenges not found')
    }
    return res.status(200).json(field.challenges)
    
  } catch (error) {
    next(error)
  }
};






// await cloudinary.uploader.upload_stream({
//     resource_type: 'auto',
//     public_id: challengeName.replace(/ /g, "_") + '_challenge' || undefined,
//     pages: true,
//   },
//   async (error, result) => {
//     if (error) {
//       return res.status(500).json({ message: 'upload failed' });
//     } else {
//       const { secure_url } = result;
//       // res.json(secure_url)
      
//     }
//   }
// ).end(assignment.buffer);