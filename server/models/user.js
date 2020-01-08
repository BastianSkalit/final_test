"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      image: DataTypes.STRING
    },
    {}
  );
  user.associate = function(models) {
    // associations can be defined here
    // user.belongsToMany(models.favorite, {
    //   as: "i like this",
    //   through: "favorite",
    //   foreignKey: "user_id",
    //   sourceKey: "id"
    // });
    // user.belongsToMany(models.favorite, {
    //   as: "i dont like this",
    //   through: "favorite",
    //   foreignKey: "user_id",
    //   sourceKey: "id"
    // });
  };
  return user;
};
