import jwt from "jsonwebtoken"
require('dotenv').config()

let generateJWTAccessToken = (data) => {
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20s" })
    return accessToken
}

let generateJWTRefreshToken = (data) => {
    const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1h" })
    return refreshToken
}

let verifyAcessToken = (token) => {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return {
                status: 403,
                mess: "Token is not valid!"
            }
        }
        else {
            return true
        }
    })
}

let verifyRefreshToken = (token) => {
    jwt.verify(accessToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return {
                status: 403,
                mess: "Token is not valid!"
            }
        }
        else {
            return true
        }
    })
}

let refreshToken = (token) => {
    let result = {}
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            result = {
                status: 403,
                mess: err.name
            }
        }
        else {
            const { iat, exp, ...info } = user
            const newAccessToken = generateJWTAccessToken(info);
            // const newRefreshToken = generateJWTRefreshToken(info);
            result = {
                status: 200,
                accessToken: newAccessToken,
                // refreshToken: newRefreshToken,
                user: user
            }
        }
    })
    return result
}

module.exports = {
    generateJWTAccessToken, generateJWTRefreshToken, refreshToken
}