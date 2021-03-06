const router = require('express').Router();

const models = require('../models').models;
const User = models.User;

const redirect = (res) => {
    return () => {
        res.redirect('/users');
    };
};

//READ
router.get('/', (req, res, next) => {
    User.findUsersViewModel()
        .then((viewModel) => {
            res.render('users', {tab: 'users', viewModel });
        })
        .catch(next);
});

//CREATE
router.post('/', (req, res, next) => {
    req.body.name = req.body.name.trim() || null
    User.create(req.body)
        .then(redirect(res))
        .catch(next);
});

//DELETE
router.delete('/:id', (req, res, next) => {
    User.destroyById(req.params.id)
        .then(redirect(res))
        .catch(next);
});

//UPDATE
router.put('/:id', (req, res, next) => {
    req.body.mentorId = req.body.mentorId.trim() || null
    User.updateUserFromRequestBody(req.params.id, req.body)
        .then(redirect(res))
        .catch(next);
});

//CREATE AWARD
router.post('/:id/awards', (req, res, next) => {
    User.generateAward(req.params.id)
        .then(redirect(res))
        .catch(next);
});

//DELETE AWARD
router.delete('/:userId/awards/:id', (req, res, next) => {
    User.removeAward(req.params.userId, req.params.id)
        .then(redirect(res))
        .catch(next);
});

module.exports = router;