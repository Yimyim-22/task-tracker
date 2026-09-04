const jwt = require("jsonwebtoken")

const authorizationToken = (req, res, next)=>{

    const authToken = req.headers.authorization
    if (!authToken) {                               //CHECKING IF TOKEN WAS INPUTED
        return res.json("Token not provided")
    }

    const newToken = authToken.split(" ")[1]        //SPLITTING THE BEARER HEADER FROM ACTUAL TOKEN
   
    let verifiedToken
    try {
         verifiedToken = jwt.verify(newToken, process.env.JWT_SECRET)
    } catch (error) {                               //VERYFING IF ITS A VALID TOKEN WITH A SECRET
        return res.json(error.message)
    }

    req.user = verifiedToken  //WHICH USER IS MAKING THE REQUEST

    next()
}

module.exports = {authorizationToken}