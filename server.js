const app = require('./app')
const models = require('./models')

const port = process.env.PORT || 3000

models.sync()
    .then(() => models.seed())
    .then(() => app.listen(port, () => {
            console.log(`listening on port ${port}`)
        }))