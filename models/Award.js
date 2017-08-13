const db = require('./db')
const Sequelize = db.Sequelize

const Award = db.define('award', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
        hooks: {
            beforeBulkDestroy: (options) => {
                options.individualHooks = true
                return options
            },
            afterDestroy: (award) => {
                Award.findAll({ where: { userId: award.userId } })
                    .then(awards => {
                        if (awards.length === 1) {
                            db.models.user.update({ mentorId: null }, { where: { mentorId: award.userId } })
                        }
                    })
            }
        }
    })

module.exports = Award