const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/user');

passport.use(new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email }); // Await the user query

            if (!user) {
                return done(null, false, { message: "No User with this email" });
            }

            // Use the async isValidPassword method
            const isMatch = await user.isValidPassword(password);
            if (!isMatch) {
                return done(null, false, { message: "Incorrect Password" });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Use await in deserializeUser to fetch the user by ID
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id); // Await the user query
        done(null, user);
    } catch (e) {
        return done(e);
    }
});

module.exports = passport;
