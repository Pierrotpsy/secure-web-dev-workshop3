const access = (allowedRoles)=>(req,res, next)=>{
    if(!req.user){
        return res.status(403).send()
    }
    if (allowedRoles.includes(req.user.role)) {
        return next()
    }
    return res.status(403).send()
}

module.exports = {access}