import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    frequency: {
      type: String,
      required: true,
      enum: {
        values: ["Weekly", "Monthly", "Daily"],
        message: "Frequency can be either Weekly, Monthly or daily",
      },
    },
    repeat: {
      type: String,
      default: "",
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Todo = mongoose.models?.Todo || mongoose.model("Todo", todoSchema);

// export default Todo;