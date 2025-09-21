// const express = require('express');
// const passport = require('passport');
// const jwt = require('jsonwebtoken');
// const User  = require("../Models/user")
// const router = express.Router();

// // Generate JWT Token
// const generateToken = (userId) => {
//   return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
// };

// // Google OAuth routes
// // router.get('/google',
// //   passport.authenticate('google', { scope: ['profile', 'email'] })
// // );

// // router.get('/google/callback',
// //   passport.authenticate('google', { 
// //     failureRedirect: process.env.FRONTEND_URL + '/login?error=google-auth-failed',
// //     session: false 
// //   }),
// //   (req, res) => {
// //     // Successful authentication, generate JWT and redirect
// //     const token = generateToken(req.user._id);
// //     res.redirect(`${process.env.FRONTEND_URL}/oauth-callback?token=${token}&user=${encodeURIComponent(JSON.stringify({ id: req.user._id, name: req.user.name, email: req.user.email }))}`);
// //   }
// // );

// // // GitHub OAuth routes
// // router.get('/github',
// //   passport.authenticate('github', { scope: ['user:email'] })
// // );

// // router.get('/github/callback',
// //   passport.authenticate('github', { 
// //     failureRedirect: process.env.FRONTEND_URL + '/login?error=github-auth-failed',
// //     session: false 
// //   }),
// //   (req, res) => {
// //     // Successful authentication, generate JWT and redirect
// //     const token = generateToken(req.user._id);
// //     res.redirect(`${process.env.FRONTEND_URL}/oauth-callback?token=${token}&user=${encodeURIComponent(JSON.stringify({ id: req.user._id, name: req.user.name, email: req.user.email }))}`);
// //   }
// // );

// // Verify token endpoint
// // router.get('/verify', async (req, res) => {
// //   try {
// //     const token = req.header('Authorization')?.replace('Bearer ', '');
    
// //     if (!token) {
// //       return res.status(401).json({ success: false, error: 'Access denied' });
// //     }
    
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     const user = await User.findById(decoded.userId).select('-password');
    
// //     if (!user) {
// //       return res.status(404).json({ success: false, error: 'User not found' });
// //     }
    
// //     res.json({ success: true, user });
// //   } catch (error) {
// //     res.status(401).json({ success: false, error: 'Invalid token' });
// //   }
// // });

// module.exports = router;