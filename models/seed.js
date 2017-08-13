const faker = require('faker')

module.exports = (User, Award) => {
    User.bulkCreate([
        { name: 'Homer' },
        { name: 'Marge' },
        { name: 'Bart', mentorId: 1 },
        { name: 'Lisa', mentorId: 2 },
        { name: 'Maggie', mentorId: 2 }
    ])
        .then(() =>
            Award.bulkCreate([
                { title: faker.company.catchPhrase(), userId: 1 },
                { title: faker.company.catchPhrase(), userId: 1 },
                { title: faker.company.catchPhrase(), userId: 1 },
                { title: faker.company.catchPhrase(), userId: 2 },
                { title: faker.company.catchPhrase(), userId: 2 },
                { title: faker.company.catchPhrase(), userId: 3 },
                { title: faker.company.catchPhrase(), userId: 3 },
                { title: faker.company.catchPhrase(), userId: 4 }
            ]))
}