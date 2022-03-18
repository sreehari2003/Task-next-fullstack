import { Schema, models, model } from "mongoose";

interface ts {
  title: string;
  description: string;
  date:Date
}

const taskScheme = new Schema({
  title: {
    type: "String",
    required: true,
  },
  description: {
    type: "String",
    required: true,
  },
  date: Date,
});

const task = models.Tasks || model<ts>("Tasks", taskScheme);

export default task;
