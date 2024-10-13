const asyncWrapper = require("../middleware/async");
const Task = require("../models/Task");
const { createCustomError } = require("../errors/custom_error");

// GET /api/tasks
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks }).send();
});

// POST /api/tasks
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task }).send();
});

// GET /api/tasks/:id
const getTask = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const task = await Task.findOne({ _id: id });
  if (!task) {
    return next(createCustomError(`Task ${id} not found`, 404));
  }
  res.status(200).json({ task }).send();
});

// PATCH /api/tasks/:id
// Partial updates possible with PATCH (can ignore completed field)
const updateTask = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  const task = await Task.findOneAndUpdate({ _id: id }, data, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`Task ${id} not found`, 404))
  }
  res.status(200).json({ task }).send();
});

// DELETE /api/tasks/:id
const deleteTask = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const task = await Task.findOneAndDelete({ _id: id });
  if (!task) {
    return next(createCustomError(`Task ${id} not found`, 404))
  }
  res
    .status(200)
    .json({ message: `Task ${id} deleted`, task: task })
    .send();
});

// PUT /api/tasks/:id
// Overwrites specific fields in the document
// If "completed" in Tasks.js model is set to not have a default value,
// it will not be included in the model if not provided in the PUT request
// Does not seem to work with overwrite: true, just acts like PATCH
const editTask = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  await Task.findOneAndUpdate({ _id: id }, data, {
    new: true,
    runValidators: true,
    overwrite: true, // Overwrite the entire document for PUT request
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

// Exports for routes/tasks.js
module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
};
