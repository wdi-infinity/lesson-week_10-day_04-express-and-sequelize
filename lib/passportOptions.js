import passportJWT from 'passport-jwt';
const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'SECRET_KEY'; // hash to protect the information

export default jwtOptions;