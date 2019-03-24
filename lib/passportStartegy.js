// contains code that determine user related authentecation requirements e.g: 

//passport pkg.
import passportJWT from 'passport-jwt';
//passport options
import jwtOptions from './passportOptions';

// JSON Web Token Strategy object we will be using.
const JWTstrategy = passportJWT.Strategy;
const test_user = { id: 1, username: 'Abdurahman', password: '1234'};

//the function where we see whether the requesting user
// has a valid JWT token or not. And to see if it has expired.
const startegy = new JWTstrategy(jwtOptions, (jwt_payload, next)=> {
    console.log('payload recieved');
    console.log(`user id: ${jwt_payload.id}`)
    console.log(`token expires in : ${jwt_payload.expires}`);
    
    if(test_user.id === jwt_payload.id) {
        // If id is in database, then lets run our original route
        next(null, test_user);
    } else {
        // if id does not match, skip our routes and return 401
        next(null, false);
    }
});

export default startegy;

