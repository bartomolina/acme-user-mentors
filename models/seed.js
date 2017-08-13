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
        .then(([_homer, _marge, _bart, _lisa, _maggie]) => {
            homer = _homer
            marge = _marge
            bart = _bart
            lisa = _lisa
            maggie = _maggie

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