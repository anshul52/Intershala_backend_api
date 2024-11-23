const express = require("express");
const { home, signUp ,signIn, signOut} = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/authenticate");
const router = express.Router();

//home
router.get('/',isAuthenticated,home);

//STUDENT/SIGNup
router.post('/student/signup',signUp);

//student signIn
router.post('/student/signin',signIn);


//student signout
router.get('/student/signout',isAuthenticated,signOut);


module.exports = router;
