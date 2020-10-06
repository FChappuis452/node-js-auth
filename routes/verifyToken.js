const jwt = require('jsonwebtoken');

module.exports = function(request, respond, next){
    const token = request.header("auth-token");
    if(!token) return respond.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        request.user = verified;
        next();
    }catch(err){
        respond.status(400).send('Invalid Token');
        console.log("Web Token Error: " + err);
    }
}