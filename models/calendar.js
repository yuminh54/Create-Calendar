'use strict';
module.exports = (sequelize, DataTypes) => {
  const calendar = sequelize.define('calendars', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    end_time: {
      type: DataTypes.STRING,
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
  }, {});
  calendar.associate = function(models) {
    // associations can be defined here
  };
  return calendar;
};