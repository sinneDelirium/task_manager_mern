const mongoose = require("mongoose");
const Task = require("../models/Task");

// GET /api/tasks
const getAllTasks = async (req, res) => {
  await Task.find({})
    .then((tasks) => {
      return res.status(200).json({ tasks }).send();
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
};

// POST /api/tasks
const createTask = async (req, res) => {
  await Task.create(req.body)
    .then((task) => {
      return res.status(201).json({ task }).send();
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
};

// GET /api/tasks/:id
const getTask = async (req, res) => {
  const id = req.params.id;

  // Task id validation
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: `Invalid task id: ${id}` });
  }

  await Task.findById(id)
    .then((task) => {
      if (!task) {
        return res.status(404).json({ message: `Task ${id} not found` });
      }
      return res.status(200).json({ task });
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
};

// PATCH /api/tasks/:id
const updateTask = async (req, res) => {
  const id = req.params.id;
  const data = req.body; // TS need to check type?

  // Task id validation
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: `Invalid task id: ${id}` });
  }

  await Task.findOneAndUpdate({ _id: id }, data, {
    new: true,
    runValidators: true,
  })
    .then((task) => {
      if (!task) {
        return res.status(404).json({ message: `Task ${id} not found` });
      }
      return res.status(200).json({ task }).send();
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
};

// DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  const id = req.params.id;

  // Task id validation
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: `Invalid task id: ${id}` });
  }

  await Task.findByIdAndDelete(id)
    .then((task) => {
      if (!task) {
        return res.status(404).json({ message: `Task ${id} not found` });
      }
      return res
        .status(200)
        .json({ message: `Task ${id} deleted` })
        .send();
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
};

// Exports for routes/tasks.js
module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
