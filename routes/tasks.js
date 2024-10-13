const express = require("express");
const router = express.Router();

// Import the tasks controller
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
} = require("../controllers/tasks");

// GET and POST /api/v1/tasks
router.route("/").get(getAllTasks).post(createTask);
// GET, PATCH, DELETE, and PUT /api/v1/tasks/:id
router
  .route("/:id")
  .get(getTask)
  .patch(updateTask)
  .delete(deleteTask)
  .put(editTask);

// Export the router
module.exports = router;
