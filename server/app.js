const cookieParser = require('cookie-parser')
const express = require('express')
const path = require('path')
const db = require('../db')
const { conn, Student, Campus, User, Instructor } = db
const app = express()
const {OAuth2Client} = require('google-auth-library');
const { default: axios } = require('axios')
const client = new OAuth2Client('563448805534-3pp1vdko1578k0uqr0vk5va1sgti026a.apps.googleusercontent.com')
const bcrypt = require('bcrypt')
const { createToken } = require('./JWT')
app.use("public", express.static(path.join(__dirname, "../public")))

app.use(express.json())
app.use(cookieParser())

// static middleware
app.use('/dist', express.static(path.join(__dirname, '../dist')))


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
}); 

//this is for googleSignIn users
app.post('/api/loginUser', async (req, res)=> {
  try {
    const token = req.body.token
    async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: '563448805534-3pp1vdko1578k0uqr0vk5va1sgti026a.apps.googleusercontent.com'
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];
    }
    verify().then(()=> {
      res.cookie('session-token', token)
      res.send('success')
    })
  }
  catch(err){
    console.log(err)
  }
})

function checkAuthenticated(req, res, next){
  
  let token = req.cookies['session-token']
  const user = {}
  async function verify(){
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '563448805534-3pp1vdko1578k0uqr0vk5va1sgti026a.apps.googleusercontent.com'
    })
    const payload = ticket.getPayload()
    user.name = payload.name
    user.email = payload.email;
    user.picture = payload.picture
    const signedInUser = await User.findOne({ where: { email: user.email } })
    if (signedInUser === null){
      await User.create({
            email: user.email,
            name: user.name,
            picture: user.picture,
          })
    } 
      else {
      console.log('user is already here, no need to add them in')
    }
  }
  verify()
    .then(async ()=> {
      if (req.user = user){
      return next()
      } 
    })
    .catch(err => {
      //the below redirect isn't working?
      console.log('failed authenticatation of user')
      return res.status(200).redirect('/#/login');
    })
}

app.post('/register', (req, res)=> {
  const { email, password } = req.body
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      email: email,
      password: hash
    }).then(()=> {
      console.log('user is registered')
      return res.sendStatus(200)
    }).catch((err)=> {
      if (err){
        res.status(500).send({error: 'Could not log in'})
        return 
      }
    })
  })
})

app.post('/login', async(req, res)=> {
  const { email, password } = req.body
  const user = await User.findOne({
    where: {
      email: email
    }
  })
  if (!user){
    //this will need to be an error displayed on the front end, doing return so it atelast doesnt crash app 
    return 'not found'
  }
  if (user.password === null){
    //this will need to be an error displayed on the front end, doing return so it atelast doesnt crash app 
    return 'no pass!'
  }
  const dbPassword = user.password
  bcrypt.compare(password, dbPassword).then((match) => {
    if (!match){
      console.log('user combination is wrong')
    } else {
      const accessToken = createToken(user)
      res.cookie("login-token", accessToken)
      console.log('access token', accessToken, {
        expires: new Date(Date.now() + 9999999),
        httpOnly: true
      })
      res.status(200).send({ user, token: accessToken })
      console.log('logged in!')
    }
  })
})

//logs out by removing the cookie from the session then it redirects to the login page, doesn't seem like it is always clearing the cookie though
app.get('/logout', (req, res)=> {
  res.clearCookie('session-token')
  res.clearCookie['session-token']
  res.clearCookie('login-token')
  res.clearCookie['login-token']
  return res.status(200).redirect('/#/login');
})

app.get('/users', async (req, res)=> {
  let users = await User.findAll()
  res.send(users)
})

app.get('/user', async(req, res)=> {
  try {
    let user = await User.findOne({
      where: {

      }
    })
  }
  catch(err){
    console.log(err)
  }
})

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
app.get('/instructors', async(req, res) => {
  try {

  }
  catch(err){
    
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
    return res.status(200).redirect('/#/login');
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
  await Promise.all([
    Instructor.create({
      firstName: 'Joseph',
      lastName: 'Brodsky',
      campusId: 2
    }),
    Instructor.create({
      firstName: 'Madeline',
      lastName: 'Yosef',
      campusId: 1
    })
  ])
}

syncAndSeed()

module.exports = app;

