"use strict";
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define(
    "order",
    {
      event_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      status: DataTypes.STRING
    },
    {}
  );
  order.associate = function(models) {
    // associations can be defined here
    order.belongsTo(models.event, {
      as: "event",
      foreignKey: "event_id"
    });
    order.belongsTo(models.user, {
      as: "user",
      foreignKey: "user_id"
    });
  };
  return order;
};
