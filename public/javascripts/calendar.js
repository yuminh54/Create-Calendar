$(document).ready(function() {
    var currentDate = new Date();
    function generateCalendar(date) {
      function monthDays(month, year) {
        var result = [];
        var days = new Date(year, month, 0).getDate();
        for (var i = 1; i <= days; i++) {
          result.push(i);
        }
        return result;
      }
      Date.prototype.monthDays = function() {
        var date = new Date(this.getFullYear(), this.getMonth() + 1, 0);
        return date.getDate();
      };
      var details = {
        totalDays: date.monthDays(),
        weekDays: ['일', '월', '화', '수', '목', '금', '토'],
        months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      };
      var start = new Date(date.getFullYear(), date.getMonth()).getDay();
      var cal = [];
      var day = 1;

      var flag = 0;
      var color = 0;

      var currentLast = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
      var preMonthDay = currentLast.getDate() - currentLast.getDay();

      for (var i = 0; i <= 6; i++) {
        if (i === 0) {
            cal.push(['<div class="week-day">']);
        } else if (flag === 1){
            break
        } else if (day === 32) {
            break
        } else if (details.totalDays === 30 && day === 31) {
            break
        } else if (details.totalDays === 29 && day === 30) {
            break
        } else {
            cal.push(['<div class="week">']);
        }
        for (var j = 0; j < 7; j++) {
          if (i === 0) {
            cal[i].push('<div class="day-name">' + details.weekDays[j] + '</div>');
          } else if (day > details.totalDays) {
            color = 1
            day = 1
            cal[i].push('<div class="day"><h3 class="day-label" style="color: #98A8B9 !important;">' + day++ + '</h3></div>');
            flag = 1
          } else {
            if (i === 1 && j < start) {
              cal[i].push('<div class="day"><h3 class="day-label" style="color: #98A8B9 !important;">'+ preMonthDay++ +'</h3></div>');
            } else if (color === 1) {
              cal[i].push('<div class="day"><h3 class="day-label" style="color: #98A8B9 !important;">' + day++ + '</h3></div>');
            } else {
              cal[i].push('<div class="day"><h3 class="day-label">' + day++ + '</h3></div>');
            }
          }
        }
        cal[i].push('</div>');
      }
      cal = cal.reduce(function(a, b) {
        return a.concat(b);
      }, []).join('');
      $('.monthly-calendar').append(cal);
      $('#currentMonth').text(`${date.getFullYear()}년 ${details.months[date.getMonth()]}`);
      $('#year').text(date.getFullYear());
    }

    $('#today').click(function() {
        var todayDate = new Date()
        $('.monthly-calendar').text('');
        generateCalendar(todayDate);
    });

    $('#previous').click(function() {
      $('.monthly-calendar').text('');
      if (currentDate.getMonth() === 0) {
        currentDate = new Date(currentDate.getFullYear() - 1, 11);
        generateCalendar(currentDate);
      } else {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
        generateCalendar(currentDate);
      }
    });

    $('#next').click(function() {
      $('.monthly-calendar').text('');
      if (currentDate.getMonth() === 11) {
        currentDate = new Date(currentDate.getFullYear() + 1, 0);
        generateCalendar(currentDate);
      } else {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
        generateCalendar(currentDate);
      }
    });

    generateCalendar(currentDate);
  });

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

$(function () {
    $('#view li:first-child a').tab('show')
});

$(function () {
    $('[data-toggle="popover"]').popover().on('inserted.bs.popover')
});

$('.monthly-calendar, .daily-calendar').click(function() {
    $('#registerSchedule').modal('show');
});

$(".event-consecutive, .event, .event-repeated").click(function(event) {
    event.stopPropagation();
});

$(function () {
    $('#datetimepicker1').datetimepicker({
        format: 'L'
    });
    $('#datetimepicker3').datetimepicker({
        format: 'L'
    });
});

$(function () {
    $('#datetimepicker2').datetimepicker({
        format: 'LT'
    });
    $('#datetimepicker4').datetimepicker({
        format: 'LT'
    });
});
