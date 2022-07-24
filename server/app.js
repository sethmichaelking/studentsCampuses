const express = require('express')
const path = require('path')
const db = require('../db')
const { conn, Student, Campus } = db
const app = express()

// static middleware
app.use('/dist', express.static(path.join(__dirname, '../dist')))


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
}); 



app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.findAll()
    res.send(students)
  }
  catch(err){
    console.log(err)
  }
})


app.get('/api/campuses', async (req, res) => {
  try {
    const campuses = await Campus.findAll({
      include: {
        model: Student
      }
    })
    res.send(campuses)
  }
  catch(err){
    console.log(err)
  }
})


const syncAndSeed = async() => {
  await db.conn.sync({ force: true })
  await Promise.all([
    Campus.create({
      name: 'Harvard',
      imageUrl: 'harvard@hardvard.com',
      address: '33 Penny Lane',
      description: 'this is a nice school located in cambridge massachusetts'
    }),
    Campus.create({
      name: 'Yale',
      imageUrl: 'yale@yale.com',
      address: '343 Juniper Ln',
      description: 'The top engineering school in the country'
    }),
    Campus.create({
      name: 'Dartmouth',
      imageUrl: 'dartnouth@dartmouth.com',
      address: '974 Bowling Street',
      description: 'Located in Darmtouth, NH. This school is perfect those people who liek the cold.'
    })
  ])
  await Promise.all([
    Student.create({
      firstName: 'seth',
      lastName: 'king',
      email: 'sethking97@yahoo.com',
      imageUrl: 'sethkingwriter.com',
      gpa: 3.34,
      campusId: 3
    }),
    Student.create({
      firstName: 'george',
      lastName: 'martin',
      email: 'gerogermarging@yahoo.com',
      imageUrl: 'thebestintheworld.com',
      gpa: 4.0,
      campusId: 2
    }),
    Student.create({
      firstName: 'abi',
      lastName: 'tamar',
      email: 'abitamara2434@yahoo.com',
      imageUrl: 'abikinglawyer.com',
      gpa: 1.34,
      campusId: 1
    }),
    Student.create({
      firstName: 'ethan',
      lastName: 'levine',
      email: 'ethanlevine@yahoo.com',
      imageUrl: 'ethanking@jewelry.com',
      gpa: 2.345,
      campusId: 2
    })
  ])
}

syncAndSeed()

module.exports = app;

