import express from 'express';
import { submitContactForm, getContacts } from '../controllers/contact.controller.js';

const router = express.Router();

router.post('/api/contact', submitContactForm);
router.get('/api/contacts', getContacts);

export default router;