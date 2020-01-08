const Categories = require("../models").categories;

const dataCat = data => {
  const newData = data.map(item => {
    let newItem = {
      id: item.id,
      title: item.title
    };
    return newItem;
  });
  return newData;
};

exports.categories = (req, res) => {
  Categories.findAll({})
    .then(data => res.send(dataCat(data)))
    .catch(error => {
      res.status(500).json({
        message: "Internal Server Error",
        Error: error
      });
    });
};

exports.categoriesWithId = (req, res) => {
  const { id } = req.params;
  Categories.findOne({
    attributes: ["id", "title"],
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

exports.addCategories = (req, res) => {
  let input = {
    title: req.body.title
  };
  Categories.create(input).then(data =>
    res.status(201).json({
      message: "Success create category",
      data: {
        id: data.id,
        title: req.body.title
      }
    })
  );
};

exports.updateCategories = (req, res) => {
  const { id } = req.params;

  Categories.update(req.body, {
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

const resultCategorydetail = data => {
  const newData = data.map(item => {
    let newItem = {
      id: item.id,
      title: item.title,
      category: {
        id: item.category.id,
        title: item.category.title
      },
      content: item.content,
      img: item.image,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    };
    return newItem;
  });
  return newData;
};

exports.categoryDetail = (req, res) => {
  const { category_id } = req.params;
  Event.findAll({
    include: [
      {
        model: Categories,
        as: "category"
      }
    ],
    where: {
      category_id
    }
  })
    .then(data => res.send(resultCategorydetail(data)))
    .catch(error => {
      req.status(500).json({
        message: "Internal Server Error",
        Error: error
      });
    });
};
