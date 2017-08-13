const expect = require('chai').expect

const { sync, seed, models } = require('../../models')

const app = require('supertest')(require('../../app'))

describe('Routes', () => {
    let seeded
    beforeEach(() => {
        return sync()
            .then(() => seed())
            .then(_seed => seeded = _seed)
    })

    describe('GET /users', () => {
        it('shows all the users', () => {
            return app.get('/users')
                .expect(200)
                .then(resp => {
                    const text = resp.text
                    expect(text).to.contain(`Mentored by: ${seeded.homer.name}`)
                    expect(text).to.contain(`Mentored by: ${seeded.marge.name}`)
                })
        })
    })

    describe('POST /users', () => {
        it('creates a new user', () => {
            return app.post('/users')
                .send({
                    name: 'Milhouse'
                })
                .expect(302)
                .then(() => app.get('/users'))
                .then(resp => {
                    expect(resp.text).to.contain('Milhouse')
                })
        })
    })
})