import { Router } from 'express';
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

router.get('/users', getUsers);
router.get('/user/:id', (req, res, next) => {
    getUserById(req, res).catch(next)
});
router.put('/update-user/:id', updateUser);
router.delete('/delete-user/:id', deleteUser);

export {router as userRouter};