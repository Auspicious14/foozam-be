import express from 'express';
import { addFavorite, removeFavorite, getFavorites } from '../controllers/favorite';
import { protect } from '../middlewares/auth';

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getFavorites)
    .post(addFavorite);

router.route('/:foodId')
    .delete(removeFavorite);

export default router;
