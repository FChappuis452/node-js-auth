const router = require('express').Router();
const User = require('../model/User');
const {registerValidation} = require('../validation');
const bcrypt = require('bcryptjs');


router.post('/register', async (request, respond)  => {
    
    //Validate Data
    try{
        const {error} = registerValidation(request.body);
        if (error) return respond.status(400).send(error.details[0].message); 
        
        //check if user exists
        const emailExist = await User.findOne({email:request.body.email})
        if(emailExist) return respond.status(400).send("Email already exists");

        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(request.body.password, salt);

        //Create new user
        const user = new User({
            name: request.body.name,
            email: request.body.email,
            password: hashPassword    
        });
        const savedUser = await user.save();
        respond.send({user: user._id});
   
    }catch(err){
        respond.status(400).send(err);
        console.log("Register Validation Error: " + err);
    }
});

module.exports = router;