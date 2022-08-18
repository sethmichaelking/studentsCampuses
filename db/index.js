const { STRING, INTEGER, DECIMAL } = require('sequelize')
const Sequelize = require('sequelize')
const conn = new Sequelize('postgres://localhost/acme_schools_db' || process.env.DATABASE_URL)

const Student = conn.define('student', {
    firstName: {
        type: STRING,
        allowNull: false
    },
    lastName: {
        type: STRING,
        allowNull: false
    },
    email: {
        type: STRING,
        allowNull: false,
        unique: true
    },
    imageUrl: {
        type: STRING,
        allowNull: false
    },
    gpa:  {
        type: DECIMAL
    },
    location: {
        type: STRING
    },
    major: {
        type: STRING
    },
    phone: {
        type: STRING
    }
})

const User = conn.define('user', {
    sub: {
        type: INTEGER
    },
    email: {
        type: STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: STRING,
        allowNull: false
    },
    name: {
        type: STRING
    },
    picture: {
        type: STRING
    },
    given_name: {
        type: STRING
    },
    family_name: {
        type: STRING
    },
    locale: {
        type: STRING
    }
})

const Campus = conn.define('campus', {
    name: {
        type: STRING
    },
    address: {
        type: STRING
    },
    description: {
        type: STRING.apply(350)
    },
    city: {
        type: STRING
    },
    profilePicture: {
        type: STRING,
        defaultValue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHHlRhS5_c6i5K2AkR8aPKeF1STQmGFej5_w&usqp=CAU'
    }
})

Student.belongsTo(Campus)
Campus.hasMany(Student)

Student.beforeCreate(student => {
    if (student.gpa > 4.0 || student.gpa < 0) {
      throw new Error("GPA must be less then 4 and greater than 0");
    }
  });

module.exports = {
    conn,
    Campus,
    Student,
    User
}