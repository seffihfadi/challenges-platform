import express from "express";
import { 
  evaluateSubmittion,
  addSubmittion,
  getSubmittion,
  getUserSubmittions,
  downloadAssignment,
  getSubmittions
} from '../controllers/participant.js';
import access from '../middlewares/auth.js';
import ROLES from "../utils/config/roles.js";

const participantRoutes = express.Router()

participantRoutes.get('/download-assignment/:assignment', access(ROLES.atp), downloadAssignment);
participantRoutes.post('/add-submittion/:challengeID', access(ROLES.participant), addSubmittion);
participantRoutes.patch('/evaluate-submittion/:submittionID', access(ROLES.author), evaluateSubmittion);
participantRoutes.get('/get-submittion/:submittionID', access(ROLES.atp), getSubmittion);
participantRoutes.get('/get-submittions/:challengeID', access(ROLES.atp), getSubmittions);

participantRoutes.get('/get-my-submittions/:challengeID', access(ROLES.atp), getUserSubmittions);


export default participantRoutes