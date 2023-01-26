const jwt = require('jsonwebtoken')
const User = require('../models/User')

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET)
  return token
}

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET)

const attachCookiesToResponse = async ({ res, user, refreshToken, id }) => {
  const accessTokenJWT = createJWT({ payload: { user } })
  const refreshTokenJWT = createJWT({ payload: { user, refreshToken } })

  const oneDay = 1000 * 60
  const longerExp = 1000 * 60 * 2

  res.cookie('accessToken', accessTokenJWT, {
    httpOnly: true,
    signed: true,
    expires: new Date(Date.now() + oneDay),
  })

  res.cookie('refreshToken', refreshTokenJWT, {
    httpOnly: true,
    signed: true,
    expires: new Date(Date.now() + longerExp),
  })

  await User.findOneAndUpdate(
    { _id: id },
    { accessToken: accessTokenJWT, refreshToken: refreshTokenJWT },
    { new: true }
  )

  return { accessTokenJWT, refreshTokenJWT }
}

const createTokenUser = (user) => {
  return { userName: user.userName, userId: user._id, role: user.role }
}

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
}
