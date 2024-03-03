import Challenge from "../models/Challenge.js";
import Submittion from "../models/Submittion.js";
import Field from "../models/Field.js";
import path from 'path'
import { fileURLToPath } from "url";
import fs from 'fs'

export const addSubmittion = async (req, res, next) => {
  const { challengeID } = req.params;
  const { submittion } = req.body;
  const { _id: participantSessionID } = req.user;
  try {
    if (!submittion) {
      res.status(400)
      throw new Error('you are required to submit something')
    }

    const field = await Field.findOne({challenges: challengeID})
    if (!field) {
      res.status(400)
      throw new Error('field does not exists')
    }
    
    const currentTime = new Date();
    const challengeEndTime = new Date(field.endsIn);
    
    if (currentTime > challengeEndTime) {
      res.status(400);
      throw new Error('challenge submission deadline has passed');
    }
    
    const challenge = await Challenge.findById(challengeID)
    if (!challenge) {
      res.status(400)
      throw new Error('challenge does not exists')
    }
    const maxSubmittions = challenge.maxSubmittions;
    const previousSubmittions = await Submittion.find({
      participent: participantSessionID, 
      challenge: challengeID,
    })

    console.log('previ', previousSubmittions)

    if (previousSubmittions.length >= maxSubmittions) {
      res.status(405)
      throw new Error(`you have already submitted ${previousSubmittions.length} times, further submissions are not allowed`)
    }

    const hasPendingOrJudging = previousSubmittions.some(submission => submission.status === 'pending' || submission.status === 'judging');

    if (hasPendingOrJudging) {
      res.status(405)
      throw new Error(`You already have one submission that has not been responded to yet.`)
    }
    
    const submt = await Submittion.create({
      submittion, 
      participent: participantSessionID, 
      challenge: challengeID
    })

    if (!submt) {
      res.status(500)
      throw new Error('your submission was not successful. try again later.')
    }

    return res.status(201).json({message: 'your submission has been successfully uploaded'})

  } catch (error) {
    next(error);
  }
};

export const evaluateSubmittion = async (req, res, next) => {
  const {_id: authorSessionID} = req.user;
  const {submittionID} = req.params;
  const {decision, points, hint} = req.body;
  try {
    if (!['judging', 'accepted', 'rejected'].includes(decision)) {
      res.status(400)
      throw new Error('this is not a valid decision')
    }

    const sub = await Submittion.findById(submittionID).populate('challenge')
    if (!sub) {
      res.status(400)
      throw new Error('this submittion does not exist')
    }

    if(sub.challenge.author.toString() !== authorSessionID.toString()) {
      res.status(403)
      throw new Error('you can not make decisions on this challenge')
    }

    if (decision === 'judging') {
      await sub.updateOne({status: decision})
      await sub.save()
      return res.status(204).json()
    } 

    let subMark;
    if (decision === 'accepted') {
      if (!points || points > sub.challenge.mark) {
        res.status(400)
        throw new Error('you must provide a valid mark')
      }

      subMark = points
    } else {
      subMark = 0
    }

    await sub.updateOne({points: subMark, hint, status: decision})
    await sub.save()

    return res.status(200).json({message: `this submission have been ${decision}`})

  } catch (error) {
    next(error);
  }
};

export const getSubmittion = async (req, res, next) => {
  const {_id: userSessionID, role} = req.user;
  const {submittionID} = req.params;

  try {
    const sub = await Submittion.findById(submittionID).populate(['challenge', 'participent'])
    if (!sub) {
      res.status(400)
      throw new Error('this submittion does not exist')
    }
    const haventAccess 
      =  sub.participent.toString() !== userSessionID.toString() 
      && sub.challenge.author.toString() !== userSessionID.toString()

    // console.log(sub.challenge.author.toString() !== userSessionID.toString())
    if (haventAccess) {
      res.status(403)
      throw new Error('you have not access to this submission')
    }

    return res.status(200).json(sub)
    
    
  } catch (error) {
    next(error);
  }
};

export const getUserSubmittions = async (req, res, next) => {
  const {challengeID} = req.params
  const {_id: sessionID} = req.user
  try {
    const subs = await Submittion.find({participent: sessionID, challenge: challengeID}).populate(['challenge'])
    res.status(200).json(subs)
  } catch (error) {
    next(error)
  }
}


// for author
export const getSubmittions = async (req, res, next) => {
  const {challengeID} = req.params
  const {_id: sessionID} = req.user
  try {
    const subs = await Submittion.find({challenge: challengeID, status: 'pending'}).populate(['challenge', 'participent'])
    res.status(200).json(subs)

  } catch (error) {
    next(error)
  }
}


export const downloadAssignment = async (req, res, next) => {
  const {assignment} = req.params
  // console.log('challenge', assignment)
  try {
    // const __filename = fileURLToPath(import.meta.url);
    // const __dirname = path.dirname(__filename);
    // const filePath = path.join(__dirname, 'data', 'uploads', 'challenges', assignment);
    
    // const options = {
    //   headers: {
    //     'Content-Type': 'application/pdf',
    //     'Content-Disposition': `attachment; filename=${assignment}`,
    //   },
    // }
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename=${assignment}`)

    res.download('./data/uploads/challenges/' + assignment)
    // const challenge = await Challenge.findById(challengeID)
    // if(!challenge) {
    //   res.status(400)
    //   throw new Error('this challenge does not exist')
    // }

    // var file = fs.createReadStream('./data/uploads/challenges/'+ challenge.assignment);
    // var stat = fs.statSync('./data/uploads/challenges/'+ challenge.assignment);
    // res.setHeader('Content-Length', stat.size);
    // res.setHeader('Content-Type', 'application/pdf');
    // res.setHeader('Content-Disposition', `attachment; filename=${challenge.assignment}`);
    // return file.pipe(res);

    // const __filename = fileURLToPath(import.meta.url);
    // const __dirname = path.dirname(__filename);
    // console.log('filePath', filePath)
    // res.download(filePath, challenge.assignment, (err) => {
    //   if (err) {
    //     console.error('Error downloading file:', err)
    //     res.status(500).send('Error downloading file')
    //   }
    // })
  } catch (error) {
    next(error)
  }
}
