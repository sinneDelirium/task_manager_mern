import { model, Model, Schema } from "mongoose";

// Create interface representing a document
interface ITask {
  name: string;
  completed?: boolean;
}

// Create schema for a task
const TaskSchema: Schema = new Schema<ITask>({
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
const Task: Model<ITask> = model<ITask>("Task", TaskSchema);

module.exports = Task;
