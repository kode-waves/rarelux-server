const crypto = require('crypto');

const randomKey = () => {
    const secretKey = crypto.randomBytes(64).toString('hex');
    return secretKey
}

module.exports = randomKey