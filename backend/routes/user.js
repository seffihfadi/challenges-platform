import express from 'express';
import access from '../middlewares/auth.js';
import ROLES from '../utils/config/roles.js'
import { 
  signinUser, 
  signoutUser, 
  signupUser, 
  getUser,
  getAllUsers
} from '../controllers/user.js';

const userRoutes = express.Router();

userRoutes.post('/signin', signinUser);
userRoutes.post('/signup', signupUser);
userRoutes.get('/signout', signoutUser);
userRoutes.get('/get-users', access(ROLES.all), getAllUsers);

userRoutes.get('/get-user', access(ROLES.all), getUser);


export default userRoutes

// //forgot password token
// router.post('/forgot-password-token',forgotPasswordToken)
// // update password
// router.put('/update-password',authMiddleWare,updatePassword)
// //reset password 
// router.put('/reset-password/:token',resetPassword)
