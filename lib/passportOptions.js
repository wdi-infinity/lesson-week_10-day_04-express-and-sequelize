import passportJWT from 'passport-jwt';
const ExtractJWT = passportJWT.ExtractJwt;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'SECRET_KEY';

export default jwtOptions;