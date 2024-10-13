const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  await Task.find({})
    .then((tasks) => {
      res.status(200).json({ tasks }).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

const createTask = async (req, res) => {
  await Task.create(req.body)
    .then((task) => {
      res.status(201).json({ task }).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

const getTask = async (req, res) => {
  const id = req.params.id;
  await Task.findOne({ _id: id })
    .then((task) => {
      res.status(200).json({ task }).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

const updateTask = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  await Task.updateOne({ _id: id }, data)
    .then((task) => {
      res.status(200).json({ task }).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

const deleteTask = async (req, res) => {
  const id = req.params.id;
  await Task.deleteOne({ _id: id })
    .then(() => {
      res.status(200).json({ message: `Task ${id} deleted` }).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
