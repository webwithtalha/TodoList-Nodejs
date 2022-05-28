const mongoose = require("mongoose");

const addTodoSchema = mongoose.Schema(
  {
    task: {
      type: String,
    },
  },

  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model("List", addTodoSchema);
