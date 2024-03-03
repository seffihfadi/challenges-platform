import express from "express";
import { 
  createChallengeField, 
  updateChallengeField, 
  deleteChallengeField,
  getChallengeField,
  getChallengeFields,
  handleRoles,
  handleParticipantsStatus,
} from "../controllers/admin.js";
import access from '../middlewares/auth.js';
import ROLES from "../utils/config/roles.js";

const adminRoutes = express.Router()

adminRoutes.get('/get-challenge-fields', access(ROLES.atp), getChallengeFields);
adminRoutes.post('/create-challenge-field', access(ROLES.admin), createChallengeField);
adminRoutes.post('/participants-status', access(ROLES.admin), handleParticipantsStatus);
adminRoutes.post('/make-authors', access(ROLES.admin), handleRoles);

adminRoutes.patch('/update-challenge-field/:fieldID', access(ROLES.admin), updateChallengeField);
adminRoutes.delete('/delete-challenge-field/:fieldID', access(ROLES.admin), deleteChallengeField);
adminRoutes.get('/get-challenge-field/:fieldID', access(ROLES.atp), getChallengeField);


export default adminRoutes