const session = require('express-session')
const User = require('../../models/users')
const bcrypt = require('bcrypt')

class authController{
    async reg(req, res){
        const {username, email, password} = req.body;
        const person = await User.findOne({username})
        if(person){res.redirect('/')}

        const hashedPas = await bcrypt.hash(password, 12)

        const user = new User({
            username,
            email,
            password: hashedPas
        })
        await user.save()
        res.redirect('/');
    }
    async login(req, res){
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if (!user){
            return res.redirect('/')
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.redirect('/')
        }
        res.redirect('/home')
    }
    logout(req, res){
        req.session.destroy((err)=>{
            if(err) throw err;
            res.redirect('/')
        })
    }
}

module.exports = new authController();