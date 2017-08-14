const faker = require('faker')

module.exports = (User, Award) => {
    let homer, marge, bart, lisa, maggie
    return User.bulkCreate([
        { name: 'Homer' },
        { name: 'Marge' },
        { name: 'Bart', mentorId: 1 },
        { name: 'Lisa', mentorId: 2 },
        { name: 'Maggie', mentorId: 2 }
    ])
        .then(users => {
            [homer, marge, bart, lisa, maggie] = users

            return Award.bulkCreate([
                { title: faker.company.catchPhrase(), userId: 1 },
                { title: faker.company.catchPhrase(), userId: 1 },
                { title: faker.company.catchPhrase(), userId: 1 },
                { title: faker.company.catchPhrase(), userId: 2 },
                { title: faker.company.catchPhrase(), userId: 2 },
                { title: faker.company.catchPhrase(), userId: 3 },
                { title: faker.company.catchPhrase(), userId: 3 },
                { title: faker.company.catchPhrase(), userId: 5 }
            ])
        })
        .then(([a1, a2, a3, a4, a5, a6, a7, a8]) => {
            return {
                homer, marge, bart, lisa, maggie,
                a1, a2, a3, a4, a5, a6, a7, a8
            }
        })
}