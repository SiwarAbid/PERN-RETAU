import { Router } from 'express';
import {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
} from '../controllers/contact.controllers';

const router = Router();

router.post('/add-contact', (req, res, next) => {
  createContact(req, res).catch(next);
});

router.get('/contacts', getContacts);
router.get('/contact/:id', (req, res, next) => {
  getContactById(req, res).catch(next);
});

router.put('/update-contact/:id', updateContact);
router.delete('/delete-contact/:id', deleteContact);

export {router as contactRouter};