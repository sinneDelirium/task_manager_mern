const express = require("express");
const router = express.Router();

// Import the tasks controller
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

// GET and POST /api/v1/tasks
router.route("/").get(getAllTasks).post(createTask);
// GET, PATCH and DELETE /api/v1/tasks/:id
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

// Export the router
module.exports = router;
