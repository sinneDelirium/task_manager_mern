const mongoose = require("mongoose");

// Create schema for a task
const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, required: true },
});

// Export model called Task with schema TaskSchema
module.exports = mongoose.model("Task", TaskSchema);
