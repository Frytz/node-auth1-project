const router = require('express').Router();
const bcrypt = require ('bcryptjs');
const Users = require("../user/users_model");


router.post('/newuser', async (req, res, next) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 10)
    user.password = hash
    try {
        const saved = await Users.add(user);
        res.status(201).json(saved);
    }
    catch (err) {
        next(err);
    }
});

router.post('/login', async (req, res, next) => {
    const { username, password} = req.body;
    try {
        const user = await Users.findBy({username})
            .first();
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = user;
            res.status(200).json({message: `welcome ${username}`})
        }
        else {
            res.status(401).json({message: 'invalid password'})
        }   
    }
    catch (err){
        next(err);
    }
    });

    router.get('/logout', (req, res) =>{
    
        if (req.session) {
                req.session.destroy( err => {
                    if (err){
                            res.send('you can checkout anytime you like, but you can never ...')
                    }
                    else {
                            res.send('so long, and thanks for all the fish')
                    }
                })
        }
        else {
                res.end();
        }
})


module.exports = router;