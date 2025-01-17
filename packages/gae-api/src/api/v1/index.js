import * as authRoutes from './auth';
import * as healthRoutes from './health';
import * as taskRoutes from './tasks';
import * as workspaceRoutes from './workspace';
import * as userRoutes from './user';
import * as emailRoutes from './email';

const express = require('express');

const router = express.Router();

router.get('/auth/firebase', authRoutes.login);
router.get('/auth/refresh', authRoutes.refresh);
router.get('/auth/codegrant', authRoutes.codeGrantAuthorize);
router.get('/auth/renew', authRoutes.renewSession);
router.get('/auth/profile', authRoutes.profile);
router.get('/auth/logout', authRoutes.logout);

router.get('/ah/health', healthRoutes.health);

router.get('/workspace/:id/invite/:nonce/accept', workspaceRoutes.acceptInvite);
router.post('/workspace/:id/invite', workspaceRoutes.inviteToWorkspace);
router.post('/workspace', workspaceRoutes.createWorkspace);

router.post('/notifications/event/add/:eventId', taskRoutes.addEvent);

router.get('/user/:uid/domains', userRoutes.getDomains);
router.post('/user/email/signup', userRoutes.emailListSignup);

router.get('/email/template/:name', emailRoutes.sendTemplate);

export default router;
