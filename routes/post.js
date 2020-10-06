const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/',verify, (request, respond) => {
    respond.json({
        posts: {
            title: 'my first post',
            description: 'random data you shouldnt access'
        }
    });
});


module.exports = router;