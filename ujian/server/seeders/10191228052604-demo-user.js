"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Bastian",
          email: "simanungkalitbastian@gmail.com",
          phone: "+62 81338233787",
          password: "admin",
          address: "bintaro",
          image: "http://someimage.net/haris-astina.png",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Sutejo",
          email: "sutejo@gmail.com",
          phone: "+62 8131928931",
          password: "admin",
          address: "bintaro",
          image: "http://someimage.net/haris-astina.png",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  }
};
