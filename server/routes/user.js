import express from 'express';
import { allFav, bookVisit, cancelBooking, contact, createUser, getAllBookings, toFav } from '../controllers/userController.js';
import jwtCheck from '../middleware/jwt.js';

const router = express.Router();


router.post('/register', jwtCheck, createUser);
router.post('/bookVisit/:id', jwtCheck, bookVisit);
router.post('/allBookings', jwtCheck, getAllBookings);
router.post('/cancelBook/:id', jwtCheck, cancelBooking);
router.post('/fav/:rid', jwtCheck, toFav);
router.post('/allFav', jwtCheck, allFav);
router.post('/contact', contact);


export { router as userRoute}
