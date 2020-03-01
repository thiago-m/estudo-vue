const jwt = require('jsonwebtoken')

function getUserId (context) {
    // "Authorization": "Bearer <token_jwt>"  
    const Authorization = context.request.get('Authorization')
    if(Authorization) {
        const token = Authorization.replace('Bearer ', '')
        const { userId } = jwt.verify(token, 'sd@#$5aSD+_A*+AD-SAD+')
        return userId
    }

    throw new Error('Not authenticated!')

} 

module.exports = {
    getUserId
}