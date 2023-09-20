const jwt = require("jsonwebtoken");

const generateToken = (res, username) =>{
    const token = jwt.sign({ username },process.env.SECRET,{
        expiresIn: '1d'
    })

    res.cookie('access_token',token,{
        httpOnly:true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'None',
        maxAge: 86400000 //1day in miliseconds
    })
    
}

module.exports =  generateToken;
