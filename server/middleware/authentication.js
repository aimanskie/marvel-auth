const { isTokenValid } = require('../utils')
const { attachCookiesToResponse } = require('../utils')

const authenticateUser = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies

  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken)
      req.user = payload.user
      return next()
    }

    const payload = isTokenValid(refreshToken)
    const existingToken = await User.findOne({
      _id: payload.user.userId,
      refreshToken: payload.refreshToken,
    })

    if (!existingToken || !existingToken?.isValid) {
      return res.status(400).send('Authentication Invalid')
    }

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    })

    req.user = payload.user
    next()
  } catch (error) {
    return res.status(400).send('Authentication Invalid')
  }
}

module.exports = {
  authenticateUser,
}
