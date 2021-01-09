const mongoose = require("mongoose");

const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true,
};

const todoSchema = new Schema(
  {
    title: requiredString,
    rank: {
      type: Number,
    },
    description: {
      type: String,
    },
    date: {
      type: String,
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
  {
    collection: "todos",
  }
);

module.exports = mongoose.model("Todo", todoSchema);
