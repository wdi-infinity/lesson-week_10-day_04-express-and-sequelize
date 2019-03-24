// passport package
import  passportJWT from 'passport-jwt';
// passport options
import jwtOptions from './passportOptions';

// JSON web token strategy object we will be using

const JWTStrategy = passportJWT.Strategy;

const test_user = {id:1, username: "alia", password: "1234"};

// the function where we test to see if the requesting user has a valid JWT token or not and to see if it has expired.
const strategy = new JWTStrategy(jwtOptions, (jwt_payload, next) => {
    console.log('payload received!');
    console.log(`user id: ${jwt_payload.id}`);
    console.log(`token expires on: ${jwt_payload.expires}`);
    if(test_user.id ===jwt_payload.id){
        // if id is in databasr, then let's run our orginal route
        next(null, test_user);

    }else{
        // if id does not match, skip our route and return 401
        next(null, false);

    }
});

export default strategy;
