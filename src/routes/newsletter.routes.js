import express from 'express';
import { submitNewsletterForm, getEmails } from '../controllers/newsletter.controller.js';

const router = express.Router();

router.post('/newsletter', submitNewsletterForm);
router.get('/newsletters', getEmails);

export default router;