import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';
import ChessComService from '../services/ChessComService.js';

export const initializeChessComAuth = () => {
  passport.use('chess.com', new OAuth2Strategy({
    authorizationURL: 'https://chess.com/oauth/authorize',
    tokenURL: 'https://chess.com/oauth/token',
    clientID: process.env.CHESS_COM_CLIENT_ID,
    clientSecret: process.env.CHESS_COM_CLIENT_SECRET,
    callbackURL: process.env.CHESS_COM_CALLBACK_URL,
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Get chess.com profile data
      const chesscomProfile = await ChessComService.getPlayerProfile(profile.username);
      const chesscomStats = await ChessComService.getPlayerStats(profile.username);

      // Find or create user
      let user = await UserModel.findOne({ 'chesscom.username': profile.username });
      
      if (!user) {
        user = new UserModel({
          username: profile.username,
          email: profile.email,
          firstname: profile.firstName,
          lastname: profile.lastName,
          chesscom: {
            userId: profile.id,
            username: profile.username,
            profile_url: chesscomProfile.url,
            ratings: {
              bullet: chesscomStats.chess_bullet?.last?.rating,
              blitz: chesscomStats.chess_blitz?.last?.rating,
              rapid: chesscomStats.chess_rapid?.last?.rating,
              classical: chesscomStats.chess_classical?.last?.rating,
            },
            title: chesscomProfile.title,
            status: chesscomProfile.status,
            joined: chesscomProfile.joined,
            last_online: chesscomProfile.last_online,
          }
        });
        await user.save();
      }

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
};

export const chessComCallback = async (req, res) => {
  try {
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(200).json({
      token,
      user: req.user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};