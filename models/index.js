const db = require('./db')

const User = require('./User')
const Award = require('./Award')

User.belongsTo(User, { as: 'mentor' })
User.hasMany(Award, { as: 'awards' })

const seed = () => {
    return require('./seed')(User, Award)
}

const sync = () => {
    return db.sync({ force: true })
}

module.exports = {
    sync,
    seed,
    models: { User }
}