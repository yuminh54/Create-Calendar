$(document).ready(function() {
    var currentDate = new Date();
    var temp = []
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
            cal[i].push('<div class="day"><h3 id="'+ (nowMonth+1) + '-' + '0' + day + '-' + nowYear + '"class="day-label" style="color: #98A8B9 !important;">' + day++ + '</h3></div>');
          } else {
            if (i === 1 && j < start) {
              if ((nowMonth - 1) < 10) {
                cal[i].push('<div class="day"><h3  id="'+ '0' + (nowMonth-1) + '-' + preMonthDay + '-' + nowYear + '"class="day-label" style="color: #98A8B9 !important;">'+ preMonthDay++ +'</h3></div>');
              } else {
                cal[i].push('<div class="day"><h3  id="'+ (nowMonth-1) + '-' + preMonthDay + '-' + nowYear + '"class="day-label" style="color: #98A8B9 !important;">'+ preMonthDay++ +'</h3></div>');
              }
            } else if (color === 1) {
              if ((nowMonth + 1) < 10) {
                cal[i].push('<div class="day"><h3 id="'+ '0' + (nowMonth+1) + '-' + '0' + day + '-' + nowYear + '"class="day-label" style="color: #98A8B9 !important;">' + day++ + '</h3></div>');
              } else {
                cal[i].push('<div class="day"><h3 id="'+ (nowMonth+1) + '-' + '0' + day + '-' + nowYear + '"class="day-label" style="color: #98A8B9 !important;">' + day++ + '</h3></div>');
              }
            } else {
              if (nowMonth < 10) {
                if (day < 10) {
                  cal[i].push('<div class="day"><h3 id="'+ '0' + nowMonth + '-' + '0' + day + '-' + nowYear + '"class="day-label">' + day++ + '</h3></div>');  
                } else {
                  cal[i].push('<div class="day"><h3 id="'+ '0' + nowMonth + '-' + day + '-' + nowYear + '"class="day-label">' + day++ + '</h3></div>');
                }
              } else {
                if (day < 10) {
                  cal[i].push('<div class="day"><h3 id="'+ nowMonth + '-' + '0' + day + '-' + nowYear + '"class="day-label">' + day++ + '</h3></div>');  
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

      // 기간 년/월/일 형식
      function period(changeDate){
        var resDate = changeDate[2] + '년 ' + changeDate[0] + '월 ' + changeDate[1] + '일'
        return resDate
      }

      // Calendar Task
      var schedule = []
      
      if (allDate.length > 0) {
        for (var i=0; i < allDate.length; i++) {
          var data = allDate[i]
          var monthGet = date.getMonth() + 1
          var diffMonth = Number(data.end_date.slice(0, 2)) - Number(data.start_date.slice(0, 2))
          var yearGet = date.getFullYear()
          if (monthGet < 10) {
            monthGet = '0' + monthGet
          }
          else if (monthGet > 12) {
            monthGet = '01'
            yearGet = yearGet + 1
          }

          // 반복 check
          if (data.month_repeat === true) {
            data.start_date = monthGet + '-' + data.start_date.slice(3, 5) + '-' + yearGet
            data.end_date = (Number(monthGet) + Number(diffMonth)) + '-' + data.end_date.slice(3, 5) + '-' + yearGet
          }

          // 기간 구하기
          var start = data.start_date.split('-')
          start = new Date(start[2], start[0]-1, start[1])

          var end = data.end_date.split('-')
          end = new Date(end[2], end[0]-1, end[1])

          // 표시할 날짜 구간
          var dayCnt = Math.floor((end.getTime() - start.getTime()) / 1000 / 60 / 60 / 24)
          // 요일 idx
          var day = start.getDay()

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
              if (q === 1) {
                var nextWeek = new Date((Date.parse(start) + (7-day) * 1000 * 60 * 60 * 24))
                var nextDay = dayId(nextWeek)
                if (totalCal - startDay > 7) {
                  totalDay.push([nextDay, 7])
                  nextWeek = new Date((Date.parse(nextWeek) + 7 * 1000 * 60 * 60 * 24))
                  nextDay = dayId(nextWeek)
                  totalDay.push([nextDay, (totalCal - startDay) - 7])
                }
                else {
                  totalDay.push([nextDay, totalCal - startDay])
                }
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
          var endDate = showDay.end_date
          
          var changeStart = showDay.start_date.split('-')
          changeStart = period(changeStart)
          var changeEnd = showDay.end_date.split('-')
          changeEnd = period(changeEnd)

          var monthGet = date.getMonth() + 1

          if (($(`#${startDate}`)).html() || ($(`#${endDate}`)).html()) {
            // 하루종일, 하루(시간 지정), day + dayCnt < 7인 경우(연속일정, 반복일정)
            if (showCal.length == 1) {
              if (showCal[0][1] === 1) {
                var calEvent = 'event'
                var reTag = 'no'
                var reMsg = '&nbsp'
                var reTimeMsg = showDay.start_time + '~' + showDay.end_time
                if (showDay.all_day === true) {
                  reTimeMsg = '⋅ 하루종일'
                }
                if (showDay.month_repeat === true) {
                  calEvent = 'event-repeated'
                  reTag = 'repeat-message'
                  reMsg = '⋅ 매월 반복'
                }                
                $(`#${showCal[0][0]}`).after(`
                <div class="event event-start event-end ${calEvent}" data-span="1" 
                data-toggle="popover" data-html="true" data-content='<div class="content-line">
                <div class="${calEvent}-marking"></div> <div class="title"><h5>${showDay.title}</h5>
                <h6 class="reservation">${changeStart}</h6> <span class="reservation-time">${reTimeMsg} </span>
                <span class="${reTag}">${reMsg}</span></div></div>
                <div class="content-line"><i class="material-icons">notes</i><div class="title"><h6 class="reservation">${showDay.content}</div>'>
                ${showDay.title}
                </div>`
                )
              } 
              // 연속 일정 && 반복일정 
              else {
                var calEvent = 'event-consecutive'
                var reTag = 'no'
                var reMsg = '&nbsp'
                if (showDay.month_repeat === true) {
                  calEvent = 'event-repeated'
                  reTag = 'repeat-message'
                  reMsg = '⋅ 매월 반복'
                }
                $(`#${showCal[0][0]}`).after(`
                  <div class="event event-start event-end ${calEvent}" data-span="${showCal[0][1]}"
                  data-toggle="popover" data-html="true" data-content='<div class="content-line">
                  <div class="${calEvent}-marking"></div> <div class="title"><h5>${showDay.title}</h5><h6 class="reservation">${changeStart} - ${changeEnd}
                  <span class="${reTag}">${reMsg}</span></div></div>
                  <div class="content-line"><i class="material-icons">notes</i>
                  <div class="title"><h6 class="reservation">${showDay.content}</div>'>${showDay.title}</div>`
                )
              }
            }
            else {
              var calEvent = 'event-consecutive'
              var reTag = 'no'
              var reMsg = '&nbsp'
              if (showDay.month_repeat === true) {
                calEvent = 'event-repeated'
                reTag = 'repeat-message'
                reMsg = '⋅ 매월 반복'
              }
              for (var k=0; k < showCal.length; k++) {
                var calStart = 'event-start'
                var calEnd = 'event-end'
                if (k === 0) {
                  calEnd = ''
                }
                else if (k === (showCal.length - 1)) {
                  calStart = ''
                }
                else {
                  calStart = ''
                  calEnd = ''
                }
                $(`#${showCal[k][0]}`).after(`
                  <div class="event ${calStart} ${calEnd} ${calEvent}" data-span="${showCal[k][1]}"
                  data-toggle="popover" data-html="true" data-content='<div class="content-line">
                  <div class="${calEvent}-marking"></div>
                  <div class="title"><h5>${showDay.title}</h5><h6 class="reservation">${changeStart} - ${changeEnd}
                  <span class="${reTag}">${reMsg}</span></div></div>
                  <div class="content-line"><i class="material-icons">notes</i>
                  <div class="title"><h6 class="reservation">${showDay.content}</div>'>${showDay.title}</div>`
                )
              }
            }
          }
        }
      }
      
      // Daily Calendar 완성 - .daily-calendar
      var todayYear = date.getFullYear()
      var todayMonth = date.getMonth() + 1
      var todayDay = date.getDate()
      var todayDate = date.getDay()
      todayDate = details.weekDays[todayDate]

      // today
      $('.daily-name').text(`${todayDay}일 ${todayDate}요일`)

      var data = {
        year: todayYear,
        month: todayMonth,
        day: todayDay
      }

      var dailyData = []
      await axios({
        url: '/calendar/dailyget',
        method: "GET",
        params: data,
        dataType: "json",
      })
      .then(async function(res) {
          dailyData = res.data
      });

      if (dailyData.length > 0) {
        for(var i=0; i < dailyData.length; i++){
          var dailyDay = dailyData[i]

          var dailyStart = dailyDay.start_date.split('-')
          var startChange = period(dailyStart)

          var dailyEnd = dailyDay.end_date.split('-')
          var endChange = period(dailyEnd)

          dailyStart = new Date(dailyStart[2], dailyStart[0]-1, dailyStart[1])
          dailyEnd = new Date(dailyEnd[2], dailyEnd[0]-1, dailyEnd[1])
          var dailyCnt = Math.floor((dailyEnd.getTime() - dailyStart.getTime()) / 1000 / 60 / 60 / 24)

          var reCal = ''
          var reTimeMsg = dailyDay.start_time + '~' + dailyDay.end_time
          var reDate = startChange + '–' + endChange
          var reTag = 'no'
          var reMsg = ''

          if (dailyCnt <= 0 && dailyDay.all_day === true) {
            reCal = 'event'
            reDate = startChange
            reTimeMsg = '⋅ 하루종일'
          }
          else if (dailyCnt <= 0 && dailyDay.all_day === false) {
            reCal = 'event'
            reDate = startChange
          }
          else if (dailyCnt >= 0 && dailyDay.month_repeat === true) {
            reCal = 'event-repeated'
            reTag = 'repeat-message'
            reMsg = '⋅ 매월 반복'
          } 
          else if (dailyCnt > 0 && dailyDay.month_repeat === false) {
            reCal = 'event-consecutive'
          }

          $('.daily-schedule').append(`<div class="${reCal} event-start event-end" data-toggle="popover"
          data-html="true" data-placement="left" data-content='<div class="content-line">
          <div class="${reCal}-marking"></div><div class="title"><h5>${dailyDay.title}</h5><h6 class="reservation">${reDate}
          <span class="reservation-time">${reTimeMsg}</span><span class="${reTag}">${reMsg}</span></div>
          </div><div class="content-line"><i class="material-icons">notes</i>
          <div class="title"><h6 class="reservation">${dailyDay.content}</div>'>${dailyDay.title}</div>`
          )
        }
      }

      // popover open
      $(function () {
        $('[data-toggle="popover"]').popover().on('inserted.bs.popover')
      });

      String.prototype.replaceAll = function(org, dest) {
        return this.split(org).join(dest);
      }

      // 일정 등록 modal open
      $('.week, .daily-calendar').click(function(e) {
        var todayId = e.target.id
        todayId = todayId.replaceAll('-', '/')
        $('#start-date-picker').val(todayId)
        $('#registerSchedule').modal('show')
      });

      // 동시 modal 방지
      $(".event-consecutive, .event, .event-repeated").click(function(event) {
        event.stopPropagation();
      });
    }
    // generateCalendar Function 끝

    // today 클릭시, 현재 month calendar로 이동
    $('#today').click(function() {
        currentDate = new Date()
        $('.monthly-calendar').text('');
        $('.daily-schedule').text('');
        generateCalendar(currentDate);
    });

    // '<' 클릭시, 이전 calendar로 이동
    $('#previous').click(function() {
      $('.monthly-calendar').text('');
      $('.daily-schedule').text('');
      if ($( '.nav-link' ).attr( 'aria-selected' ) === 'true') {
        if (currentDate.getMonth() === 0) {
          currentDate = new Date(currentDate.getFullYear() - 1, 11);
        } else {
          currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
        }
        generateCalendar(currentDate);
      }
      else {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), Number(currentDate.getDate()) - 1)
        generateCalendar(currentDate);
      }
    });

    // '>' 클릭시, 다음 calendar로 이동
    $('#next').click(function() {
      $('.monthly-calendar').text('');
      $('.daily-schedule').text('');
      if ($( '.nav-link' ).attr( 'aria-selected' ) === 'true') {
        if (currentDate.getMonth() === 11) {
          currentDate = new Date(currentDate.getFullYear() + 1, 0);
        } else {
          currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
        }
        generateCalendar(currentDate);
      }
      else {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), Number(currentDate.getDate()) + 1)
        generateCalendar(currentDate)
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

$('#inlineCheckbox2').click(function() {
  if ($('#inlineCheckbox2').is(":checked")) {
    $('[name="start_time"]').attr("readonly", true);
    $('[name="end_time"]').attr("readonly", true);
  } else {
    $('[name="start_time"]').attr("readonly", false);
    $('[name="end_time"]').attr("readonly", false);
  }
});
