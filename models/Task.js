const mongoose = require("mongoose");

// Create schema for a task
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [20, "name cannot be more than 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Export model called Task with schema TaskSchema
module.exports = mongoose.model("Task", TaskSchema);
