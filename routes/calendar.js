var express = require('express');
var router = express.Router();
const models = require('../models');
const sequelize = require("sequelize");
const Op = sequelize.Op;

// 초기 Calendar
router.get('/', function(req, res, next) {
    res.render('calendar.ejs');
});

// Calendar에 등록된 일정 Read (해당 Month)
router.get('/get', function(req, res, next) {
    console.log(req.query)
    models.calendars.findAll()
    .then(function(results) {
        res.json(results);
    }).catch(function(err) {
        res.status(500).json({ error: error.toString() });
    });
})

// Calendar에 등록된 일정 Read (해당 Date)
router.get('/dailyget', function(req, res, next) {
    var getYear = req.query.year
    var getMonth = req.query.month
    if (getMonth < 10) {
        getMonth = '0' + getMonth
    }
    var getDay = req.query.day
    if (getDay < 10) {
        getDay = '0' + getDay
    }
    var date = getMonth + '-' + getDay + '-' + getYear
    date = Date.parse(date)
    models.calendars.findAll()
    .then(function(result) {
        var sendData = []
        if (result.length > 0) {
            for (var i=0; i < result.length; i++){
                var data = result[i]
                var dbStart = Date.parse(data.start_date)
                var dbEnd = Date.parse(data.end_date)

                if (date >= dbStart && date <= dbEnd) {
                    sendData.push(data)
                }
            }
        }
        res.json(sendData)
    }).catch(function(err) {
        res.status(500).json({ error: error.toString() });
    });
})

// 일정 Create
router.post('/create', function(req, res, next) {
    console.log(req.body)
    var monthRepeat = false
    var allDay = false
    if (req.body.month_repeat === true) { monthRepeat = true }
    if (req.body.all_day === true) { allDay = true }

    String.prototype.replaceAll = function(org, dest) {
        return this.split(org).join(dest);
    }

    var startDate = req.body['start_date']
    var endDate = req.body['end_date']
    startDate = startDate.replaceAll('/', '-')
    endDate = endDate.replaceAll('/', '-')

    models.calendars.create({
        title: req.body['title'],
        content: req.body['content'],
        start_date: startDate,
        end_date: endDate,
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