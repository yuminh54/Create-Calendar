    data-label



```
.calendar-container {
  height: 96px;
  width: 840px;
  border-right: 1px solid rgba(215, 226, 235, 0) !important;
  border-left: 1px solid rgba(215, 226, 235, 0) !important;
  visibility:hidden;
}

```



```
<div class="tab-content">
            <div class="tab-pane active show" id="month" role="tabpanel" aria-labelledby="tab-month">
                <div class="monthly-calendar"></div>
            </div>
            <div class="tab-pane" id="day" role="tabpanel" aria-labelledby="tab-day">
                <div class="daily-calendar"><span class="day-name">3일 화요일</span>
                    <div class="event-consecutive event-start event-end" data-toggle="popover"
                         data-html="true" data-placement="left" data-content='<div class="content-line"><div class="event-consecutive-marking"></div><div class="title"><h5>일정 1</h5><h7 class="reservation">2019년 9월 15일 – 17일</div>
            </div><div class="content-line"><i class="material-icons">
    notes
    </i><div class="title"><h7 class="reservation">스케쥴 메모, 설명이 나타납니다.</div>'>연속 일정 1
                    </div>
                    <div class="event-consecutive event-start event-end" data-toggle="popover"
                         data-html="true" data-placement="left" data-content='<div class="content-line"><div class="event-consecutive-marking"></div><div class="title"><h5>일정 1</h5><h7 class="reservation">2019년 9월 15일 – 17일</div>
            </div><div class="content-line"><i class="material-icons">
    notes
    </i><div class="title"><h7 class="reservation">스케쥴 메모, 설명이 나타납니다.</div>'>연속 일정 2
                    </div>
                    <div class="event event-start event-end" data-toggle="popover"
                         data-html="true" data-placement="left" data-content='<div class="content-line"><div class="event-marking"></div><div class="title"><h5>일정 1</h5><h7 class="reservation">2019년 9월 15일 – 17일<span class="reservation-time">⋅오후 2:00~ 3:00</span></div>
            </div><div class="content-line"><i class="material-icons">
    notes
    </i><div class="title"><h7 class="reservation">스케쥴 메모, 설명이 나타납니다.</div>'>일반 일정 3
                    </div>
                    <div class="event-repeated event-start event-end" data-toggle="popover"
                         data-html="true" data-placement="left" data-content='<div class="content-line"><div class="event-repeated-marking"></div><div class="title"><h5>일정 1</h5><h7 class="reservation">2019년 9월 15일 – 17일<span class="reservation-time">⋅오후 2:00~ 3:00</span><span class="repeat-message">⋅매월 반복</span></div>
            </div><div class="content-line"><i class="material-icons">
    notes
    </i><div class="title"><h7 class="reservation">스케쥴 메모, 설명이 나타납니다.</div>'>반복 일정 1
                    </div>
                </div>
            </div>
        </div>
```





```
'use strict';
module.exports =(sequelize, DataTypes) => {
    return sequelize.define('calendar', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      end_date: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      start_time: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      end_time: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      month_repeat: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      all_day: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    }, {
        timestamps: true,
    });
};
```

```
'use strict';
module.exports = (sequelize, DataTypes) => {
  const calendar = sequelize.define('calendar', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    end_date: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    start_time: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    end_time: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    month_repeat: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    all_day: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  calendar.associate = function(models) {
    // associations can be defined here
  };
  return calendar;
};
```

