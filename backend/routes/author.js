import express from "express";
import multer from "multer";
import { 
  getChallenges,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  getChallenge
} from '../controllers/author.js';
import access from '../middlewares/auth.js';
import ROLES from "../utils/config/roles.js";
import URLs from "../utils/config/urls.js";

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, URLs.challangeUpload);
  },
  filename: (req, file, cb) => {
    cb(null, `_${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });


const authorRoutes = express.Router()

authorRoutes.post('/create-challenge', access(ROLES.author), upload.single('assignment'), createChallenge);
authorRoutes.patch('/update-challenge/:challengeID', access(ROLES.author), updateChallenge);
authorRoutes.delete('/delete-challenge/:challengeID', access(ROLES.author), deleteChallenge);
authorRoutes.get('/get-challenge/:challengeID', access(ROLES.atp), getChallenge);
authorRoutes.get('/get-challenges/:fieldID', access(ROLES.atp), getChallenges);


export default authorRoutes