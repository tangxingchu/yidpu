const fs = require('fs')
const path = require('path');
const crypto = require('crypto')

const publicKey = fs.readFileSync(path.join(__dirname, './pem/rsa_public_key.pem')).toString('utf-8')

const encrypt = (data) => {
    var buffer = new Buffer(data)
    var encrypted = crypto.publicEncrypt({
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PADDING //与java填充模式一致
    }, buffer)

    // 得到加密的密文
    let encryptedStr = encrypted.toString('base64')
    return encryptedStr;
}

module.exports = encrypt;