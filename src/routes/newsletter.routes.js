import express from 'express';
import { submitNewsletterForm, getEmails } from '../controllers/newsletter.controller.js';

const router = express.Router();

router.post('/api/newsletter', submitNewsletterForm);
router.get('/api/newsletters', getEmails);

export default router;