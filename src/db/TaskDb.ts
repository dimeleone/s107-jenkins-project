import mongoose from "mongoose";
import { Task } from "../models/Task";

const TaskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    completed: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

export const TaskModel = mongoose.model<Task>("Task", TaskSchema);
