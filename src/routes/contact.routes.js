import express from 'express';
import { submitContactForm, getContacts } from '../controllers/contact.controller.js';

const router = express.Router();

router.post('/contact', submitContactForm);
router.get('/contacts', getContacts);

export default router;