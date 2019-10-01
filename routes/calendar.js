var express = require('express');
var router = express.Router();
const models = require('../models');

// 초기 Calendar
router.get('/', function(req, res, next) {
    res.render('calendar.ejs');
});

// 등록된 일정 Read
router.get('/get', function(req, res, next) {
    
})

// 일정 Create
router.post('/create', function(req, res, next) {
    console.log(req.body)
    var monthRepeat = false
    var allDay = false
    if (req.body.month_repeat === true) { monthRepeat = true }
    if (req.body.all_day === true) { allDay = true }

    models.calendars.create({
        title: req.body['title'],
        content: req.body['content'],
        start_date: req.body['start_date'],
        end_date: req.body['end_date'],
        start_time: req.body['start_time'],
        end_time: req.body['end_time'],
        month_repeat: monthRepeat,
        all_day: allDay
    })
    .then(result => {
        console.log("SUCCESS")
        res.redirect('/calendar')
    })
    .catch (error => {
        res.status(500).json({ error: error.toString() });
    })
})

module.exports = router;