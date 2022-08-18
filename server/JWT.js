const { sign, verify } = require('jsonwebtoken')

const createToken = (user) => {
    const accessToken = sign(
        { email: user.email, id: user.id }, 
        "P3rexttabor!")
    return accessToken
}

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["login-cookie"]
    if (!accessToken){
        return res.status(400).json({ error: "User not authenticatecd" })
    }
    try {
        const validToken = verify(accessToken, "P3rexttabor!")
        if(validToken){
            req.authenticated = true
            return next()
        }
    }
    catch(err){
        console.log('err', err)
    }
}

module.exports = { createToken, validateToken }