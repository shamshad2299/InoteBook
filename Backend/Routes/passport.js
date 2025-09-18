const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('./models/User');

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists
    let user = await User.findOne({ email: profile.emails[0].value });
    
    if (user) {
      // Update user if they signed up with another method before
      if (user.provider !== 'google') {
        user.provider = 'google';
        user.avatar = profile.photos[0].value;
        await user.save();
      }
      return done(null, user);
    }
    
    // Create new user
    user = await User.create({
      name: profile.displayName,
      email: profile.emails[0].value,
      provider: 'google',
      avatar: profile.photos[0].value
    });
    
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "/api/auth/github/callback",
  scope: ['user:email']
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // GitHub may not return email by default, so we need to handle that
    const email = profile.emails && profile.emails[0] ? profile.emails[0].value : `${profile.username}@github.com`;
    
    // Check if user already exists
    let user = await User.findOne({ email });
    
    if (user) {
      // Update user if they signed up with another method before
      if (user.provider !== 'github') {
        user.provider = 'github';
        user.avatar = profile.photos[0].value;
        await user.save();
      }
      return done(null, user);
    }
    
    // Create new user
    user = await User.create({
      name: profile.displayName || profile.username,
      email: email,
      provider: 'github',
      avatar: profile.photos[0].value
    });
    
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// Serialization (not strictly needed for JWT but required by Passport)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;