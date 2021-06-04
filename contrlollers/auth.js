const User = require("../models/User");

module.exports.login = async (req, res) => {
  try {
    const candidate = await User.findOne({
      surname: req.body.surname,
    });

    if (candidate) {
      res.status(200).json({
        userId: candidate._id,
        surname: candidate.surname,
      });
    } else {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
module.exports.register = async (req, res) => {
  const candidate = await User.findOne({
    surname: req.body.surname,
  });
  console.log(req.body);
  if (candidate) {
    res.status(409).json({
      message: "Пользователь существует",
    });
  } else {
    try {
      const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        description: req.body.description,
        avatar: req.file ? req.file.path : "",
      });
      await user.save();
      res.status(201).json({
        message: "Пользователь создан",
      });
    } catch (e) {
      res.status(404).json({ message: e.message });
    }
  }
};
module.exports.updateById = async (req, res) => {
  const updated = {
    name: req.body.name,
    surname: req.body.surname,
    description: req.body.description,
  };
  if (req.file) {
    updated.avatar = req.file.path;
  }
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(user);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
module.exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      message: "Запись удалена",
    });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

module.exports.showAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.params.page) || 1;
    const pageSize = parseInt(req.params.limit) || 5;
    const skip = (page - 1) * pageSize;
    const total = User.countDocuments();
    const pages = Math.ceil(total / pageSize);

    const users = await User.find().skip(skip).limit(pageSize);
    res.status(200).json({ users: users, count: users.length, page, pages });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
