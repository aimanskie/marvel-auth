const User = require('../models/User')
const { attachCookiesToResponse, createTokenUser } = require('../utils')
const crypto = require('crypto')

const register = async (req, res) => {
  const { email, userName, password } = req.body
  const emailAlreadyExists = await User.findOne({ email })
  if (emailAlreadyExists) {
    return res.json({ msg: 'Email already exists' })
  }
  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user'

  const user = await User.create({
    userName,
    email,
    password,
    role,
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
  const existingToken = await User.findOne({ _id: user._id })

  if (existingToken) {
    const { isValid } = existingToken
    if (!isValid) {
      return res.status(400).send('Invalid Credentials')
    }
    refreshToken = existingToken.refreshToken
    const { accessTokenJWT, refreshTokenJWT } = await attachCookiesToResponse({
      res,
      user: tokenUser,
      refreshToken,
      id: user._id.toString(),
    })

    return res
      .status(200)
      .json({ 'success': true, 'accessToken': accessTokenJWT, 'refreshToken': refreshTokenJWT, user })
  }

  refreshToken = crypto.randomBytes(40).toString('hex')

  const { accessTokenJWT, refreshTokenJWT } = await attachCookiesToResponse({
    res,
    user: tokenUser,
    refreshToken,
    id: user._id.toString(),
  })

  res.status(200).json({ 'success': true, 'accessToken': accessTokenJWT, 'refreshToken': refreshTokenJWT, user })
}

const logout = async (req, res) => {
  await User.findOneAndUpdate({ user: req.user.userId }, { accessToken: '', refreshToken: '' })
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
