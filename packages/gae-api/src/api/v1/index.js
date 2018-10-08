import * as authController from './auth';
import * as healthController from './health';
import * as tasksController from './tasks';
import * as userController from './user';

const express = require('express');

const router = express.Router();

router.get('/auth/firebase', authController.login);
router.get('/auth/refresh', authController.refresh);
router.get('/auth/codegrant', authController.codeGrantAuthorize);

router.get('/ah/health', healthController.health);
router.post('/signup', userController.signup);
router.post('/authenticate', userController.authenticate);
router.get('/validate', userController.verifyUser);
router.post('/invite', userController.inviteUsersToWorkspace);
router.post('/workspace', userController.createWorkspace);
router.get('/tokens/:token/domains', userController.getDomains);
router.post('/notifications/event/add/:eventId', tasksController.addEvent);

router.post('/user/email/signup', userController.emailListSignup);

export default router;
