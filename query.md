### 연속 일정

```html
<div class="event-consecutive event-start event-end" data-span="6"
                             data-toggle="popover"
                             data-html="true" data-content='<div class="content-line"><div class="event-consecutive-marking"></div><div class="title"><h5>일정 1</h5><h7 class="reservation">2019년 9월 15일 – 17일</div>
        </div><div class="content-line"><i class="material-icons">
notes
</i><div class="title"><h7 class="reservation">스케쥴 메모, 설명이 나타납니다.</div>'>연속 일정 1
</div>
```



### 일반 일정

```html
<div class="event event-start event-end" data-span="1" data-toggle="popover"
                             data-html="true" data-content='<div class="content-line"><div class="event-marking"></div><div class="title"><h5>일정 1</h5><h7 class="reservation">2019년 9월 15일 – 17일<span class="reservation-time">⋅오후 2:00~ 3:00</span></div>
        </div><div class="content-line"><i class="material-icons">
notes
</i><div class="title"><h7 class="reservation">스케쥴 메모, 설명이 나타납니다.</div>'>일반 일정 1
</div>
```

```html
<div class="popover fade show bs-popover-left" role="tooltip" x-placement="left" style="position: absolute; transform: translate3d(5px, 265px, 0px); top: 0px; left: 0px; will-change: transform;">
            <div class="arrow" style="top: 50px;"></div>
            <h3 class="popover-header"></h3>
            <div class="popover-body">
                <div class="content-line">
                    <div class="event-marking"></div>
                    <div class="title">
                        <h5>일정 1</h5>
                        <h7 class="reservation">2019년 9월 15일 – 17일
                            <span class="reservation-time">⋅오후 2:00~ 3:00</span>
                        </h7>
                    </div>
                </div>
                <div class="content-line"><i class="material-icons">notes</i>
                    <div class="title"><h7 class="reservation">스케쥴 메모, 설명이 나타납니다.</h7>
                    </div>
                </div>
            </div>
        </div>
```

```html
(`
                    <div class="event event-start event-end" data-span="1" 
                    data-toggle="popover"
                    data-html="true" data-content='<div class="popover fade show bs-popover-left" role="tooltip" id="popover238444" x-placement="left" style="position: absolute; transform: translate3d(5px, 163px, 0px); top: 0px; left: 0px; will-change: transform;">
                    <div class="arrow" style="top: 50px;"></div>
                    <h3 class="popover-header"></h3>
                    <div class="popover-body">
                        <div class="content-line">
                            <div class="event-consecutive-marking"></div>
                            <div class="title">
                                <h5>${showDay.title}</h5>
                                <h7 class="reservation">${showDay.start_date} – ${showDay.end_date}
                                <span class="reservation-time">⋅${showDay.start_time} ~ ${showDay.end_time}</span>
                                </h7>
                            </div>
                        </div>
                        <div class="content-line">
                            <i class="material-icons">notes</i>
                            <div class="title">
                                <h7 class="reservation">${showDay.content}</h7>
                            </div>
                        </div>
                    </div>  
                    </div>' data-original-title title>
                    ${showDay.title}
                    </div>`
                  )
```



### 반복일정

```html
<div class="event-repeated event-start event-end" data-span="3" data-toggle="popover"
                             data-html="true" data-content='<div class="content-line"><div class="event-repeated-marking"></div><div class="title"><h5>일정 1</h5><h7 class="reservation">2019년 9월 15일 – 17일<span class="reservation-time">⋅오후 2:00~ 3:00</span><span class="repeat-message">⋅매월 반복</span></div>
        </div><div class="content-line"><i class="material-icons">
notes
</i><div class="title"><h7 class="reservation">스케쥴 메모, 설명이 나타납니다.</div>'>반복 일정 1
                        </div>
```







```
{
        where: {
            start_date: {
                [Op.like]: month + '/' + '%%' + '/' + year
            }
        }
    }
```



```
data-content='
                <div class="content-line">
                  <div class="event-consecutive-marking"></div>
                  <div class="title">
                    <h5>${schedule[i].title}</h5>
                    <h7 class="reservation">${schedule[i].start_date} - ${schedule[i].end_date}</h7>
                  </div>
                </div>
                <div class="content-line">
                  <i class="material-icons">notes</i>
                <div class="title">
                  <h7 class="reservation">${schedule[i].content}</h7>
                </div>
```

