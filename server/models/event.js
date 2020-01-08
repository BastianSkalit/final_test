"use strict";
module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define(
    "event",
    {
      title: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
      price: DataTypes.STRING,
      description: DataTypes.TEXT,
      address: DataTypes.STRING,
      url_map: DataTypes.STRING,
      image: DataTypes.STRING,
      created_by: DataTypes.INTEGER
    },
    {}
  );
  event.associate = function(models) {
    // associations can be defined here
    event.belongsTo(models.categories, {
      as: "category",
      foreignKey: "category_id",
      sourceKey: "id"
    });
    event.belongsTo(models.user, {
      as: "createdBy",
      foreignKey: "created_by",
      sourceKey: "id"
    });
  };
  return event;
};
