const mongoose = require("mongoose");
const schema = mongoose.Schema;
const todoSchema = new schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);
const Todo = mongoose.model("todo", todoSchema);
module.exports = Todo;
