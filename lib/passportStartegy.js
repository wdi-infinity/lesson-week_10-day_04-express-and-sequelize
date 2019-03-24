import models from '../models';
// Passport Package
import passportJWT from 'passport-jwt';
// Passport Options
import jwtOptions from './passportOptions';

// JSON Web Token Strategy object we will be using 
const JwrStrategy = passportJWT.Strategy;
//Dummy user
// const test_user = { id: 1, username: "glllory", password: "1234" }

const startegy = new JwrStrategy(jwtOptions, (jwt_payloud, next) => {
    console.log('payloud received!')
    console.log(`user id: ${jwt_payloud.id}`)
    console.log(` token expires on: ${jwt_payloud.expires}`)
    models.Person.findOne({ where: { id: jwt_payloud.id } })
        .then(person => {
            if (person !== null) {
                next(null, person)
            } else {
                next(null, false)
            }
        })
        .catch(e => console.log(e))

    // if(test_user.id === jwt_payloud.id){
    //     next(null, test_user)
    // } else {
    //     next(null, false)
    // }
})

export default startegy;