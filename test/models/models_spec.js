const expect = require('chai').expect

const { sync, seed, models } = require('../../models')

describe('Models', () => {
    beforeEach(() => {
        return sync()
            .then(() => {
                return seed()
            })
    })
    describe('User model', () => {
        it('exists', () => {
            expect(models.User).to.exist
        })

        describe('findUsersViewModel', () => {
            it('return an object with two properties: users (array) and mentors (array)', () => {
                return models.User.findUsersViewModel()
                    .then(viewModel => {
                        expect(viewModel.users).to.be.an('array')
                        expect(viewModel.mentors).to.be.an('array')
                    })
            }
            )
        })

        describe('destroyById', () => {
            it('deletes an item from the database by ID', () => {
                return models.User.destroyById(2)
                    .then(() => models.User.findAll())
                    .then(users => {
                        expect(users.length).to.equal(4)
                        expect(users.filter((val) => 
                            val.id === 2
                        )).to.be.empty
                    })
            })
        })

        describe('updateUserFromRequestBody', () => {
            it('updates the mentor of a user', () => {
                return models.User.findById(1)
                    .then(user => models.User.updateUserFromRequestBody(1, { mentorId: 2 }))
                    .then(() => models.User.findById(1))
                    .then(user => expect(user.mentorId).to.equal(2))
            }
            )
        })

        describe('generateAward', () => {
            it('generates an award and assigns it to a user', () => {
                let initialAwardCount
                return models.User.findById(1, { include: [{ model: models.Award, as: 'awards' }] })
                    .then(user => {
                        initialAwardCount = user.awards.length
                        return models.User.generateAward(1, { title: 'new award' })
                    })
                    .then(() => models.User.findById(1, { include: [{ model: models.Award, as: 'awards' }] }))
                    .then(user => 
                        expect(user.awards.length).to.equal(initialAwardCount + 1)
                    )
            }
            )
        })

        describe('removeAward', () => {
            let initialAwardCount

            beforeEach(() => {
                return models.User.findById(1, { include: [{ model: models.Award, as: 'awards' }] })
                    .then(user => {
                        initialAwardCount = user.awards.length
                        return models.User.removeAward(1, 1)
                    })
                    .then(user => 
                        models.User.removeAward(1, 2)
                    )
            })

            it('removes an award from a user', () => {
                return models.User.findById(1, { include: [{ model: models.Award, as: 'awards' }] })
                .then(user => 
                    expect(user.awards.length).to.equal(initialAwardCount - 2)
                )
            }
            )

            it('removes the link from all the mentorees', () => {
                return models.User.findAll({ where: { mentorId: 1 } })
                .then(users => 
                    expect(users).to.be.empty
                )
            })
        })
    })
})