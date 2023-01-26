const User = require('../models/User')

const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password')
  const convertCreatedUsers = users.map((user) => {
    return { ...user._doc, createdAt: user.createdAt.toLocaleString(), updatedAt: user.updatedAt.toLocaleString() }
  })
  res.status(200).json({ 'success': true, users: convertCreatedUsers, 'count': convertCreatedUsers.length })
}

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select('-password')
  if (!user) return res.status(400).send(`No user with id : ${req.params.id}`)
  res.status(200).json({ 'success': true, user })
}

const showCurrentUser = async (req, res) => {
  res.status(200).json({ user: req.user })
}

const updateUser = async (req, res) => {
  const id = req.params.id
  const {
    user: { userName, email, role, firstName, lastName, gender, phone },
  } = req.body
  if (!email || !userName) return res.status(400).send('Please provide all values')
  const user = await User.findOneAndUpdate({ _id: id }, { userName, email, role, firstName, lastName, gender, phone })
  await user.save()
  res.status(200).json({ 'success': true, user })
}

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
}
