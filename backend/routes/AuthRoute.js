// backend/routes/AuthRoute.js
import { Router } from 'express';
import AuthController from '../controllers/AuthController.js'; // perhatikan .js
import RegisterController from '../controllers/RegisterController.js';
const { login } = AuthController;

const router = Router();

router.post('/login', login);
router.post('/register', RegisterController.register);

export default router;
