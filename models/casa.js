const mongoose = require("mongoose");

const casaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    address: {
      type: String,
    },
    number: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Casa", casaSchema);
