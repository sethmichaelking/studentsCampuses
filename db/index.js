const { STRING, INTEGER, DECIMAL } = require('sequelize')
const Sequelize = require('sequelize')
const conn = new Sequelize('acme_schools_db', 'seth.king', 'Poiop90lik8', {
    host: 'localhost',
    dialect: 'postgres'
})

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
    }
})

const Campus = conn.define('campus', {
    name: {
        type: STRING
    },
    imageUrl: {
        type: STRING
    },
    address: {
        type: STRING
    },
    description: {
        type: STRING.apply(350)
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
    Student
}