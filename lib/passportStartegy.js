//is this user could access or not
//is the token expire or not
//Passport Package
import passportJWT from 'passport-jwt';

//Passport Option
import jwtOptions from './passportOptions';

//JSON Web Token Strategy object we will be using
const JWTStrategy = passportJWT.Strategy;

const test_user = {id:1, username: 'asmaa', password:'1234'};

//The function where we test to see if the requesting user
//has a valid JWT token or not.and to see if it has expired.

const startegy = new JWTStrategy(jwtOptions, (jwt_payload,next) => {

    console.log('payload received!');
    console.log(`user id:${jwt_payload.id}`);
   // console.log(`token expire in :${jwt_payload.expires}`);

if (test_user.id === jwt_payload.id){
    //if id is in database then lets run our original route
    next(null, test_user);
}else{
    //if id does not match ,skip our route and return 401
    next(null, false);
}
});

export default startegy;