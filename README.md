# Calendar



## 1. 목표

* jquery와 javascript async/await를  활용한 Client Side Rendering 구현
* 전체 Calendar를 만든 후 일정 등록하기
  * 하루 일정 - 하루종일 선택 가능
  * 연속 일정
  * 반복 일정
* 일정 상세보기 구현
* 월 / 일 기준 달력과 일정과 달력 구현



## 2. 사용 기술

* Node.js + express.js + sequelize.js + mysql + jquery + async/await

* Node.js의 ORM모듈인 sequelize.js를 사용
  * 코딩의 반복적인 부분을 줄일 수 있고 SQL의 의존적인 코딩에서 벗어나 생산적인 코딩이 가능하며 유지보수가 편리하기 때문에 사용함



## 3. 데이터베이스 설계

<img width="152" alt="스크린샷 2019-10-24 오후 3 50 37" src="https://user-images.githubusercontent.com/45961217/67460514-20e58f80-f676-11e9-9720-f021cbe87aad.png">

* 일정을 등록하기 위한 calendars table 생성
  * 제목/내용, 시작/종료 날짜, 시작/종료 시간, 반복 유무, 하루종일 유무, 생성/수정 시간
* sequelize를 활용하여 table 생성 



## 4. 기능

1. #### **전체 calendar 생성**

   * 전체 Calendar를 만들기 위하여 generateCalendar 함수를 생성하였고, 비동기를 동기 처리 하기 위하여 **async/await를 사용**하였다.

   ```javascript
   async function generateCalendar(date)
   ```

   * `<`를 클릭하면 이전 달로 이동하며, `>`를 클릭하면 다음 달로 이동한다.

   ```javascript
   // '<' 클릭시, 이전 calendar로 이동
   $('#previous').click(function() {
     ...
   });
   
   // '>' 클릭시, 다음 calendar로 이동
   $('#next').click(function() {
   	...
   });
   ```

   * Calendar 생성 완료

   <img width="863" alt="스크린샷 2019-10-24 오후 4 05 06" src="https://user-images.githubusercontent.com/45961217/67461349-12987300-f678-11e9-9629-0fbb0b04aadd.png">



2. #### **일정 등록 Modal 생성**

   * 일정 등록을 위한 Modal 생성
   * 등록하고 싶은 날짜를 누르면 Modal Open

   ```javascript
   $('.week, .daily-calendar').click(function(e) {
   	...
     $('#start-date-picker').val(todayId)
     $('#registerSchedule').modal('show')
   });
   ```

   

   <img width="860" alt="스크린샷 2019-10-24 오후 4 07 46" src="https://user-images.githubusercontent.com/45961217/67461490-6f942900-f678-11e9-8629-bfc86730b106.png">



3. #### **일정 등록**

   * #### **하루 일정 등록** - 하루종일을 체크하면 시작/종료 시간 입력하지 않음

     <img width="499" alt="스크린샷 2019-10-24 오후 4 13 39" src="https://user-images.githubusercontent.com/45961217/67461826-41fbaf80-f679-11e9-9d9c-52021ef4d9ce.png">

     <img width="872" alt="스크린샷 2019-10-24 오후 4 14 36" src="https://user-images.githubusercontent.com/45961217/67461889-648dc880-f679-11e9-9cb4-0913a33fecfb.png">

   

   * #### **연속 일정 등록**

     <img width="494" alt="스크린샷 2019-10-24 오후 4 17 34" src="https://user-images.githubusercontent.com/45961217/67462075-ce0dd700-f679-11e9-8e5c-fe0790d9061b.png">

     <img width="876" alt="스크린샷 2019-10-24 오후 4 18 17" src="https://user-images.githubusercontent.com/45961217/67462131-e7af1e80-f679-11e9-8b33-11bc28a92062.png">

   

   * #### **반복 일정 등록**

     * 매월 반복에 체크하면, 일정이 매월 반복된다.

       <img width="497" alt="스크린샷 2019-10-24 오후 4 26 15" src="https://user-images.githubusercontent.com/45961217/67462687-05c94e80-f67b-11e9-9712-9cec9d49e26b.png">

       <img width="874" alt="스크린샷 2019-10-24 오후 4 27 04" src="https://user-images.githubusercontent.com/45961217/67464058-9bfe7400-f67d-11e9-9a7e-6d7478041b9f.png">			<img width="847" alt="스크린샷 2019-10-24 오후 4 27 54" src="https://user-images.githubusercontent.com/45961217/67463912-49bd5300-f67d-11e9-900a-3e2a22fe7983.png">
   
       

4. #### **일정 상세 보기**

   * popover를 사용하여 일정을 클릭하면 일정을 상세보기 할 수 있음

   <img width="1171" alt="스크린샷 2019-10-24 오후 4 29 24" src="https://user-images.githubusercontent.com/45961217/67462956-77a19800-f67b-11e9-8cb7-8f6dc26b2f4e.png">     



5. #### 월/일 일정 보기

   * 월을 클릭하면 월 달력으로 일정을 확인할 수 있고, 일을 클릭하면 일 달력으로 일정을 확인할 수 있다.

   * **월 달력**

     <img width="881" alt="스크린샷 2019-10-24 오후 4 49 06" src="https://user-images.githubusercontent.com/45961217/67464377-36f74e00-f67e-11e9-920c-ca6b6cfacb98.png">

     

   * **일 달력**

     <img width="848" alt="스크린샷 2019-10-24 오후 4 51 12" src="https://user-images.githubusercontent.com/45961217/67464567-8178ca80-f67e-11e9-8c70-fd3fce094345.png">

     

