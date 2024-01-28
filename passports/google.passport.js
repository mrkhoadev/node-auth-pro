const GoogleStrategy = require("passport-google-oauth2").Strategy;

module.exports = new GoogleStrategy(
    {
      clientID: "1048703701057-u6c8ottrdve08q7smn2mrr2o920t7lon.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: `${process.env.HOSTING}/auth/google/callback`,
      scope: ["profile", "email"],
    },
    function (request, accessToken, refreshToken, profile, done) {
      done(null, profile);
    },
  );
