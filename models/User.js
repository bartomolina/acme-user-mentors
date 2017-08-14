const faker = require('faker')
const db = require('./db')
const Sequelize = db.Sequelize

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

User.findUsersViewModel = () => {
    return User.findAll({
        include: [{
            model: db.models.award
        }, {
            model: User,
            as: 'mentor'
        }]
    })
        .then(users => {
            mentors = users.filter((user) => {
                return user.awards.length > 1
            })
            return { users, mentors }
        })
}

User.destroyById = (id) => {
    return User.destroy({ where: { id } })
}

User.updateUserFromRequestBody = (id, body) => {
    return User.update({ mentorId: body.mentorId }, { where: { id } })
}

User.generateAward = (userId, body) => {
    return db.models.award.create({ title: faker.company.catchPhrase(), userId })
}

User.removeAward = (userId, id) => {
    return db.models.award.destroy({ where: { id } })
}

module.exports = User