const { body, validationResult } = require('express-validator');

exports.validationSignUp = [
    body('email','you must enter a valid Email').isEmail(),
    body('password','you mast enter min 8 char').isLength({min : 8})
]

exports.validationSignIn = [
    body('email','you must enter a valid Email').isEmail()
]
exports.validation = (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
}