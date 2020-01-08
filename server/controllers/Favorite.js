const Favorite = require("../models").favorite;
const Event = require("../models").event;

const dataFav = data => {
  const newData = data.map(item => {
    let newItem = {
      id: item.id,
      event_id: item.event_id,
      user_id: item.user_id
    };
    return newItem;
  });
  return newData;
};

exports.Favorite = (req, res) => {
  Favorite.findAll({})
    .then(data => res.send(dataFav(data)))
    .catch(error => {
      res.status(500).json({
        message: "Internal Server Error",
        Error: error
      });
    });
};

exports.FavoriteWithId = (req, res) => {
  const { id } = req.params;
  Favorite.findOne({
    attributes: ["event_id", "user_id"],
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

exports.addFavorite = (req, res) => {
  let input = {
    event_id: req.body.event_id,
    user_id: req.body.user_id
  };
  Favorite.create(input).then(data =>
    res.status(201).json({
      message: "Success create category",
      data: {
        id: data.id,
        event_id: req.body.event_id,
        user_id: req.body.user_id
      }
    })
  );
};

exports.updateFavorite = (req, res) => {
  const { id } = req.params;

  Favorite.update(req.body, {
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

const resultFavoritedetail = data => {
  const newData = data.map(item => {
    let newItem = {
      id: item.id,
      event_id: item.event_id,
      user_id: item.event.user_id,
      favorite: {
        id: item.favorite.id,
        event_id: item.favorite.event_id,
        user_id: item.favorite.user_id
      },
      content: item.content,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    };
    return newItem;
  });
  return newData;
};

exports.favoriteDetail = (req, res) => {
  const { favorite_id } = req.params;
  Event.findAll({
    include: [
      {
        model: Favorite,
        as: "favorite"
      }
    ],
    where: {
      favorite_id
    }
  })
    .then(data => res.send(resultFavoritedetail(data)))
    .catch(error => {
      req.status(500).json({
        message: "Internal Server Error",
        Error: error
      });
    });
};
