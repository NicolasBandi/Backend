import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    const { username } = req.session;;
    res.status(200).send(username);
})

router.get('/login', (req, res) => {
    const { username } = req.session;
    res.render('login', { layout: 'main' , username: username});
})

router.post('/login', (req, res) => {
    const { username } = req.body;
    req.session.username = username;
    res.redirect('/');
})

router.get('/logout', (req, res) => {
    const { username } = req.session;
    req.session.destroy(error => {
        if (!error) {
            res.render('logout', { layout: 'main' , username: username});
        }
        else {
            res.send("Something is Wrong", error.message);
        }
    })
})

export default router;