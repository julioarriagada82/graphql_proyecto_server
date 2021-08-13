const mongoose = require("mongoose");

const integranteSchema = new mongoose.Schema(
  {
    rut: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Integrante", integranteSchema);
