const models = require("../models");
const Event = models.event;
const Categories = models.categories;
const Users = models.user;

exports.event = (req, res) => {
  Event.findAll({
    include: [
      {
        model: Categories,
        as: "category",
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      },
      {
        model: Users,
        as: "createdBy",
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      }
    ]
  })
    .then(event => res.send(event))
    .catch(err => res.send(err));
};

exports.eventWithId = (req, res) => {
  const { id } = req.params;
  Event.findOne({
    attributes: [
      "id",
      "title",
      "category_id",
      "start_time",
      "end_time",
      "price",
      "description",
      "address",
      "url_map",
      "image",
      "created_by"
    ],
    where: {
      id
    }
  })
    .then(data => res.send(data))
    .catch(error => {
      req.status(500).json({
        message: "Internal Server Error",
        Error: error
      });
    });
};

exports.addEvent = (req, res) => {
  let input = {
    title: req.body.title,
    category_id: req.body.category_id,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    price: req.body.price,
    description: req.body.description,
    address: req.body.address,
    url_map: req.body.url_map,
    image: req.body.image,
    created_by: req.body.created_by
  };
  Event.create(input).then(data =>
    res.status(201).json({
      message: "Success create event",
      data: {
        id: data.id,
        title: req.body.title,
        category_id: req.body.category_id,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        price: req.body.price,
        description: req.body.description,
        address: req.body.address,
        url_map: req.body.url_map,
        image: req.body.image,
        created_by: req.body.created_by
      }
    })
  );
};
exports.updateEvent = (req, res) => {
  const { id } = req.params;

  Event.update(req.body, {
    where: {
      id
    }
  }).then(data => {
    res.send({
      message: "Success update",
      data
    });
  });
};
exports.delete = (req, res) => {
  Event.destroy({ where: { id: req.params.id } }).then(event => {
    res.send({
      message: "success",
      event
    });
  });
};

exports.getEventsByTitle = (req, res) => {
  Event.findAll({ where: { title: req.query.title } }).then(data =>
    res.send(data)
  );
};
