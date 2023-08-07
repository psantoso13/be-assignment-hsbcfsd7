// src/controller/user.controller.js

// const knexQuery = require('../models_knex/knex')
const {userBaru} = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const create = async (req, res) => {
  try{

    const {nama_depan, nama_belakang, username, email, password} = req.body

    if (!nama_depan || !username || !email || !password) {
      return res.status(400).send({
        message: `some field(s) must be filled and cannot be empty`
      })
    }

    const hashedPassword = bcrypt.hashSync(password, 8)

    const input = await userBaru.create({
      firstname: nama_depan,
      lastname: nama_belakang,
      username: username,
      email: email,
      password: hashedPassword
    })

    return res.status(201).send({
      message: 'user created'
    })

  } catch (error) {
    // console.log(error)
    return res.send({
      message: 'error occured',
      data: error
    })
  }
}

const login = async (req, res) => {
  try {
    
    const {username, password} = req.body

  if (!username || !password) {
    return res.status(400).send({
      message: `username or password cannot be empty!`
    })
  }

  const getUser = await userBaru.findOne({
    where: {username: username}
  })

  if (!getUser) {
    return res.status(404).send({
      message: 'Sorry, user '+username+' not found in our database'
    })
  }

  const isValidPass = bcrypt.compareSync(password, getUser.dataValues.password)   // bandingkan... ambil data nya dari getUser

  // console.log(isValidPass)

  if (!isValidPass) {
    return res.status(400).send({
      message: 'Wrong password entered!'
    })
  }

  const token = jwt.sign({
    id: getUser.dataValues.id,
    username: getUser.dataValues.username
  }, process.env.JWT_SECRET, {expiresIn: 3600} )

  return res.status(200).send({
    message: 'Login success',
    token:token
  })


  } catch (error) {
    // console.log(error)
    return res.send({
      message: 'error occured',
      data: error
    })
  }
}

const update = async (req, res) => {
  try {
    const idUser = req.user.id
    const {nama_depan, nama_belakang} = req.body
    // console.log(req.user)

    const updateData = await userBaru.update({
      firstname: nama_depan,
      lastname: nama_belakang}, {where: {id: idUser}})

      const dataBaru = await userBaru.findOne({
        where: {id: idUser}
      })
    
    res.status(201).send({
      message: 'user updataed',
      data: dataBaru
    })
  } catch (error) {
    return res.send({
      message: 'error occured',
      data: error
    })
  }
}


const deleteUser = async (req, res) => {
  try {
    const idUser = req.user.id
    const deletedUser = await userBaru.destroy({
      where: {id: idUser}
    })
    
    res.status(200).send({
      message: `akun anda telah berhasil dihapus`,
      data: deleteUser
    })
  } catch (error) {
    return res.send({
      message: 'error occured',
      data: error
    })
  }
}
module.exports = {create, login,update, deleteUser}