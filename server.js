const express = require('express')
const swig = require('swig')
const models = require('./models')
const path = require('path')
swig.setDefaults({ cache: false })

const app = express()

app.set('view engine', 'html')
app.engine('html', swig.renderFile)

const port = process.env.PORT || 3000

syncDB = () => {
    return models.sync()
        .then(() => {
            return models.seed()
        })
}

syncDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')))
app.use(require('body-parser').urlencoded({ extended: false }))
app.use(require('method-override')('_method'))

app.post('/', (req, res, next) => {
    syncDB()
        .then(() => {
            res.redirect('/');
        })
});

app.get('/', (req, res, next) => {
    res.render('index', { tab: 'home' })
})

app.use('/users', require('./routes/users'))

app.use(function (req, res, next) {
    res.status(404).render('error', { error: { message: '404' } })
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).render('error', { error: err })
})