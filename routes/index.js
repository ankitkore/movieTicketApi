var express = require('express');
var router = express.Router();
const mainCtrl = require('../controllers/mainController')
const vaildationCtrl = require('../controllers/validationController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/addTheatre',  mainCtrl.addTheatre);
router.post('/addShow', vaildationCtrl.addShow,  mainCtrl.addShow);
router.post('/bookTicket', vaildationCtrl.bookTicket, mainCtrl.bookTicket);
router.get('/listOfShows',  mainCtrl.listOfShows);

module.exports = router;
