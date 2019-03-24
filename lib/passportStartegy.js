// Passport Package
import passportJWT from 'passport-jwt';
// Passport Options
import jwtOptions from './passportOptions';

// JSON Web Token Strategy object we will be using 
const JwrStrategy = passportJWT.Strategy;
//Dummy user
const test_user = { id: 1, username: "fajr", password: "1234" }

const startegy = new JwrStrategy(jwtOptions, (jwt_payload, next) => {
    console.log("payload received");
    console.log(`user id:"${jwt_payload.id}`);
    // console.log(`user id:"${jwt_payload.id}`);
    //jwt_payload.id is the token
    if (test_user.id === jwt_payload.id) {
        //if id is in the db, then run original route
        next(null, test_user);

    } else {
        next(null, false);
    }

});

export default startegy;