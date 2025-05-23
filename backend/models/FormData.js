const mongoose = require("mongoose");

const FormDataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    originalFilename: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FormData", FormDataSchema);
