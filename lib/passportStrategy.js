import passportJWT from 'passport-jwt';
// Passport Options
import jwtOptions from './passportOptions';
import models from '../models';

// JSON Web Token Strategy object we will be using.
const JwtStrategy = passportJWT.Strategy;

const test_user = {id: 1, username: "Hala", password: "1234"}

// The function where we test to see if the requesting user
// has a valid JWT token or not. And to see if it has expired.
const strategy = new JwtStrategy(jwtOptions, (jwt_payloud, next) => {
    console.log('payloud received!')
    console.log(`user id: ${jwt_payloud.id}`)
    console.log(` token expires on: ${jwt_payloud.expires}`)
    models.Person.findOne({ where: {id: jwt_payloud.id} })
    .then(person => {
        if(person !== null) {
            next(null, person)
        } else {
            next(null, false)
        }
    })
    .catch(e => console.log(e))

    if(test_user.id === jwt_payloud.id){
        next(null, test_user)
    } else {
        next(null, false)
    }
})


export default strategy;