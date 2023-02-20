import jwt from 'jsonwebtoken'

export const generateActiveToken = (payload : object) => {
    return jwt.sign(payload , `${process.env.ACTIVE_TOKEN_SECRET}`, {expiresIn : '1d'})
}

export const generateAccessToken = (payload : object) => {
    return jwt.sign(payload , `${process.env.ACCESS_TOKEN_SECRET}`, {expiresIn : '2d'})
}

export const generateRefreshToken = (payload : object) => {
    return jwt.sign(payload , `${process.env.REFRESH_TOKEN_SECRET}`, {expiresIn : '30d'})
}