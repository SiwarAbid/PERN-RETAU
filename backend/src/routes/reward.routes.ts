import { Router } from 'express';
import { RewardController } from '../controllers/reward.controllers';

const router = Router();
const controller = new RewardController();

router.post('/add-reward', controller.createReward.bind(controller));
router.get('/get-rewards', controller.getRewards.bind(controller));
router.put('/update-reward/:id', (req, res) => {
    controller.updateReward(req, res)
});
router.delete('/delete-reward/:id', (req, res) => {
    controller.deleteReward(req, res)
});

export default router;