"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "events",
      [
        {
          title: "Conser Raisa",
          category_id: "1",
          start_time: "2019-12-31 18:00:00",
          end_time: "2019-12-31 23:00:00",
          price: "300000",
          description: "lorem ipsum",
          address: "Aula Ciputat",
          url_map:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15863.145812678567!2d106",
          image: "http://someimage.net/haris-astina.png",
          created_by: "1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Conser Peterpan",
          category_id: "1",
          start_time: "2019-12-29 18:00:00",
          end_time: "2019-12-29 23:00:00",
          price: "300000",
          description: "lorem ipsum",
          address: "Aula Ciputat",
          url_map:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15863.145812678567!2d106",
          image: "http://someimage.net/haris-astina.png",
          created_by: "2",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("events", null, {});
  }
};
