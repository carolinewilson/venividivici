const request = require('request-promise');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secret = require('../config/tokens').secret;

function facebook(req, res) {
  request.get({
    url: 'https://graph.facebook.com/v2.5/oauth/access_token',
    qs: {
      code: req.body.code,
      client_id: process.env.FACEBOOK_APP_CW_ID,
      client_secret: process.env.FACEBOOK_APP_CW_SECRET,
      redirect_uri: req.body.redirectUri
    },
    json: true
  }).then((accessToken) => {

    // request user's profile with access token
    return request.get({
      url: 'https://graph.facebook.com/v2.5/me?fields=id,name,email,picture',
      qs: accessToken,
      json: true
    });
  }).then((profile) => {
    // find or create a user
    User.findOne({ email: profile.email }, (err, user) => {
      if(err) return res.status(500).json({ error: err });

      if(!user) {
        user = new User({
          facebookId: profile.id,
          profilePic: profile.picture.data.url,
          email: profile.email,
          username: `${profile.name}`
        });
      } else {
        user.facebookId = profile.id;
        user.profilePic = profile.picture.data.url;
      }

      user.save((err, user) => {
        if(err) return res.status(400).json({ error: err });

        // generate JWT and send to the client
        const payload = { _id: user._id, username: user.username };
        const token = jwt.sign(payload, secret, { expiresIn: '24h' });

        res.status(200).json({
          user,
          token
        });
      });
    });
  });
}


module.exports = {
  facebook
};
