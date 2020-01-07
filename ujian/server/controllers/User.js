const Users = require("../models").user;

const dataUs = data => {
  const newData = data.map(item => {
    let newItem = {
      id: item.id,
      name: item.name,
      email: item.email,
      phone: item.phone,
      password: item.password,
      address: item.address,
      image: item.image
    };
    return newItem;
  });
  return newData;
};

exports.user = (req, res) => {
  Users.findAll({})
    .then(data => res.send(dataUs(data)))
    .catch(error => {
      res.status(500).json({
        message: "Internal Server Error",
        Error: error
      });
    });
};

exports.userWithId = (req, res) => {
  const { id } = req.params;
  Users.findOne({
    attributes: [
      "id",
      "name",
      "email",
      "phone",
      "password",
      "address",
      "image"
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

exports.addUser = (req, res) => {
  let input = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    address: req.body.address,
    image: req.body.image
  };
  Users.create(input).then(data =>
    res.status(201).json({
      message: "Success create user",
      data: {
        id: data.id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        address: req.body.address,
        image: req.body.image
      }
    })
  );
};

exports.updateUser = (req, res) => {
  const { id } = req.params;

  Users.update(req.body, {
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
