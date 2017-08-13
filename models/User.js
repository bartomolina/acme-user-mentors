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
    return User.destroy({ where: { id: id } })
}

User.updateUserFromRequestBody = (id, body) => {
    return User.update({ mentorId: body.mentorId }, { where: { id: id } })
}

User.generateAward = (id, body) => {
    return db.models.award.create({ title: faker.company.catchPhrase(), userId: id })
}

User.removeAward = (userId, awardId) => {
    return db.models.award.destroy({ where: { id: awardId }})
}

module.exports = User