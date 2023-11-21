const crypto = require('crypto')

const hashPassword = (data) => {
    const first = crypto.createHash('sha256').update(data.trim(), 'utf-8').digest('hex')
    const second =  crypto.createHash('sha1').update(first.trim(), 'utf-8').digest('hex')
    return  crypto.createHash('sha256').update(second.trim(), 'utf-8').digest('hex')
} 

module.exports = { hashPassword }