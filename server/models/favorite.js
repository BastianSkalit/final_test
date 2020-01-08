"use strict";
module.exports = (sequelize, DataTypes) => {
  const favorite = sequelize.define(
    "favorite",
    {
      event_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER
    },
    {}
  );
  favorite.associate = function(models) {
    // associations can be defined here
    favorite.belongsTo(models.event, {
      as: "event",
      foreignKey: "event_id"
    });
    favorite.belongsTo(models.user, {
      as: "user",
      foreignKey: "user_id"
    });
  };
  return favorite;
};
