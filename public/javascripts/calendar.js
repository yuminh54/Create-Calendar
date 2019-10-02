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

      // 전체 Calendar 완성 - .monthly-calendar에 요일/일 append
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

      // replaceAll
      String.prototype.replaceAll = function(org, dest) {
        return this.split(org).join(dest);
      }

      var dataCal = [] 
      // 등록된 일정 Read
      await axios({
        url: '/calendar/get',
        method: "GET",
        dataType: "json",
      })
      .then(async function(res) {
        if (res.data.length > 0) {
          for (var i=0; i < res.data.length; i++) {
            dataCal.push(res.data[i])
          }
        } 
      });
      var schedule = []
      if (dataCal.length > 0) {
        for (var i=0; i < dataCal.length; i++) {
          var data = dataCal[i]
          data.start_date = data.start_date.replaceAll('/', '-')
          data.end_date = data.end_date.replaceAll('/', '-')

          // 연속 일정 - 기간 구하기
          var start = data.start_date.split('-')
          start = new Date(start[2], start[0]-1, start[1])

          var end = data.end_date.split('-')
          end = new Date(end[2], end[0]-1, end[1])

          // 요일 idx
          var day = start.getDay()
          // 일주일 후 계산 (일요일부터 표시)
          var nextWeek = new Date((Date.parse(start) + (7-day) * 1000 * 60 * 60 * 24))
          
          // 표시할 날짜 구간
          var dayCnt = Math.floor((end.getTime() - start.getTime()) / 1000 / 60 / 60 / 24)

          // 표시할 날짜 list
          var totalday = []

          if (day + dayCnt <= 7) {
            totalday.push([data.start_date, dayCnt])
            data['dayCnt'] = totalday
            schedule.push(data)
          }
          else if (dayCnt <= 0) {
            data['dayCnt'] = 0
            schedule.push(data)
          } 
          else if (day + dayCnt > 7) {
            console.log(total)
          }
        }
      }

      // 달력 표시
      if (schedule.length > 0) {
        for (var i=0; i < schedule.length; i++) {
          var start = schedule[i].start_date
          if (($(`#${start}`)).html()) {
            // 연속 일정
            if (schedule[i].dayCnt > 0) {
              $(`#${start}`).after(`
              <div class="event event-start event-end event-consecutive" data-span="${schedule[i].dayCnt}"
                data-toggle="popover"
                data-html="true">
              ${schedule[i].title}
              </div>`)
            }
            // 일반 일정 
            else {
              $(`#${start}`).after(`
              <div class="event event-start event-end" data-span="1" 
              data-toggle="popover"
              data-html="true" data-content='<div class="content-line">
              <div class="event-marking"></div><div class="title"><h5>${schedule[i].title}</h5>
              <h7 class="reservation">2019년 9월 15일 – 17일</h7>
              <span class="reservation-time">${schedule[i].start_time} ~ ${schedule[i].end_time}</span></div>
              </div><div class="content-line"><i class="material-icons">
              notes
              </i><div class="title"><h7 class="reservation">${schedule[i].content}</div>'>
              ${schedule[i].title}
              </div>`)
            }
          }
        }
      }
      $('#currentMonth').text(`${date.getFullYear()}년 ${details.months[date.getMonth()]}`);
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
