const express = require('express')
const path = require('path')
const db = require('../db')
const { conn, Student, Campus } = db
const app = express()

app.use("public", express.static(path.join(__dirname, "../public")))

app.use(express.json())
// static middleware
app.use('/dist', express.static(path.join(__dirname, '../dist')))


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
}); 

app.delete('/api/students/:id', async (req, res)=> {
  try{
    const student = await Student.findByPk(req.params.id)
    await student.destroy()
    res.sendStatus(204)
  }
  catch(err){
    console.log(err)
  }
})

app.get('/api/campuses/:id', async(req, res)=> {
  try {
    const campus = await Campus.findByPk(req.params.id)
    res.send(campus)
  }
  catch(err){
    console.log(err)
  }
})

app.put('/api/campuses/:id', async(req, res)=> {
  try {
    const campus = await Campus.findByPk(req.params.id)
    await campus.update(req.body)
    res.send(campus)
  }
  catch(err){
    console.log(err)
  }
})

app.put('/api/students/:id', async(req, res)=> {
  try {
    const student = await Student.findByPk(req.params.id)
    await student.update(req.body)
    res.send(student)
  }
  catch(err){
    console.log(err)
  }
})

app.delete('/api/campuses/:id', async (req, res)=> {
  try{
    const campus = await Campus.findByPk(req.params.id)
    await campus.destroy()
    res.sendStatus(204)
  }
  catch(err){
    console.log(err)
  }
})

app.post('/api/students', async(req, res) => {
  try {
    const student = await Student.create(req.body)
    res.send(student)
  }
  catch(err){
    console.log(err)
  }
})

app.post('/api/campuses', async(req, res) => {
  try {
    const campus = await Campus.create(req.body)
    res.send(campus)
  }
  catch(err){
    console.log(err)
  }
})

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
      city: 'Cambridge, MA',
      imageUrl: 'harvard@hardvard.com',
      address: '33 Penny Lane',
      description: 'this is a nice school located in cambridge massachusetts',
      profilePicture: 'https://i1.sndcdn.com/avatars-000733470451-tyaksr-t500x500.jpg'
    }),
    Campus.create({
      name: 'Yale',
      city: 'New Haven, CT',
      imageUrl: 'yale@yale.com',
      address: '343 Juniper Ln',
      description: 'The top engineering school in the country'
    }),
    Campus.create({
      name: 'Dartmouth',
      city: 'Manchester, NH',
      imageUrl: 'image.png',
      address: '974 Bowling Street',
      description: 'Located in Darmtouth, NH. This school is perfect those people who liek the cold.'
    })
  ])
  await Promise.all([
    Student.create({
      firstName: 'seth',
      lastName: 'king',
      email: 'sethking97@yahoo.com',
      imageUrl: 'https://www.huntspost.co.uk/resource/blob/5055104/b645faa9385af33039447c27150cf523/sethking-data.jpg',
      gpa: 3.34,
      campusId: 3,
      phone: '203-0404-3443'
    }),
    Student.create({
      firstName: 'george',
      lastName: 'martin',
      email: 'gerogermarging@yahoo.com',
      imageUrl: 'https://images.squarespace-cdn.com/content/v1/51b77cdae4b08f3b22c1f449/1624806685350-LK4ISHLTNG2LF0U2G7GT/2021+Coach+Seth+King%284x6%29.jpg',
      gpa: 4.0,
      campusId: 2,
      location: 'New York, NY',
      major: 'English',
      phone: '203-0404-3443'
    }),
    Student.create({
      firstName: 'abi',
      lastName: 'tamar',
      email: 'abitamara2434@yahoo.com',
      imageUrl: 'https://bushnellbeacons.com/images/2019/9/11/Men_13_.jpg?width=300',
      gpa: 1.34,
      campusId: 1,
      location: 'Boston, MA',
      major: 'Comp Sci',
      phone: '203-0404-3443'
    }),
    Student.create({
      firstName: 'ethan',
      lastName: 'levine',
      email: 'ethanlevine@yahoo.com',
      imageUrl: 'https://i1.sndcdn.com/avatars-000733470451-tyaksr-t500x500.jpg',
      gpa: 2.345,
      campusId: 2,
      location: 'Los Angeles, CA',
      major: 'History',
      phone: '203-0404-3443'
    })
  ])
}

syncAndSeed()

module.exports = app;

