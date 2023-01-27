const User = require('../models/User')
const Token = require('../models/Token')

const { attachCookiesToResponse, createTokenUser } = require('../utils')
const crypto = require('crypto')

const register = async (req, res) => {
  const { email, userName, password } = req.body
  const emailAlreadyExists = await User.findOne({ email })
  if (emailAlreadyExists) {
    return res.json({ msg: 'Email already exists' })
  }

  const user = await User.create({
    userName,
    email,
    password,
  })
  res.status(200).json({ 'success': true, items: user, 'count': user.length })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).send('Please provide email and password')
  const user = await User.findOne({ email })
  if (!user) return res.status(400).send('Invalid Credentials')
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) return res.status(400).send('Invalid Credentials')

  const tokenUser = createTokenUser(user)

  let refreshToken = ''
  const existingToken = await Token.findOne({ _id: user._id })

  if (existingToken) {
    const { isValid } = existingToken
    if (!isValid) {
      return res.status(400).send('Invalid Credentials')
    }
    refreshToken = existingToken.refreshToken
    const { accessTokenJWT, refreshTokenJWT } = attachCookiesToResponse({
      res,
      user: tokenUser,
      refreshToken,
    })

    return res
      .status(200)
      .json({ 'success': true, 'accessToken': accessTokenJWT, 'refreshToken': refreshTokenJWT, user })
  }

  refreshToken = crypto.randomBytes(40).toString('hex')

  const userAgent = req.headers['user-agent']
  const ip = req.ip
  const userToken = { refreshToken, ip, userAgent, user: user._id }

  await Token.create(userToken)

  const { accessTokenJWT, refreshTokenJWT } = attachCookiesToResponse({
    res,
    user: tokenUser,
    refreshToken,
    id: user._id.toString(),
  })

  res.status(200).json({ 'success': true, 'accessToken': accessTokenJWT, 'refreshToken': refreshTokenJWT, user })
}

const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId })

  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.status(200).json({ 'success': true })
}

module.exports = {
  register,
  login,
  logout,
}
