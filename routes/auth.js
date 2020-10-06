const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, registerLogin, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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


//Login
router.post('/login', async (request, respond)  => {
    
    try{
        const {error} = loginValidation(request.body);
        if (error) return respond.status(400).send(error.details[0].message);

        //check if user exists
        const user = await User.findOne({email:request.body.email})
        if(!user) return respond.status(400).send("Email or password is wrong");
        
        // Password is correct
        const validPassword = await bcrypt.compare(request.body.password, user.password);
        if (!validPassword) return respond.status(400).send("Email or password is wrong");
        
        //Create and assign jwt token
        const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET);
        respond.header('auth-token', token).send(token);

    }catch(err){
        respond.status(400).send(err);
        console.log("Login validation error: " + err);
    }
    


});

module.exports = router;