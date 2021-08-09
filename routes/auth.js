const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require("bcryptjs");

router.post('/register', async (req, res)=>{
            const { username, email, password} = req.body;
            // chech for empty fields
                if(!username || typeof username !== 'string' || !email ){
                return res.status(422).json({error: 'field cannot be empty'})
            }

    try {
            //if user exist
                const userEmail = await User.findOne({email});
                if(userEmail){
                return res.status(422).json("user already exist")
            }
                   //hash password
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(password, salt);
                    const newUser = new User({
                        username,
                        email,
                        password: hashedPassword
                    });
                
                    const user = await newUser.save()
                res.status(200).json({message:"successfull"})   
    } catch (error) {
        res.status(500).json(error)
    }
});

//login
router.post('/login', async (req, res)=>{
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json("field cannot be blank")
        };
        const user = await User.findOne({ email: email })
            !user && res.status(400).json("Wrong credentials");

        const validatePassword = await bcrypt.compare(password, user.password);
        !validatePassword && res.status(400).json("Wrong credentials");

        res.status(200).json(user)
       
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router

