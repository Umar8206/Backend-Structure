import express from 'express'
import ping from './ping.js';
import auth from './auth.js';
import otp from './otp.js';
import user from './user.js';
import chat from './chat.js';

const router = express.Router();


// Routes
const routes = [
  { path: '/ping', route: ping },
  { path: '/auth', route: auth },
  { path: '/otp', route: otp },
  { path: '/user', route: user },
  { path: '/chat', route: chat },



,
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router; 