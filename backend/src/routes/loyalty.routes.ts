import { Router } from 'express';
import { LoyaltyPointController } from '../controllers/loyalty.controllers';

const router = Router();
const controller = new LoyaltyPointController();

router.post('/add-loyalty-point', controller.createLoyaltyPoint.bind(controller));
router.get('/get-loyalty-points', controller.getLoyaltyPoints.bind(controller));
router.put('/update-loyalty-point/:id', controller.updateLoyaltyPoint.bind(controller));
router.delete('/delete-loyalty-point/:id', controller.deleteLoyaltyPoint.bind(controller));

export default router;