$(document).ready(function() {
    var currentDate = new Date();
    // generateCalendar Function 시작
    async function generateCalendar(date) {
      function monthDays(month, year) {
        var result = [];
        var days = new Date(year, month, 0).getDate();
        for (var i = 1; i <= days; i++) {
          result.push(i);
        }
        return result;
      };

      Date.prototype.monthDays = function() {
        var date = new Date(this.getFullYear(), this.getMonth() + 1, 0);
        return date.getDate();
      };

      // 년도, 월 
      var nowYear = date.getFullYear()
      var nowMonth = date.getMonth() + 1

      // Month Calendar 완성 - .monthly-calendar에 요일/일 append
      var details = {
        totalDays: date.monthDays(),
        weekDays: ['일', '월', '화', '수', '목', '금', '토'],
        months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      };

      $('#currentMonth').text(`${date.getFullYear()}년 ${details.months[date.getMonth()]}`);

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
            flag = 1
            cal[i].push('<div class="day"><h3 id="'+ (nowMonth+1) + '-' + 0 + day + '-' + nowYear + '"class="day-label" style="color: #98A8B9 !important;">' + day++ + '</h3></div>');
          } else {
            if (i === 1 && j < start) {
              if ((nowMonth - 1) < 10) {
                cal[i].push('<div class="day"><h3  id="'+ 0 + (nowMonth-1) + '-' + preMonthDay + '-' + nowYear + '"class="day-label" style="color: #98A8B9 !important;">'+ preMonthDay++ +'</h3></div>');
              } else {
                cal[i].push('<div class="day"><h3  id="'+ (nowMonth-1) + '-' + preMonthDay + '-' + nowYear + '"class="day-label" style="color: #98A8B9 !important;">'+ preMonthDay++ +'</h3></div>');
              }
            } else if (color === 1) {
              if ((nowMonth + 1) < 10) {
                cal[i].push('<div class="day"><h3 id="'+ 0 + (nowMonth+1) + '-' + 0 + day + '-' + nowYear + '"class="day-label" style="color: #98A8B9 !important;">' + day++ + '</h3></div>');
              } else {
                cal[i].push('<div class="day"><h3 id="'+ (nowMonth+1) + '-' + 0 + day + '-' + nowYear + '"class="day-label" style="color: #98A8B9 !important;">' + day++ + '</h3></div>');
              }
            } else {
              if (nowMonth < 10) {
                if (day < 10) {
                  cal[i].push('<div class="day"><h3 id="'+ 0 + nowMonth + '-' + 0 + day + '-' + nowYear + '"class="day-label">' + day++ + '</h3></div>');  
                } else {
                  cal[i].push('<div class="day"><h3 id="'+ 0 + nowMonth + '-' + day + '-' + nowYear + '"class="day-label">' + day++ + '</h3></div>');
                }
              } else {
                if (day < 10) {
                  cal[i].push('<div class="day"><h3 id="'+ nowMonth + '-' + 0 + day + '-' + nowYear + '"class="day-label">' + day++ + '</h3></div>');  
                } else {
                  cal[i].push('<div class="day"><h3 id="'+ nowMonth + '-' + day + '-' + nowYear + '"class="day-label">' + day++ + '</h3></div>');  
                }
              }
            }
          }
        }
        cal[i].push('</div>');
      }
      cal = cal.reduce(function(a, b) {
        return a.concat(b);
      }, []).join('');
      $('.monthly-calendar').append(cal);

      // ALL DATE Read (GET)
      var allDate = [] 
      await axios({
        url: '/calendar/get',
        method: "GET",
        dataType: "json",
      })
      .then(async function(res) {
        if (res.data.length > 0) {
          for (var i=0; i < res.data.length; i++) {
            allDate.push(res.data[i])
          }
        } 
      });

      // Tag 안에 id값을 위해 변환
      function dayId(week){
        var weekYear = week.getFullYear()
        var weekMonth = week.getMonth() + 1
        var weekDay = week.getDate() 
        if (weekMonth < 10) {
          weekMonth = '0' + weekMonth
        }
        if (weekDay < 10) {
          weekDay = '0' + weekDay
        }
        var reWeek = weekMonth + '-' + weekDay + '-' + weekYear
        return reWeek
      };

      // Calendar Task
      var schedule = []
      if (allDate.length > 0) {
        for (var i=0; i < allDate.length; i++) {
          var data = allDate[i]

          // 연속 일정 - 기간 구하기
          var start = data.start_date.split('-')
          start = new Date(start[2], start[0]-1, start[1])

          var end = data.end_date.split('-')
          end = new Date(end[2], end[0]-1, end[1])

          // 요일 idx
          var day = start.getDay()
          
          // 표시할 날짜 구간
          var dayCnt = Math.floor((end.getTime() - start.getTime()) / 1000 / 60 / 60 / 24)

          // 표시할 날짜 list
          var totalDay = []

          if (day + dayCnt < 7) {
            totalDay.push([data.start_date, dayCnt + 1])
            data['dayCnt'] = totalDay
            schedule.push(data)
          }
          else if (dayCnt <= 0) {
            data['dayCnt'] = [data.start_date, 1]
            schedule.push(data)
          } 
          else if (day + dayCnt >= 7) {
            var startDay = 7 - day
            var totalCal = dayCnt + 1
            // 1st Week
            totalDay.push([data.start_date, startDay])
            var q = Math.floor(totalCal / 7)
            var p = totalCal % 7
            if (q > 0) {
              // 2nd Week
              if (q == 1) {
                var nextWeek = new Date((Date.parse(start) + (7-day) * 1000 * 60 * 60 * 24))
                var nextDay = dayId(nextWeek)
                totalDay.push([nextDay, totalCal - startDay])
              }
              // 나머지 Week
              else {
                for (var k=1; k <= q; k++) {
                  if (k === 1){
                    var nextWeek = new Date((Date.parse(start) + (7-day) * 1000 * 60 * 60 * 24))
                    var nextDay = dayId(nextWeek)
                    totalDay.push([nextDay, 7])
                  }
                  else if (k !== q) {
                    var nextWeek = new Date((Date.parse(nextWeek) + 7 * 1000 * 60 * 60 * 24))
                    var nextDay = dayId(nextWeek)
                    totalDay.push([nextDay, 7])
                  }
                  else {
                    var nextWeek = new Date((Date.parse(nextWeek) + 7 * 1000 * 60 * 60 * 24))
                    var nextDay = dayId(nextWeek)
                    var lastDay = totalCal - (startDay + (7 * (q-1)))
                    if (lastDay !== 0) {
                      totalDay.push([nextDay, lastDay])
                    }
                  }
                }
              }
            }
            else {
              var nextWeek = new Date((Date.parse(start) + (7-day) * 1000 * 60 * 60 * 24))
              var nextDay = dayId(nextWeek)
              totalDay.push([nextDay, totalCal - startDay])
            }
            data['dayCnt'] = totalDay
            schedule.push(data)
          }
        }
      }

      // 달력 표시
      if (schedule.length > 0) {
        for (var i=0; i < schedule.length; i++) {
          var showDay = schedule[i]
          var showCal = showDay.dayCnt
          var startDate = showDay.start_date
          if (($(`#${startDate}`)).html()) {
            // 하루종일, 하루(시간 지정), day + dayCnt < 7인 경우
            if (showCal.length == 1) {
              // 일반 일정
              if (showCal[0][1] === 1) {
                if (showDay.all_day === false) {
                  $(`#${showCal[0][0]}`).after(`
                  <div class="event event-start event-end" data-span="1" 
                  data-toggle="popover"
                  data-html="true" data-content='<div class="content-line">
                  <div class="event-marking"></div><div class="title"><h5>${showDay.title}</h5>
                  <h6 class="reservation">${showDay.start_date}</h6>
                  <span class="reservation-time">${showDay.start_time} ~ ${showDay.end_time}</span></div>
                  </div><div class="content-line"><i class="material-icons">
                  notes
                  </i><div class="title"><h6 class="reservation">${showDay.content}</div>'>
                  ${showDay.title}
                  </div>`
                  )
                }
                else {
                  $(`#${showCal[0][0]}`).after(`
                    <div class="event event-start event-end" data-span="1" 
                    data-toggle="popover"
                    data-html="true" data-content='<div class="content-line">
                    <div class="event-marking"></div><div class="title"><h5>${showDay.title}</h5>
                    <h6 class="reservation">${showDay.start_date}</h6>
                    <span class="reservation-time">하루종일</span></div>
                    </div><div class="content-line"><i class="material-icons">
                    notes
                    </i><div class="title"><h6 class="reservation">${showDay.content}</div>'>
                    ${showDay.title}
                    </div>`)
                }
              } 
              // 연속 일정
              else {
                $(`#${showCal[0][0]}`).after(`
                  <div class="event event-start event-end event-consecutive" data-span="${showCal[0][1]}"
                  data-toggle="popover"
                  data-html="true" 
                  data-content='<div class="content-line">
                    <div class="event-consecutive-marking"></div>
                    <div class="title">
                      <h5>${showDay.title}</h5><h6 class="reservation">${showDay.start_date} - ${showDay.end_date}
                    </div>
                  </div>
                  <div class="content-line"><i class="material-icons">notes</i>
                  <div class="title"><h6 class="reservation">${showDay.content}</div>'>${showDay.title}</div>`)
              }
            }
            // day + dayCnt >= 7인 경우
            else {
              for (var k=0; k < showCal.length; k++) {
                if (k === 0) {
                  $(`#${showCal[k][0]}`).after(`
                  <div class="event event-start event-consecutive" data-span="${showCal[k][1]}"
                  data-toggle="popover"
                  data-html="true" 
                  data-content='<div class="content-line">
                    <div class="event-consecutive-marking"></div>
                    <div class="title">
                      <h5>${showDay.title}</h5><h6 class="reservation">${showDay.start_date} - ${showDay.end_date}
                    </div>
                  </div>
                  <div class="content-line"><i class="material-icons">notes</i>
                  <div class="title"><h6 class="reservation">${showDay.content}</div>'>${showDay.title}</div>`)
                }
                else if (k === (showCal.length - 1)) {
                  $(`#${showCal[k][0]}`).after(`
                  <div class="event event-end event-consecutive" data-span="${showCal[k][1]}"
                  data-toggle="popover"
                  data-html="true" 
                  data-content='<div class="content-line">
                    <div class="event-consecutive-marking"></div>
                    <div class="title">
                      <h5>${showDay.title}</h5><h6 class="reservation">${showDay.start_date} - ${showDay.end_date}
                    </div>
                  </div>
                  <div class="content-line"><i class="material-icons">notes</i>
                  <div class="title"><h6 class="reservation">${showDay.content}</div>'>${showDay.title}</div>`)
                }
                else {
                  $(`#${showCal[k][0]}`).after(`
                  <div class="event event-consecutive" data-span="${showCal[k][1]}"
                  data-toggle="popover"
                  data-html="true" 
                  data-content='<div class="content-line">
                    <div class="event-consecutive-marking"></div>
                    <div class="title">
                      <h5>${showDay.title}</h5><h6 class="reservation">${showDay.start_date} - ${showDay.end_date}
                    </div>
                  </div>
                  <div class="content-line"><i class="material-icons">notes</i>
                  <div class="title"><h6 class="reservation">${showDay.content}</div>'>${showDay.title}</div>`)
                }
              }
            }
          }
        }
      }
      
      // Daily Calendar 완성 - .daily-calendar
      var todayYear = currentDate.getFullYear()
      var todayMonth = currentDate.getMonth() + 1
      var todayDay = currentDate.getDate()
      var todayDate = currentDate.getDay()

      var data = {
        year: todayYear,
        month: todayMonth,
        day: todayDay
      }

      await axios({
        url: '/calendar/dailyget',
        method: "GET",
        params: data,
        dataType: "json",
      })
      .then(async function(res) {
          console.log(res)
      });
      
      console.log(todayYear, todayMonth, todayDay, todayDate)

      // popover open
      $(function () {
        $('[data-toggle="popover"]').popover().on('inserted.bs.popover')
      });

      // 일정 등록 modal open
      $('.week, .daily-calendar').click(function() {
          $('#registerSchedule').modal('show');
      });

      // 동시 modal 방지
      $(".event-consecutive, .event, .event-repeated").click(function(event) {
        event.stopPropagation();
      });
    }
    // generateCalendar Function 끝

    // today 클릭시, 현재 month calendar로 이동
    $('#today').click(function() {
        var todayDate = new Date()
        $('.monthly-calendar').text('');
        generateCalendar(todayDate);
    });

    // '<' 클릭시, 이전 month calendar로 이동
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

    // '>' 클릭시, 이전 month calendar로 이동
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

    // 현재 month 달력 보여주기 (초기 화면)
    generateCalendar(currentDate);
  });

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

$(function () {
  $('#view li:first-child a').tab('show')
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
