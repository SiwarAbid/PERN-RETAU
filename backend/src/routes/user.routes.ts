import { Router } from 'express';
import { upload } from '../middlewares/upload';
import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser, 
} from '../controllers/user.controllers';

const router = Router();

router.post('/add-user', (req, res, next) => {
    createUser(req, res).catch(next);
});

router.get('/users', (req, res, next) => {
    console.log('Router GET USERS');
    console.log('Full URL:', req.url);
    console.log('Query params:', req.query);
    getUsers(req, res).catch(next);
});
router.get('/user/:id', (req, res, next) => {
    getUserById(req, res).catch(next)
});
router.put('/update-user/:id', upload.single('image'), (req, res, next) => {
    updateUser(req, res).catch(next);
});
router.delete('/delete-user/:id', deleteUser);

export {router as userRouter};