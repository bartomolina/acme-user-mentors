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
            beforeDestroy: (award) => {
                return Award.findAll({ where: { userId: award.userId } })
                    .then(awards => {
                        if (awards.length === 2) {
                            return db.models.user.update({ mentorId: null }, { where: { mentorId: award.userId } })
                        }
                    })
            }
        }
    })

module.exports = Award