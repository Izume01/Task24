const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../model/user')

passport.use(new LocalStrategy(
    {usernameField : "email"} , 
    async function(email, password , done) {
        try {
            const user = User.findOne({email})

            if(!user) {
                return done(null, false, { message: "No User with this email" });
            }

            if(!user.isValidPassword(password)) {
                return done(null, false, { message: "Incorrect Passoword" });
            }

            return done(null , user);
        } catch (error) {
            return done(error);
        }
    })
)

passport.serializeUser((user , done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    try {
      const user = User.findOne(id);   
      done(null, user);
    } catch (e) {
      return done(e);
    }
});
  

module.exports = passport; 